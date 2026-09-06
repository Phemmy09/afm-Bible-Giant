import React, { useEffect, useState } from 'react';
import { 
  Trophy, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  MapPin, 
  PhoneCall, 
  Users, 
  BookOpen, 
  Percent, 
  Volume2,
  Flame,
  Radio
} from 'lucide-react';
import confetti from 'canvas-confetti';
import LifelinesBar from './LifelinesBar';

export default function StageDisplay({ 
  gameState, 
  onUseLifeline 
}) {
  const {
    currentQuestionIndex,
    questions,
    contestants,
    activeContestantId,
    bonusContestantId,
    stageState,
    timer,
    eliminatedOptions = [],
    activeLifelineModal
  } = gameState;

  const currentQ = questions[currentQuestionIndex] || null;
  const activeContestant = contestants.find(c => c.id === activeContestantId) || contestants[0];
  const bonusContestant = contestants.find(c => c.id === bonusContestantId);

  // Trigger celebration confetti on correct answer
  useEffect(() => {
    if (stageState === 'ANSWERED_CORRECT') {
      try {
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#FFF9D2', '#10B981', '#06B6D4', '#ffffff']
        });
      } catch (e) {}
    }
  }, [stageState]);

  if (!currentQ) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-8 space-y-6">
        <div className="relative">
          <img src="/afc/ydd_logo_hq.png" alt="YDD Logo" className="w-32 h-32 rounded-full border-2 border-afc-gold shadow-gold-glow animate-float-slow bg-white p-1" />
          <span className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-afc-gold text-afc-navy font-black text-xs uppercase tracking-widest shadow-lg">
            2030 ARENA
          </span>
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black gold-text-shimmer">
            WHO WANTS TO BE A BIBLE GIANT
          </h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base font-medium max-w-md mx-auto">
            Apostolic Faith Church • Youth Development Directorate (YDD)
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-afc-navy-surface border border-afc-gold/30 text-xs text-afc-gold font-bold animate-pulse">
          <Radio className="w-4 h-4 text-emerald-400" />
          Awaiting Quizmaster to initiate stage tournament...
        </div>
      </div>
    );
  }

  // Timer calculation
  const totalTime = timer.initialTime || currentQ.timeLimit || 30;
  const timeFraction = Math.max(0, timer.timeLeft / totalTime);
  const strokeDashoffset = 283 - (283 * timeFraction);

  // Dynamic 2030 Chromatic Timer color
  const timerColor = timer.timeLeft <= 5 
    ? '#EF4444' 
    : timer.timeLeft <= 10 
    ? '#06B6D4' 
    : '#D4AF37';

  return (
    <div className="relative w-full max-w-6xl mx-auto px-2 sm:px-4 py-3 space-y-4">
      
      {/* 2030 Futuristic Stage HUD Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-3xl bg-gradient-to-r from-afc-navy-surface/95 via-afc-navy-mid/95 to-afc-navy-surface/95 border border-afc-gold/40 shadow-2xl backdrop-blur-xl">
        
        {/* Left: Dual Crests & Round Info */}
        <div className="flex items-center gap-3.5">
          <div className="flex items-center -space-x-3">
            <div className="relative z-10 w-12 h-12 rounded-full border-2 border-afc-gold shadow-gold-glow bg-afc-navy p-0.5 overflow-hidden">
              <img src="/logo.svg" alt="AFC Crest" className="w-full h-full object-contain" />
            </div>
            <div className="relative z-20 w-10 h-10 rounded-full border-2 border-cyan-400 shadow-cyan-glow bg-white p-0.5 overflow-hidden">
              <img src="/afc/ydd_logo_hq.png" alt="YDD Logo" className="w-full h-full object-contain" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-afc-gold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-afc-gold" />
                {currentQ.section}
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 shadow-sm">
                AFMWECA YDD
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                Question <span className="text-afc-gold font-mono">{currentQuestionIndex + 1}</span> of {questions.length}
              </h3>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-afc-gold text-afc-navy shadow-sm">
                {currentQ.type}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Stage Value Pill */}
        <div className="hidden lg:flex items-center gap-3 px-5 py-2 rounded-2xl bg-afc-navy/80 border border-afc-gold/30 shadow-inner">
          <div className="text-right">
            <span className="text-[10px] font-bold text-gray-400 block leading-tight">QUESTION VALUE</span>
            <span className="font-serif font-black text-lg text-afc-gold-light leading-none">
              {currentQ.points} PTS
            </span>
          </div>
          <div className="h-6 w-px bg-afc-gold/30"></div>
          <div className="text-left">
            <span className="text-[10px] font-bold text-cyan-400 block leading-tight">BONUS PASS</span>
            <span className="font-serif font-black text-sm text-cyan-200 leading-none">
              +{currentQ.bonusPoints} PTS
            </span>
          </div>
        </div>

        {/* Right: Active Contestant on Stage with Equalizer Wave */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-afc-navy via-afc-navy-surface to-afc-navy px-4 py-2 rounded-2xl border border-afc-gold/40 shadow-gold-glow">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-afc-gold via-afc-gold-bright to-afc-gold-dark text-afc-navy font-serif font-black flex items-center justify-center text-base shadow-md">
              {activeContestant?.seatNumber}
            </div>
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-afc-navy"></span>
          </div>

          <div className="text-right">
            <div className="flex items-center justify-end gap-1.5">
              <span className="text-[9px] uppercase font-black text-afc-gold tracking-widest">
                CONTESTANT ON STAGE
              </span>
              {/* Animated Mini Equalizer */}
              {timer.running && (
                <div className="flex items-end gap-0.5 h-3">
                  <div className="w-0.5 bg-afc-gold eq-bar"></div>
                  <div className="w-0.5 bg-afc-gold eq-bar"></div>
                  <div className="w-0.5 bg-afc-gold eq-bar"></div>
                </div>
              )}
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
              {activeContestant?.name}
            </h4>
            <span className="text-[10px] text-gray-300 flex items-center justify-end gap-1">
              <MapPin className="w-3 h-3 text-afc-gold" />
              {activeContestant?.zone}
            </span>
          </div>
        </div>

      </div>

      {/* Bonus Question Alert Banner */}
      {bonusContestantId && (
        <div className="p-4 rounded-3xl bg-gradient-to-r from-cyan-950 via-blue-950 to-cyan-950 border-2 border-cyan-400 shadow-cyan-glow flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-cyan-400 text-afc-navy font-serif font-black flex items-center justify-center text-xl shadow-lg">
              {bonusContestant?.seatNumber}
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-cyan-300 block flex items-center gap-1">
                <Flame className="w-4 h-4 text-cyan-400" />
                BONUS QUESTION PASSED IN NUMERICAL ORDER!
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white">
                Turn awarded to: <strong className="text-cyan-200">{bonusContestant?.name}</strong> ({bonusContestant?.zone})
              </h4>
            </div>
          </div>
          <div className="text-right font-serif font-black text-xl text-cyan-300">
            +{currentQ.bonusPoints} <span className="text-xs font-sans font-bold text-cyan-100 block">BONUS PTS</span>
          </div>
        </div>
      )}

      {/* Centerpiece 2030 Holographic Question Card */}
      <div className="relative gold-card-futuristic rounded-3xl p-6 sm:p-9 border-2 border-afc-gold/50 shadow-2xl overflow-hidden min-h-[240px] flex flex-col justify-between">
        
        {/* Background Subtle Watermark */}
        <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
          <img src="/afc/weca_logo.svg" alt="AFC Watermark" className="w-[450px] h-[450px]" />
        </div>

        {/* Question Header & Circular SVG Countdown Ring */}
        <div className="flex items-start justify-between gap-4 mb-4 z-10">
          <div className="flex-1 pr-2">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-afc-gold animate-ping"></span>
              <span className="text-xs font-black uppercase tracking-widest text-afc-gold-light">
                {currentQ.category || currentQ.section}
              </span>
            </div>

            {/* Main Stage Question Text */}
            <h2 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-white leading-relaxed text-shadow">
              {currentQ.prompt}
            </h2>
          </div>

          {/* Luxury Circular SVG Countdown Timer */}
          <div className="relative shrink-0 w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="44"
                className="stroke-gray-800/80"
                strokeWidth="7"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                stroke={timerColor}
                strokeWidth="7"
                fill="transparent"
                strokeDasharray="283"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500 ease-linear"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span 
                className="font-serif font-black text-2xl sm:text-3xl leading-none"
                style={{ color: timerColor }}
              >
                {timer.timeLeft}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-gray-400 font-extrabold mt-0.5">
                SEC
              </span>
            </div>
          </div>
        </div>

        {/* Question Type Specific Stage View */}
        
        {/* 1. OBJECTIVE: 4 Broadcast Lozenges (A, B, C, D) */}
        {currentQ.options && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 mt-4 z-10">
            {Object.entries(currentQ.options).map(([letter, text]) => {
              const isEliminated = eliminatedOptions.includes(letter);
              const isCorrect = letter === currentQ.answer;
              const isAnsweredCorrect = stageState === 'ANSWERED_CORRECT' && isCorrect;
              const isAnsweredWrong = stageState === 'ANSWERED_WRONG' && isCorrect;

              let lozengeClass = 'option-lozenge text-gray-100';
              if (isEliminated) {
                lozengeClass += ' eliminated';
              } else if (isAnsweredCorrect || isAnsweredWrong) {
                lozengeClass += ' correct';
              }

              return (
                <div
                  key={letter}
                  className={`p-4 sm:p-5 rounded-2xl flex items-center justify-between text-xs sm:text-sm font-bold tracking-wide shadow-lg ${lozengeClass}`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-afc-gold to-afc-gold-dark text-afc-navy font-serif font-black text-sm sm:text-base flex items-center justify-center shrink-0 shadow-gold-glow">
                      {letter}
                    </div>
                    <span className="line-clamp-2 text-white">{text}</span>
                  </div>

                  {isAnsweredCorrect && (
                    <CheckCircle2 className="w-6 h-6 text-white shrink-0 ml-2 animate-bounce" />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* 2. GERMAN QUESTION: Direct Recall Stage Banner */}
        {currentQ.type === 'german' && (
          <div className="mt-4 p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-afc-navy to-amber-950/40 border border-afc-gold/40 text-center space-y-2 z-10">
            <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-afc-gold text-afc-navy inline-block shadow-gold-glow">
              ⚡ GERMAN DIRECT RECALL CHALLENGE
            </span>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto font-medium">
              Contestant must state the exact biblical answer immediately into the microphone without options!
            </p>
            {stageState === 'ANSWERED_CORRECT' && (
              <div className="mt-3 p-4 rounded-xl bg-emerald-950/80 border border-emerald-400 text-emerald-200 text-sm font-serif font-bold animate-fade-in">
                ★ Correct Answer: <span className="text-white font-black">{currentQ.answer}</span> ({currentQ.scriptureRef})
              </div>
            )}
          </div>
        )}

        {/* 3. THEORY / SCRIPTURE RECITATION */}
        {currentQ.type === 'theory' && (
          <div className="mt-4 p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-afc-navy to-purple-950/40 border border-purple-400/40 text-center space-y-2 z-10">
            <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-purple-500 text-white inline-block shadow-md">
              📖 SCRIPTURE RECITATION & EXEGESIS
            </span>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto font-medium">
              Recite or explain according to the holy scriptures. Graded by the presiding ministerial bench!
            </p>
            {stageState === 'ANSWERED_CORRECT' && (
              <div className="mt-3 p-4 rounded-xl bg-emerald-950/80 border border-emerald-400 text-emerald-200 text-sm font-serif font-bold animate-fade-in">
                ★ Key Reference: <span className="text-white font-black">{currentQ.scriptureRef}</span>
              </div>
            )}
          </div>
        )}

        {/* Answer Revealed Footer info */}
        {(stageState === 'ANSWERED_CORRECT' || stageState === 'ANSWERED_WRONG') && currentQ.explanation && (
          <div className="mt-4 p-3.5 rounded-xl bg-afc-navy-surface/90 border border-afc-gold/30 text-xs text-gray-200 flex items-start gap-2 z-10 animate-fade-in">
            <Sparkles className="w-4 h-4 text-afc-gold shrink-0 mt-0.5" />
            <div>
              <strong className="text-afc-gold-light">Scripture Anchor ({currentQ.scriptureRef}):</strong> {currentQ.explanation}
            </div>
          </div>
        )}

      </div>

      {/* Stage Lifelines Floating Console */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-afc-navy-surface/80 border border-afc-gold/30 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-300">
          <Sparkles className="w-4 h-4 text-afc-gold" />
          <span>LIFELINES AVAILABLE:</span>
        </div>

        <LifelinesBar
          lifelinesUsed={activeContestant?.lifelinesUsed || {}}
          onUseLifeline={onUseLifeline}
          isObjective={!!currentQ.options}
          disabled={stageState !== 'REVEALED' && stageState !== 'BONUS_ACTIVE'}
        />
      </div>

      {/* ACTIVE LIFELINE MODAL OVERLAYS */}
      
      {/* 1. Ask Youth Congregation Lifeline Overlay */}
      {activeLifelineModal === 'askAudience' && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-blue-950 via-afc-navy to-blue-950 border-2 border-blue-400 shadow-2xl space-y-4 animate-fade-in">
          <div className="flex items-center justify-between border-b border-blue-400/30 pb-3">
            <div className="flex items-center gap-2 text-blue-300 font-serif font-black text-base">
              <Users className="w-5 h-5" />
              <span>Ekiti Area Youth Congregation Polling Consensus</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500 text-white animate-pulse">
              LIVE VOTING SIMULATION
            </span>
          </div>

          <div className="grid grid-cols-4 gap-3 text-center">
            {['A', 'B', 'C', 'D'].map((letter) => {
              const isAns = letter === currentQ.answer;
              const percent = isAns ? 68 : Math.floor((32 / 3));
              return (
                <div key={letter} className="space-y-1.5">
                  <div className="h-28 bg-black/40 rounded-xl p-1 flex items-end justify-center">
                    <div 
                      className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-lg transition-all duration-1000 flex items-center justify-center text-xs font-black text-afc-navy"
                      style={{ height: `${percent}%` }}
                    >
                      {percent}%
                    </div>
                  </div>
                  <span className="font-serif font-bold text-sm text-white">Option {letter}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Phone an Elder / Pastor Lifeline Overlay */}
      {activeLifelineModal === 'phonePastor' && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-purple-950 via-afc-navy to-purple-950 border-2 border-purple-400 shadow-2xl space-y-3 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-lg">
              <PhoneCall className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-purple-300">
                LIFELINE IN PROGRESS
              </span>
              <h4 className="text-base font-serif font-bold text-white">
                Phone an Apostolic Faith Minister / Youth Pastor
              </h4>
            </div>
          </div>
          <p className="text-xs text-gray-200 bg-black/30 p-3 rounded-xl border border-purple-400/30 italic">
            "Seek guidance from the presiding elder. 30 seconds of spiritual counsel and scripture alignment allowed!"
          </p>
        </div>
      )}

      {/* 3. Consult Scriptures Lifeline Overlay */}
      {activeLifelineModal === 'consultScriptures' && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950 via-afc-navy to-emerald-950 border-2 border-emerald-400 shadow-2xl space-y-3 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-emerald-300">
                HOLY SCRIPTURE SEARCH (30 SECONDS)
              </span>
              <h4 className="text-base font-serif font-bold text-white">
                Consult the Authorized King James Bible
              </h4>
            </div>
          </div>
          <p className="text-xs text-gray-200 bg-black/30 p-3 rounded-xl border border-emerald-400/30 italic">
            "Contestant may open the Holy Bible to search for chapter, verse, and holy context."
          </p>
        </div>
      )}

    </div>
  );
}
