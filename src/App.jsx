import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import AdminController from './components/AdminController';
import StageDisplay from './components/StageDisplay';
import ContestantManager from './components/ContestantManager';
import GrandPodium from './components/GrandPodium';
import SoundboardModal from './components/SoundboardModal';
import QuestionImporterModal from './components/QuestionImporterModal';
import HeritageModal from './components/HeritageModal';
import { DEFAULT_QUESTIONS, PRELOADED_EKITI_ZONES } from './data/defaultQuestions';
import { 
  subscribeToGameChannel, 
  DEFAULT_ROOM_CODE, 
  saveLocalGameState, 
  loadLocalGameState 
} from './services/supabaseService';
import classicalAudio from './services/audioService';

// Default initial contestants from Ekiti Area
const INITIAL_CONTESTANTS = [
  {
    id: 'c-1',
    seatNumber: 1,
    name: 'Oluwaseun Adeleke',
    zone: 'Ado Central (Ajilosun)',
    score: 0,
    bonusScore: 0,
    lifelinesUsed: { fiftyFifty: false, consultScriptures: false, askAudience: false, phonePastor: false }
  },
  {
    id: 'c-2',
    seatNumber: 2,
    name: 'Bolanle Ojo',
    zone: 'Ikole Ekiti',
    score: 0,
    bonusScore: 0,
    lifelinesUsed: { fiftyFifty: false, consultScriptures: false, askAudience: false, phonePastor: false }
  },
  {
    id: 'c-3',
    seatNumber: 3,
    name: 'Kayode Alabi',
    zone: 'Igede Ekiti',
    score: 0,
    bonusScore: 0,
    lifelinesUsed: { fiftyFifty: false, consultScriptures: false, askAudience: false, phonePastor: false }
  },
  {
    id: 'c-4',
    seatNumber: 4,
    name: 'Grace Babatunde',
    zone: 'Ido Ekiti',
    score: 0,
    bonusScore: 0,
    lifelinesUsed: { fiftyFifty: false, consultScriptures: false, askAudience: false, phonePastor: false }
  }
];

