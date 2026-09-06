import React, { useState } from 'react';
import { 
  Tv, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Award, 
  BookOpen, 
  HelpCircle, 
  Eye, 
  EyeOff, 
  Share2, 
  Volume2, 
  ChevronRight,
  Send,
  Trophy,
  Filter
} from 'lucide-react';
import classicalAudio from '../services/audioService';
import LifelinesBar from './LifelinesBar';

export default function AdminController({
  gameState,
  onUpdateGameState,
  onBroadcastEvent,
  onOpenQuestionManager,
  onOpenPodium
}) {
  const [showAnswerToAdmin, setShowAnswerToAdmin] = useState(true);
  const [selectedSectionFilter, setSelectedSectionFilter] = useState('ALL');

  const {
    currentQuestionIndex,
    questions,
    contestants,
    activeContestantId,
    bonusContestantId,
    stageState, // 'IDLE' | 'REVEALED' | 'ANSWERED_CORRECT' | 'ANSWERED_WRONG' | 'BONUS_ACTIVE'
    timer, // { running, timeLeft, initialTime }
    eliminatedOptions, // ['A', 'C'] from 50:50
    activeLifelineModal, // null | 'audience' | 'pastor' | 'scripture'
  } = gameState;

  const currentQ = questions[currentQuestionIndex] || null;
  const activeContestant = contestants.find(c => c.id === activeContestantId) || contestants[0];
  const bonusContestant = contestants.find(c => c.id === bonusContestantId);

  // Filter questions for the selector
  const availableSections = ['ALL', ...Array.from(new Set(questions.map(q => q.section)))];
  const filteredQuestions = selectedSectionFilter === 'ALL'
    ? questions
    : questions.filter(q => q.section === selectedSectionFilter);

  // 1. Reveal Question on Stage
  const handleRevealOnStage = () => {
    classicalAudio.playReveal();
    onUpdateGameState({
      stageState: 'REVEALED',
      eliminatedOptions: [],
      activeLifelineModal: null,
      timer: {
        ...timer,
        running: false,
        timeLeft: currentQ?.timeLimit || 30,
        initialTime: currentQ?.timeLimit || 30
      }
    });
    onBroadcastEvent({
      action: 'REVEAL_QUESTION',
      questionIndex: currentQuestionIndex
    });
  };

  // 2. Start / Pause Timer
  const handleToggleTimer = () => {
    const nextRunning = !timer.running;
    if (nextRunning) {
      classicalAudio.startSuspense();
    } else {
      classicalAudio.stopSuspense();
    }
    onUpdateGameState({
      timer: {
        ...timer,
        running: nextRunning
      }
    });
    onBroadcastEvent({
      action: 'TIMER_TOGGLE',
      running: nextRunning
    });
  };

  const handleResetTimer = () => {
    classicalAudio.stopSuspense();
    onUpdateGameState({
      timer: {
        ...timer,
        running: false,
        timeLeft: currentQ?.timeLimit || 30
      }
    });
    onBroadcastEvent({
      action: 'TIMER_RESET',
      timeLeft: currentQ?.timeLimit || 30
    });
  };

  // 3. Award Correct Answer to Active Contestant
  const handleAwardCorrect = () => {
    classicalAudio.playCorrect();
    const awardedContestant = bonusContestantId ? bonusContestant : activeContestant;
    const pointsAwarded = bonusContestantId ? (currentQ?.bonusPoints || 10) : (currentQ?.points || 20);

    if (awardedContestant) {
      const updatedContestants = contestants.map(c => {
        if (c.id === awardedContestant.id) {
          return {
            ...c,
            score: c.score + pointsAwarded,
            bonusScore: bonusContestantId ? c.bonusScore + pointsAwarded : c.bonusScore
          };
        }
        return c;
      });

      onUpdateGameState({
        contestants: updatedContestants,
        stageState: 'ANSWERED_CORRECT',
        timer: { ...timer, running: false }
      });

      onBroadcastEvent({
        action: 'ANSWER_CORRECT',
        winnerId: awardedContestant.id,
        points: pointsAwarded,
        isBonus: !!bonusContestantId
      });
    }
  };

  // 4. Mark Wrong & Pass Bonus Question to Next Contestant in Numerical Order!
  const handleMarkWrongAndPassBonus = () => {
    classicalAudio.playWrong();

    if (contestants.length <= 1) {
      onUpdateGameState({
        stageState: 'ANSWERED_WRONG',
        timer: { ...timer, running: false }
      });
      onBroadcastEvent({ action: 'ANSWER_WRONG' });
      return;
    }

    // Determine currently failing contestant seat
    const currentSeatHolder = bonusContestantId ? bonusContestant : activeContestant;
    const currentSeat = currentSeatHolder?.seatNumber || 1;

    // Next seat in numerical order (wrapping around, e.g. 1 -> 2 -> 3 -> 1)
    const sortedContestants = [...contestants].sort((a, b) => a.seatNumber - b.seatNumber);
    let nextContestant = sortedContestants.find(c => c.seatNumber > currentSeat);
    if (!nextContestant) {
      nextContestant = sortedContestants[0]; // Wrap back to first seat
    }

    // Play herald sound for bonus pass
    setTimeout(() => {
      classicalAudio.playBonusPass();
    }, 400);

    onUpdateGameState({
      stageState: 'BONUS_ACTIVE',
      bonusContestantId: nextContestant.id,
      timer: {
        ...timer,
        running: false,
        timeLeft: 15, // Standard bonus countdown
        initialTime: 15
      }
    });

    onBroadcastEvent({
      action: 'BONUS_PASS',
      targetContestantId: nextContestant.id,
      targetName: nextContestant.name,
      targetSeat: nextContestant.seatNumber,
      targetZone: nextContestant.zone
    });
  };

  // 5. Lifelines Execution
  const handleUseLifeline = (lifelineId) => {
    if (!activeContestant) return;

    // Mark as used on contestant
    const updatedContestants = contestants.map(c => {
      if (c.id === activeContestant.id) {
        return {
          ...c,
          lifelinesUsed: {
            ...c.lifelinesUsed,
            [lifelineId]: true
          }
        };
      }
      return c;
    });

    let newEliminated = [...eliminatedOptions];
    if (lifelineId === 'fiftyFifty' && currentQ?.options && currentQ.answer) {
      // Find 2 incorrect options to eliminate
      const incorrectKeys = Object.keys(currentQ.options).filter(k => k !== currentQ.answer);
      // Pick 2 random
      const shuffled = incorrectKeys.sort(() => 0.5 - Math.random());
      newEliminated = shuffled.slice(0, 2);
    }

    onUpdateGameState({
      contestants: updatedContestants,
      eliminatedOptions: newEliminated,
      activeLifelineModal: lifelineId
    });

    onBroadcastEvent({
      action: 'LIFELINE_ACTIVATED',
      lifelineId,
      eliminatedOptions: newEliminated
    });
  };

  // 6. Navigate Questions
  const handleSelectQuestion = (idx) => {
    classicalAudio.stopSuspense();
    // Advance active contestant sequentially as well
    const nextContestantIdx = idx % (contestants.length || 1);
    const nextContestant = contestants[nextContestantIdx];

    onUpdateGameState({
      currentQuestionIndex: idx,
      stageState: 'IDLE',
      bonusContestantId: null,
      eliminatedOptions: [],
      activeLifelineModal: null,
      activeContestantId: nextContestant ? nextContestant.id : activeContestantId,
      timer: {
        running: false,
        timeLeft: questions[idx]?.timeLimit || 30,
        initialTime: questions[idx]?.timeLimit || 30
      }
    });

    onBroadcastEvent({
      action: 'SELECT_QUESTION',
      questionIndex: idx
    });
  };

  if (!currentQ) {
    return (
      <div className="p-8 text-center gold-card rounded-2xl">
        <p className="text-gray-300">No questions loaded in tournament bank.</p>
        <button
          onClick={onOpenQuestionManager}
          className="mt-3 px-5 py-2 rounded-xl bg-afc-gold text-afc-navy font-bold text-xs"
        >
          Load Questions Now
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      
      {/* Quizmaster Action Header */}
      <div className="gold-card rounded-2xl p-4 sm:p-5 border border-afc-gold/30">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Active Question Info */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-afc-gold to-afc-gold-dark flex items-center justify-center font-serif font-black text-afc-navy text-lg shadow-gold-glow">
              Q{currentQuestionIndex + 1}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold tracking-wider text-afc-gold-light">
                  {currentQ.section}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-afc-navy border border-afc-gold/40 text-afc-gold">
                  {currentQ.type}
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  ({currentQuestionIndex + 1} of {questions.length})
                </span>
              </div>
              <p className="text-xs text-gray-300 font-semibold">
                Direct Value: <strong className="text-afc-gold">{currentQ.points} pts</strong> | Bonus Value: <strong className="text-cyan-300">{currentQ.bonusPoints} pts</strong>
              </p>
            </div>
          </div>

          {/* Quick Controls: Question Bank & Podium */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenQuestionManager}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-afc-navy-surface border border-afc-gold/30 text-xs font-bold text-gray-200 hover:text-afc-gold hover:border-afc-gold transition-colors"
            >
              <BookOpen className="w-4 h-4 text-afc-gold" />
              <span>Questions Bank</span>
            </button>

            <button
              onClick={onOpenPodium}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-afc-gold via-afc-gold to-afc-gold-dark text-afc-navy text-xs font-extrabold shadow-gold-glow hover:brightness-110"
            >
              <Trophy className="w-4 h-4" />
              <span>Grand Podium Ceremony</span>
            </button>
          </div>
        </div>

        {/* Section Filter & Question Carousel Selector */}
        <div className="mt-4 pt-3 border-t border-afc-gold/15 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <Filter className="w-3.5 h-3.5 text-afc-gold" />
            <span className="text-gray-400 font-semibold">Filter Section:</span>
            <select
              value={selectedSectionFilter}
              onChange={(e) => setSelectedSectionFilter(e.target.value)}
              className="bg-afc-navy border border-afc-gold/30 rounded-lg px-2 py-1 text-xs text-white"
            >
              {availableSections.map(sec => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-1">
            <button
              onClick={() => handleSelectQuestion(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className="p-1 rounded bg-afc-navy border border-afc-gold/20 text-gray-300 disabled:opacity-30"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>

            {filteredQuestions.map((q) => {
              const originalIndex = questions.findIndex(orig => orig.id === q.id);
              const isCurrent = originalIndex === currentQuestionIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => handleSelectQuestion(originalIndex)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all shrink-0 ${
                    isCurrent
                      ? 'bg-afc-gold text-afc-navy shadow-gold-glow scale-110 font-black'
                      : 'bg-afc-navy-surface text-gray-300 border border-afc-gold/20 hover:border-afc-gold'
                  }`}
                >
                  {originalIndex + 1}
                </button>
              );
            })}

            <button
              onClick={() => handleSelectQuestion(Math.min(questions.length - 1, currentQuestionIndex + 1))}
              disabled={currentQuestionIndex === questions.length - 1}
              className="p-1 rounded bg-afc-navy border border-afc-gold/20 text-gray-300 disabled:opacity-30"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Teleprompter & Live Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left 8 Cols: Teleprompter & Answering Pad */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Question Teleprompter Box */}
          <div className="gold-card rounded-2xl p-6 border-2 border-afc-gold/40 relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-afc-gold/20 mb-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-afc-gold">
                ★ LIVE TELEPROMPTER VIEW (ADMIN ONLY)
              </span>
              <button
                onClick={() => setShowAnswerToAdmin(!showAnswerToAdmin)}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-afc-gold"
              >
                {showAnswerToAdmin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showAnswerToAdmin ? 'Hide Answer' : 'Show Answer'}</span>
              </button>
            </div>

            {/* Question Text */}
            <h2 className="text-base sm:text-xl font-serif font-bold text-white leading-relaxed mb-4">
              {currentQ.prompt}
            </h2>

            {/* Options Display for Objective */}
            {currentQ.options && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                {Object.entries(currentQ.options).map(([letter, text]) => {
                  const isCorrect = letter === currentQ.answer;
                  const isEliminated = eliminatedOptions.includes(letter);

                  return (
                    <div
                      key={letter}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                        isEliminated
                          ? 'opacity-20 bg-black/40 border-gray-800 line-through'
                          : isCorrect && showAnswerToAdmin
                          ? 'bg-emerald-950/70 border-emerald-400 text-emerald-100 shadow-md ring-1 ring-emerald-400'
                          : 'bg-afc-navy-surface border-afc-gold/25 text-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[11px] ${
                          isCorrect && showAnswerToAdmin ? 'bg-emerald-500 text-white' : 'bg-black/40 text-afc-gold'
                        }`}>
                          {letter}
                        </span>
                        <span>{text}</span>
                      </div>
                      {isCorrect && showAnswerToAdmin && (
                        <span className="text-[10px] font-bold uppercase bg-emerald-800 px-1.5 py-0.5 rounded text-white">
                          CORRECT
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Hidden / Visible Answer & Scripture Reference Banner */}
            {showAnswerToAdmin && (
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/60 to-afc-navy-surface border border-emerald-500/40 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Correct Answer: <span className="text-white text-sm font-serif font-black">{currentQ.answer}</span>
                  </span>
                  <span className="text-[11px] text-gray-400">
                    Ref: <strong className="text-afc-gold">{currentQ.scriptureRef}</strong>
                  </span>
                </div>
                {currentQ.explanation && (
                  <p className="text-gray-300 text-[11px] pt-1 border-t border-emerald-500/20">
                    {currentQ.explanation}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Primary Quizmaster Stage Action Bar */}
          <div className="gold-card rounded-2xl p-5 border border-afc-gold/30 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-afc-gold-light flex items-center gap-2">
              <Tv className="w-4 h-4" /> Live Stage Controller Actions
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* 1. Reveal on Stage Button */}
              <button
                onClick={handleRevealOnStage}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-afc-navy-surface to-afc-navy border-2 border-afc-gold text-afc-gold-light hover:brightness-125 font-bold text-xs shadow-md transition-all hover:scale-[1.02]"
              >
                <Send className="w-4 h-4 text-afc-gold" />
                <span>1. Reveal on Stage</span>
              </button>

              {/* 2. Timer Toggle */}
              <button
                onClick={handleToggleTimer}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 font-bold text-xs transition-all hover:scale-[1.02] ${
                  timer.running
                    ? 'bg-amber-950/60 border-amber-400 text-amber-200'
                    : 'bg-afc-navy-surface border-afc-gold/40 text-gray-200'
                }`}
              >
                {timer.running ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-afc-gold" />}
                <span>{timer.running ? `Pause Timer (${timer.timeLeft}s)` : `Start Timer (${timer.timeLeft}s)`}</span>
              </button>

              {/* 3. Reset Timer */}
              <button
                onClick={handleResetTimer}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-afc-navy-surface border border-gray-700 text-gray-300 hover:text-white text-xs font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset ({currentQ.timeLimit}s)</span>
              </button>

            </div>

            {/* Score Decision Buttons (Correct vs Wrong & Sequential Bonus) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              
              {/* Correct Button */}
              <button
                onClick={handleAwardCorrect}
                className="flex items-center justify-center gap-2.5 p-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-700 text-white font-serif font-black text-sm shadow-lg hover:brightness-110 border border-emerald-300 transition-all hover:scale-[1.02]"
              >
                <CheckCircle2 className="w-5 h-5 text-white" />
                <span>
                  CORRECT! Award +{bonusContestantId ? currentQ.bonusPoints : currentQ.points} Pts
                </span>
              </button>

              {/* Wrong & Pass Bonus Button (In numerical order) */}
              <button
                onClick={handleMarkWrongAndPassBonus}
                className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-gradient-to-r from-rose-700 via-rose-600 to-red-800 text-white font-serif font-bold text-sm shadow-lg hover:brightness-110 border border-rose-400 transition-all hover:scale-[1.02]"
              >
                <XCircle className="w-5 h-5 text-white" />
                <span>WRONG! Pass Bonus to Next Seat</span>
              </button>

            </div>

            {/* Biblical Lifelines Trigger (Admin Panel) */}
            <div className="pt-2 border-t border-afc-gold/15">
              <span className="block text-[11px] uppercase font-bold text-gray-400 mb-2">
                Trigger Biblical Lifeline for Active Contestant:
              </span>
              <LifelinesBar
                lifelinesUsed={activeContestant?.lifelinesUsed || {}}
                onUseLifeline={handleUseLifeline}
                isObjective={currentQ.type === 'objective'}
              />
            </div>

          </div>

        </div>

        {/* Right 4 Cols: Active Contestant & Bonus Tracker */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Active Contestant Card */}
          <div className="gold-card rounded-2xl p-5 border-2 border-afc-gold/50 shadow-gold-glow">
            <div className="flex items-center justify-between pb-3 border-b border-afc-gold/20 mb-3">
              <span className="text-[10px] uppercase font-black tracking-widest text-afc-gold">
                ★ ACTIVE ON STAGE
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-afc-gold text-afc-navy">
                Seat #{activeContestant?.seatNumber}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-afc-gold text-afc-navy font-serif font-black text-xl flex items-center justify-center border-2 border-white shadow-gold-glow">
                {activeContestant?.seatNumber}
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">{activeContestant?.name}</h3>
                <p className="text-xs text-afc-gold">{activeContestant?.zone}</p>
                <div className="mt-1 font-serif font-black text-lg text-afc-gold-light">
                  {activeContestant?.score} <span className="text-xs font-sans text-gray-400">Total Points</span>
                </div>
              </div>
            </div>

            {/* Bonus Status Alert */}
            {bonusContestantId && (
              <div className="mt-4 p-3 rounded-xl bg-cyan-950/60 border border-cyan-400 text-xs animate-pulse-slow">
                <span className="font-bold text-cyan-300 uppercase tracking-wide block">
                  ⚡ BONUS OPPORTUNITY ACTIVE
                </span>
                <p className="text-gray-200 mt-0.5">
                  Passed to: <strong className="text-white">{bonusContestant?.name}</strong> ({bonusContestant?.zone})
                </p>
                <span className="text-[10px] text-cyan-200 block mt-1">
                  Worth +{currentQ.bonusPoints} bonus points if answered correctly!
                </span>
              </div>
            )}
          </div>

          {/* Quick Stage Status Card */}
          <div className="gold-card rounded-2xl p-4 border border-afc-gold/20 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Stage State:</span>
              <span className="font-mono font-bold text-afc-gold">{stageState}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Timer State:</span>
              <span className="font-mono font-bold text-white">
                {timer.running ? 'RUNNING' : 'STOPPED'} ({timer.timeLeft}s)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Lifeline Active:</span>
              <span className="font-mono font-bold text-purple-300">
                {activeLifelineModal || 'None'}
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
