import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Tv, 
  BookOpen, 
  Users, 
  Trophy, 
  Settings, 
  LogOut, 
  KeyRound, 
  Music, 
  Home, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Upload, 
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowLeft
} from 'lucide-react';
import AdminController from './AdminController';
import ContestantManager from './ContestantManager';
import GrandPodium from './GrandPodium';
import QuestionImporterModal from './QuestionImporterModal';
import SoundboardModal from './SoundboardModal';
import PasswordSettingsModal from './PasswordSettingsModal';
import { ADMIN_SESSION_KEY } from './AdminLoginModal';
import classicalAudio from '../services/audioService';

export default function AdminPortal({
  gameState,
  onUpdateGameState,
  onBroadcastEvent,
  onAddQuestions,
  onDeleteQuestion,
  onResetToDefaults,
  onResetScores,
  onExitToHome,
  onLaunchStage
}) {
  const [adminTab, setAdminTab] = useState('controller'); // 'controller' | 'questions' | 'contestants' | 'podium' | 'settings'
  const [isQuestionManagerOpen, setIsQuestionManagerOpen] = useState(false);
  const [isSoundboardOpen, setIsSoundboardOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    onExitToHome();
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Admin Top Command Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-afc-navy-surface via-afc-navy-mid to-afc-navy-surface border-2 border-afc-gold/50 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-afc-gold via-afc-gold-bright to-afc-gold-dark flex items-center justify-center text-afc-navy font-serif font-black shadow-gold-glow">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-xl font-serif font-black text-white">
                Admin Command Dashboard
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                ACTIVE SESSION
              </span>
            </div>
            <p className="text-xs text-gray-300">
              Who Wants to Be a Bible Giant • Quizmaster Mission Control
            </p>
          </div>
        </div>

        {/* Center/Right: Action Buttons */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3">
          
          {/* Quick Launch Stage */}
          <button
            onClick={onLaunchStage}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl gold-button text-xs font-serif font-black shadow-gold-glow cursor-pointer"
          >
            <Tv className="w-4 h-4 text-afc-navy" />
            <span>Open Stage (Projector)</span>
          </button>

          {/* Soundboard Quick Button */}
          <button
            onClick={() => setIsSoundboardOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-afc-navy border border-afc-gold/30 text-afc-gold hover:border-afc-gold text-xs font-bold transition-all cursor-pointer"
          >
            <Music className="w-4 h-4" />
            <span className="hidden sm:inline">Soundboard</span>
          </button>

          {/* Return Home */}
          <button
            onClick={onExitToHome}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-gray-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </button>

          {/* Lock / Logout */}
          <button
            onClick={handleLogout}
            title="Lock Admin Portal"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-200 hover:bg-rose-900 text-xs font-bold transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>

        </div>

      </div>

      {/* Admin Tab Navigation */}
      <div className="flex border-b border-afc-gold/20 bg-afc-navy-surface/60 px-4 sm:px-6 pt-2 rounded-2xl overflow-x-auto gap-2">
        {[
          { id: 'controller', label: '🎮 Live Stage Controller', icon: Tv },
          { id: 'questions', label: '📚 Question Bank Manager', icon: BookOpen },
          { id: 'contestants', label: '👥 Contestants & Ekiti Zones', icon: Users },
          { id: 'podium', label: '🏆 Grand Podium & Awards', icon: Trophy },
          { id: 'settings', label: '⚙️ Security & Settings', icon: Settings },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap rounded-t-xl cursor-pointer ${
                adminTab === tab.id
                  ? 'border-afc-gold text-afc-gold-light bg-afc-navy/80 shadow-md'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENTS */}

      {/* TAB 1: LIVE CONTROLLER */}
      {adminTab === 'controller' && (
        <div className="space-y-6 animate-fade-in">
          <AdminController
            gameState={gameState}
            onUpdateGameState={onUpdateGameState}
            onBroadcastEvent={onBroadcastEvent}
            onOpenQuestionManager={() => setAdminTab('questions')}
            onOpenPodium={() => setAdminTab('podium')}
          />
        </div>
      )}

      {/* TAB 2: QUESTION BANK MANAGER */}
      {adminTab === 'questions' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-3xl bg-afc-navy-surface border-2 border-afc-gold/40 shadow-xl flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-serif font-black text-lg text-white">
                Tournament Question Bank ({gameState.questions.length} Total Questions)
              </h3>
              <p className="text-xs text-gray-400">
                Manage, add, delete, or import questions directly from Word (.docx) files
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsQuestionManagerOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl gold-button text-xs font-serif font-black shadow-gold-glow cursor-pointer"
              >
                <Upload className="w-4 h-4 text-afc-navy" />
                <span>Import Word (.docx) / Add Questions</span>
              </button>
              
              <button
                onClick={onResetToDefaults}
                className="px-4 py-2.5 rounded-xl bg-afc-navy border border-afc-gold/30 text-afc-gold text-xs font-bold hover:border-afc-gold"
              >
                Reset Default Bank
              </button>
            </div>
          </div>

          {/* Question List View */}
          <div className="grid grid-cols-1 gap-3">
            {gameState.questions.map((q, idx) => (
              <div 
                key={q.id || idx}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  gameState.currentQuestionIndex === idx
                    ? 'bg-afc-navy border-afc-gold shadow-gold-glow'
                    : 'bg-afc-navy-surface border-afc-gold/20 hover:border-afc-gold/50'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-8 h-8 rounded-xl bg-afc-gold text-afc-navy font-serif font-black flex items-center justify-center text-xs shrink-0 shadow-md">
                      Q{idx + 1}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-afc-gold">
                          {q.section}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-afc-navy border border-afc-gold/30 text-gray-300">
                          {q.type}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {q.points} pts (Bonus: {q.bonusPoints} pts)
                        </span>
                      </div>
                      <h4 className="text-sm font-serif font-bold text-white leading-snug">
                        {q.prompt}
                      </h4>
                      {q.options && (
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          {Object.entries(q.options).map(([k, v]) => (
                            <div 
                              key={k} 
                              className={`text-xs p-1.5 rounded-lg font-mono ${
                                k === q.answer 
                                  ? 'bg-emerald-950/80 border border-emerald-400 text-emerald-200 font-bold' 
                                  : 'bg-black/30 text-gray-300'
                              }`}
                            >
                              <strong>{k}:</strong> {v}
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="text-[11px] text-gray-400 pt-1">
                        <strong>Answer:</strong> <span className="text-emerald-300 font-bold">{q.answer}</span> • <strong>Ref:</strong> {q.scriptureRef}
                      </div>
                    </div>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => onDeleteQuestion(q.id)}
                    title="Delete question"
                    className="p-2 rounded-xl text-gray-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CONTESTANTS & ZONES */}
      {adminTab === 'contestants' && (
        <div className="space-y-6 animate-fade-in">
          <ContestantManager
            contestants={gameState.contestants}
            activeContestantId={gameState.activeContestantId}
            onSetActiveContestant={(id) => onUpdateGameState({ activeContestantId: id })}
            onUpdateContestants={(updated) => onUpdateGameState({ contestants: updated })}
            onResetScores={onResetScores}
          />
        </div>
      )}

      {/* TAB 4: GRAND PODIUM & CEREMONY */}
      {adminTab === 'podium' && (
        <div className="space-y-6 animate-fade-in">
          <GrandPodium
            contestants={gameState.contestants}
            onBackToStage={onLaunchStage}
            onResetTournament={onResetScores}
          />
        </div>
      )}

      {/* TAB 5: SECURITY & SETTINGS */}
      {adminTab === 'settings' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-3xl bg-afc-navy-surface border-2 border-afc-gold/40 shadow-xl space-y-6 max-w-2xl">
            <div>
              <h3 className="font-serif font-black text-lg text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-afc-gold" />
                Tournament & Security Configuration
              </h3>
              <p className="text-xs text-gray-400">
                Manage Quizmaster authentication and default round timings
              </p>
            </div>

            <div className="space-y-4">
              
              {/* Admin Password Change Card */}
              <div className="p-4 rounded-2xl bg-afc-navy border border-afc-gold/30 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <KeyRound className="w-4 h-4 text-afc-gold" />
                    <span>Admin Master Password</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Change the password required to access the Quizmaster Command Portal
                  </p>
                </div>
                <button
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="px-4 py-2 rounded-xl gold-button text-xs font-serif font-black shadow-md cursor-pointer"
                >
                  Change Password
                </button>
              </div>

              {/* Tournament Reset */}
              <div className="p-4 rounded-2xl bg-afc-navy border border-rose-500/30 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-bold text-rose-300 flex items-center gap-1.5">
                    <RotateCcw className="w-4 h-4 text-rose-400" />
                    <span>Reset Tournament Scores & State</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Clear all contestant scores, lifelines, and return to Question 1
                  </p>
                </div>
                <button
                  onClick={onResetScores}
                  className="px-4 py-2 rounded-xl bg-rose-950 border border-rose-500 text-rose-200 text-xs font-bold hover:bg-rose-900 cursor-pointer"
                >
                  Reset Scores
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <QuestionImporterModal
        isOpen={isQuestionManagerOpen}
        onClose={() => setIsQuestionManagerOpen(false)}
        questions={gameState.questions}
        onAddQuestions={onAddQuestions}
        onDeleteQuestion={onDeleteQuestion}
        onResetToDefaults={onResetToDefaults}
      />

      <SoundboardModal
        isOpen={isSoundboardOpen}
        onClose={() => setIsSoundboardOpen(false)}
      />

      <PasswordSettingsModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />

    </div>
  );
}