export default function App() {
  const [activeView, setActiveView] = useState('admin'); // 'admin' | 'stage' | 'podium'
  const [roomCode, setRoomCode] = useState(DEFAULT_ROOM_CODE);
  const [isSoundboardOpen, setIsSoundboardOpen] = useState(false);
  const [isQuestionManagerOpen, setIsQuestionManagerOpen] = useState(false);
  const [isHeritageOpen, setIsHeritageOpen] = useState(false);

  // Tournament Game State
  const [gameState, setGameState] = useState(() => {
    const saved = loadLocalGameState();
    if (saved && saved.questions && saved.questions.length > 0) {
      return saved;
    }
    return {
      currentQuestionIndex: 0,
      questions: DEFAULT_QUESTIONS,
      contestants: INITIAL_CONTESTANTS,
      activeContestantId: 'c-1',
      bonusContestantId: null,
      stageState: 'IDLE', // 'IDLE' | 'REVEALED' | 'ANSWERED_CORRECT' | 'ANSWERED_WRONG' | 'BONUS_ACTIVE'
      timer: {
        running: false,
        timeLeft: 30,
        initialTime: 30
      },
      eliminatedOptions: [],
      activeLifelineModal: null
    };
  });

  const channelRef = useRef(null);

  // Initialize Supabase Realtime Channel
  useEffect(() => {
    const channel = subscribeToGameChannel(roomCode, (eventData) => {
      console.log('[Supabase Realtime Sync Event Received]:', eventData);
      
      // Handle synced actions from admin if we are in stage view
      if (eventData.action === 'SYNC_STATE' && eventData.state) {
        setGameState(eventData.state);
      } else if (eventData.action === 'REVEAL_QUESTION') {
        classicalAudio.playReveal();
        setGameState(prev => ({
          ...prev,
          currentQuestionIndex: eventData.questionIndex,
          stageState: 'REVEALED',
          eliminatedOptions: [],
          activeLifelineModal: null,
          timer: {
            ...prev.timer,
            running: false,
            timeLeft: prev.questions[eventData.questionIndex]?.timeLimit || 30,
            initialTime: prev.questions[eventData.questionIndex]?.timeLimit || 30
          }
        }));
      } else if (eventData.action === 'ANSWER_CORRECT') {
        classicalAudio.playCorrect();
        setGameState(prev => ({
          ...prev,
          stageState: 'ANSWERED_CORRECT',
          timer: { ...prev.timer, running: false }
        }));
      } else if (eventData.action === 'ANSWER_WRONG') {
        classicalAudio.playWrong();
        setGameState(prev => ({
          ...prev,
          stageState: 'ANSWERED_WRONG',
          timer: { ...prev.timer, running: false }
        }));
      } else if (eventData.action === 'BONUS_PASS') {
        classicalAudio.playBonusPass();
        setGameState(prev => ({
          ...prev,
          stageState: 'BONUS_ACTIVE',
          bonusContestantId: eventData.targetContestantId,
          timer: { ...prev.timer, running: false, timeLeft: 15, initialTime: 15 }
        }));
      } else if (eventData.action === 'LIFELINE_ACTIVATED') {
        classicalAudio.playLifeline();
        setGameState(prev => ({
          ...prev,
          eliminatedOptions: eventData.eliminatedOptions || prev.eliminatedOptions,
          activeLifelineModal: eventData.lifelineId
        }));
      } else if (eventData.action === 'TIMER_TOGGLE') {
        if (eventData.running) {
          classicalAudio.startSuspense();
        } else {
          classicalAudio.stopSuspense();
        }
        setGameState(prev => ({
          ...prev,
          timer: { ...prev.timer, running: eventData.running }
        }));
      }
    });

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
      }
    };
  }, [roomCode]);

  // Persist game state locally
  useEffect(() => {
    saveLocalGameState(gameState);
  }, [gameState]);

  // Live Timer Countdown Interval
  useEffect(() => {
    let interval = null;
    if (gameState.timer.running && gameState.timer.timeLeft > 0) {
      interval = setInterval(() => {
        setGameState(prev => {
          if (!prev.timer.running) return prev;

          const newTime = prev.timer.timeLeft - 1;
          // Play tick
          if (newTime > 0 && newTime <= 10) {
            classicalAudio.playTick();
          } else if (newTime === 0) {
            classicalAudio.playTimeUp();
          }

          return {
            ...prev,
            timer: {
              ...prev.timer,
              timeLeft: Math.max(0, newTime),
              running: newTime > 0
            }
          };
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameState.timer.running, gameState.timer.timeLeft]);

  // Broadcast Helper
  const handleBroadcastEvent = (eventData) => {
    if (channelRef.current) {
      channelRef.current.sendEvent(eventData);
    }
  };

  // State Update Helper (also broadcasts full state if updated from admin)
  const handleUpdateGameState = (updates) => {
    setGameState(prev => {
      const nextState = { ...prev, ...updates };
      // Broadcast state update to connected stage screens
      handleBroadcastEvent({
        action: 'SYNC_STATE',
        state: nextState
      });
      return nextState;
    });
  };

  // Add / Import Questions
  const handleAddQuestions = (newQuestions) => {
    handleUpdateGameState({
      questions: [...gameState.questions, ...newQuestions]
    });
  };

  // Delete Question
  const handleDeleteQuestion = (indexToDelete) => {
    const updated = gameState.questions.filter((_, idx) => idx !== indexToDelete);
    handleUpdateGameState({
      questions: updated,
      currentQuestionIndex: Math.min(gameState.currentQuestionIndex, Math.max(0, updated.length - 1))
    });
  };

  // Reset to default questions
  const handleResetToDefaults = () => {
    handleUpdateGameState({
      questions: DEFAULT_QUESTIONS,
      currentQuestionIndex: 0
    });
  };

  // Reset Scores
  const handleResetScores = () => {
    if (window.confirm('Reset all contestant scores to 0 for a new tournament round?')) {
      const resetContestants = gameState.contestants.map(c => ({
        ...c,
        score: 0,
        bonusScore: 0,
        lifelinesUsed: { fiftyFifty: false, consultScriptures: false, askAudience: false, phonePastor: false }
      }));
      handleUpdateGameState({ contestants: resetContestants });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#060B19] text-afc-ivory selection:bg-afc-gold selection:text-afc-navy">
      
      {/* Top Navigation Bar */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        roomCode={roomCode}
        onOpenSoundboard={() => setIsSoundboardOpen(true)}
        onOpenHeritage={() => setIsHeritageOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* VIEW 1: QUIZMASTER ADMIN CONTROLLER */}
        {activeView === 'admin' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Contestant Management Roster */}
            <ContestantManager
              contestants={gameState.contestants}
              activeContestantId={gameState.activeContestantId}
              onSetActiveContestant={(id) => handleUpdateGameState({ activeContestantId: id })}
              onUpdateContestants={(updated) => handleUpdateGameState({ contestants: updated })}
              onResetScores={handleResetScores}
            />

            {/* Quizmaster Teleprompter & Live Controls */}
            <AdminController
              gameState={gameState}
              onUpdateGameState={handleUpdateGameState}
              onBroadcastEvent={handleBroadcastEvent}
              onOpenQuestionManager={() => setIsQuestionManagerOpen(true)}
              onOpenPodium={() => setActiveView('podium')}
            />

          </div>
        )}

        {/* VIEW 2: STAGE LED DISPLAY */}
        {activeView === 'stage' && (
          <div className="animate-fade-in">
            <StageDisplay
              gameState={gameState}
              onUseLifeline={(lifelineId) => {
                // Lifeline triggered on stage
                const updatedContestants = gameState.contestants.map(c => {
                  if (c.id === gameState.activeContestantId) {
                    return {
                      ...c,
                      lifelinesUsed: { ...c.lifelinesUsed, [lifelineId]: true }
                    };
                  }
                  return c;
                });
                handleUpdateGameState({
                  contestants: updatedContestants,
                  activeLifelineModal: lifelineId
                });
              }}
            />
          </div>
        )}

        {/* VIEW 3: GRAND PODIUM & CEREMONY */}
        {activeView === 'podium' && (
          <GrandPodium
            contestants={gameState.contestants}
            onBackToStage={() => setActiveView('stage')}
            onResetTournament={handleResetScores}
          />
        )}

      </main>

      {/* Footnote acknowledging Headquarters */}
      <footer className="py-4 border-t border-afc-gold/20 text-center text-xs text-gray-400 bg-afc-navy/80 space-y-1">
        <p className="font-semibold text-afc-gold-light">
          The Apostolic Faith Church • Ekiti Area Headquarters: 74 Ajilosun Street, Ado-Ekiti
        </p>
        <p className="text-[11px] text-gray-400">
          Africa Headquarters: Faith City, Anthony Village / Igbesa, Lagos, Nigeria • International Headquarters: Portland, Oregon, USA
        </p>
      </footer>

      {/* Modals */}
      <SoundboardModal
        isOpen={isSoundboardOpen}
        onClose={() => setIsSoundboardOpen(false)}
      />

      <QuestionImporterModal
        isOpen={isQuestionManagerOpen}
        onClose={() => setIsQuestionManagerOpen(false)}
        questions={gameState.questions}
        onAddQuestions={handleAddQuestions}
        onDeleteQuestion={handleDeleteQuestion}
        onResetToDefaults={handleResetToDefaults}
      />

      <HeritageModal
        isOpen={isHeritageOpen}
        onClose={() => setIsHeritageOpen(false)}
      />

    </div>
  );
}
