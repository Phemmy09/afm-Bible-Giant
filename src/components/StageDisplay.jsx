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
  Volume2 
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
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#FFF3A8', '#10B981', '#ffffff']
        });
      } catch (e) {}
    }
  }, [stageState]);

  if (!currentQ) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-8">
        <img src="/logo.svg" alt="AFC Crest" className="w-28 h-28 mb-4 animate-bounce-gentle" />
        <h2 className="text-2xl font-serif font-black text-afc-gold">
          WHO WANTS TO BE A BIBLE GIANT
        </h2>
        <p className="text-gray-400 mt-2">Awaiting Quizmaster to initiate the tournament...</p>
      </div>
    );
  }

  // Timer calculation
  const totalTime = timer.initialTime || currentQ.timeLimit || 30;
  const timeFraction = Math.max(0, timer.timeLeft / totalTime);
  const strokeDashoffset = 283 - (283 * timeFraction);

  // Timer color
  const timerColor = timer.timeLeft <= 5 
    ? '#EF4444' 
    : timer.timeLeft <= 10 
    ? '#F59E0B' 
    : '#D4AF37';

  return (
    <div className="relative w-full max-w-6xl mx-auto px-2 sm:px-4 py-4 space-y-4">
      
      {/* Stage Top Bar: Section Badge & Active Contestant Spotlight */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-afc-navy-surface/90 border border-afc-gold/40 shadow-xl backdrop-blur-md">
        
        {/* Left: Section, Category & YDD Emblem */}
        <div className="flex items-center gap-3">
          <div className="flex items-center -space-x-2">
            <img src="/logo.svg" alt="AFC Crest" className="w-11 h-11 rounded-full border border-afc-gold shadow-gold-glow relative z-10" />
            <img src="/afc/ydd.webp" alt="YDD Emblem" className="w-8 h-8 rounded-full border border-cyan-400 bg-white shadow-sm relative z-20" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-afc-gold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {currentQ.section}
              </span>
              <span className="hidden sm:inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
                AFMWECA YDD
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                Question {currentQuestionIndex + 1} of {questions.length}
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-afc-gold text-afc-navy">
                {currentQ.type}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Value Pill */}
        <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-xl bg-afc-navy border border-afc-gold/30">
          <span className="text-xs font-bold text-gray-300">QUESTION VALUE:</span>
          <span className="font-serif font-black text-base text-afc-gold-light">
            {currentQ.points} PTS
          </span>
          <span className="text-[10px] text-cyan-300 font-semibold">(Bonus: {currentQ.bonusPoints} pts)</span>
        </div>

        {/* Right: Active Contestant on Stage */}
        <div className="flex items-center gap-3 bg-afc-navy px-3.5 py-1.5 rounded-xl border border-afc-gold/40 shadow-gold-glow">
          <div className="w-8 h-8 rounded-full bg-afc-gold text-afc-navy font-serif font-black flex items-center justify-center text-sm shadow">
            {activeContestant?.seatNumber}
          </div>
          <div className="text-right">
            <span className="text-[9px] uppercase font-bold text-afc-gold block tracking-wider">
              CONTESTANT ON STAGE:
            </span>
            <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
              {activeContestant?.name}
            </h4>
            <span className="text-[10px] text-gray-300 flex items-center justify-end gap-1">
              <MapPin className="w-2.5 h-2.5 text-afc-gold" />
              {activeContestant?.zone}
            </span>
          </div>
        </div>

      </div>

      {/* Bonus Question Alert Banner */}
      {bonusContestantId && (
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-950 via-blue-950 to-cyan-950 border-2 border-cyan-400 shadow-blue-glow flex items-center justify-between animate-pulse-slow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-400 text-afc-navy font-serif font-black flex items-center justify-center text-lg">
              {bonusContestant?.seatNumber}
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-cyan-300 block">
                ⚡ BONUS QUESTION PASSED IN NUMERICAL ORDER!
              </span>
              <h4 className="text-sm font-bold text-white">
                Opportunity awarded to: <strong className="text-cyan-200">{bonusContestant?.name}</strong> ({bonusContestant?.zone})
              </h4>
            </div>
          </div>
          <div className="text-right font-serif font-black text-lg text-cyan-300">
            +{currentQ.bonusPoints} <span className="text-xs font-sans font-normal text-cyan-100">Bonus Pts</span>
          </div>
        </div>
      )}

      {/* Centerpiece Stage Card: Question & Circular Countdown */}
      <div className="relative gold-card rounded-3xl p-6 sm:p-8 border-2 border-afc-gold/50 shadow-2xl overflow-hidden min-h-[220px] flex flex-col justify-between">
        
        {/* Background Church Watermark */}
        <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
          <img src="/logo.svg" alt="AFC Watermark" className="w-96 h-96" />
        </div>

        {/* Question Header & Countdown Ring */}
        <div className="flex items-start justify-between gap-4 mb-4 z-10">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-afc-gold animate-ping"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-afc-gold-light">
                {currentQ.category || currentQ.section}
              </span>
            </div>

            {/* Main Stage Question Text */}
            <h2 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-white leading-relaxed text-shadow">
              {currentQ.prompt}
            </h2>
          </div>

          {/* Luxury Circular SVG Countdown Timer */}
          <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                className="stroke-gray-800"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke={timerColor}
                strokeWidth="6"
                fill="transparent"
                strokeDasharray="283"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500 ease-linear"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span 
                className="font-serif font-black text-xl sm:text-2xl leading-none"
                style={{ color: timerColor }}
              >
                {timer.timeLeft}
              </span>
              <span className="text-[8px] uppercase tracking-wider text-gray-400 font-bold">
                SEC
              </span>
            </div>
          </div>
        </div>

        {/* Question Type Specific Stage View */}
        
        {/* 1. OBJECTIVE: 4 Broadcast Lozenges (A, B, C, D) */}
        {currentQ.options && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-4 z-10">
            {Object.entries(currentQ.options).map(([letter, text]) => {
              const isEliminated = eliminatedOptions.includes(letter);
              const isCorrect = letter === currentQ.answer;
              const isAnsweredCorrect = stageState === 'ANSWERED_CORRECT' && isCorrect;
              const isAnsweredWrong = stageState === 'ANSWERED_WRONG' && isCorrect; // Highlight correct answer on wrong

              let lozengeClass = 'option-lozenge text-gray-100';
              if (isEliminated) {
                lozengeClass += ' eliminated';
              } else if (isAnsweredCorrect) {
                lozengeClass += ' correct';
              } else if (stageState === 'ANSWERED_WRONG' && isCorrect) {
                lozengeClass += ' correct';
              }

              return (
                <div
                  key={letter}
                  className={`p-3.5 sm:p-4 rounded-xl flex items-center justify-between text-xs sm:text-sm font-bold tracking-wide shadow-md ${lozengeClass}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-afc-gold text-afc-navy font-serif font-black text-sm sm:text-base flex items-center justify-center shrink-0 shadow-gold-glow">
                      {letter}
                    </div>
                    <span className="line-clamp-2">{text}</span>
                  </div>

                  {isAnsweredCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-white shrink-0 ml-2 animate-bounce" />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* 2. GERMAN QUESTION: Direct Recall Stage Banner */}
        {currentQ.type === 'german' && (
          <div className="mt-4 p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-afc-navy to-amber-950/40 border border-afc-gold/40 text-center space-y-2 z-10">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-afc-gold text-afc-navy inline-block shadow-gold-glow">
              ⚡ GERMAN DIRECT RECALL CHALLENGE
            </span>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto">
              Contestant must state the direct biblical answer immediately into the microphone without options!
            </p>
            {stageState === 'ANSWERED_CORRECT' && (
              <div className="mt-3 p-3 rounded-xl bg-emerald-950/70 border border-emerald-400 text-emerald-200 text-sm font-serif font-bold animate-fade-in">
                ★ Correct Answer: <span className="text-white">{currentQ.answer}</span> ({currentQ.scriptureRef})
              </div>
            )}
          </div>
        )}

        {/* 3. THEORY QUESTION: Judges Evaluation & Scripture Parchment */}
        {currentQ.type === 'theory' && (
          <div className="mt-4 p-5 rounded-2xl bg-afc-navy-surface border border-afc-gold/40 text-center space-y-2 z-10">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-afc-crimson text-white inline-block border border-afc-crimson-light">
              📖 SCRIPTURE RECITAL & THEORY EVALUATION
            </span>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto">
              Recite or articulate the biblical doctrine. Area Judges evaluate verbatim accuracy and doctrinal clarity.
            </p>
            {stageState === 'ANSWERED_CORRECT' && (
              <div className="mt-3 p-3 rounded-xl bg-emerald-950/70 border border-emerald-400 text-emerald-200 text-xs sm:text-sm font-serif text-left space-y-1 animate-fade-in">
                <span className="font-bold text-emerald-400 block">★ Approved Biblical Answer:</span>
                <p className="text-white">{currentQ.answer}</p>
                <span className="text-xs text-afc-gold block">Ref: {currentQ.scriptureRef}</span>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Lifelines Display Bar for Contestant on Stage */}
      <div className="p-3 rounded-2xl bg-afc-navy-surface/80 border border-afc-gold/30 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs font-bold text-afc-gold-light uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-afc-gold" />
          <span>Biblical Lifelines Status:</span>
        </div>

        <LifelinesBar
          lifelinesUsed={activeContestant?.lifelinesUsed || {}}
          onUseLifeline={onUseLifeline}
          isObjective={currentQ.type === 'objective'}
          disabled={false}
          showLabels={true}
        />
      </div>

      {/* Stage Bottom Live Standings Ticker */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2">
        {contestants.map((c) => {
          const isActive = c.id === activeContestantId;
          const isBonus = c.id === bonusContestantId;

          return (
            <div
              key={c.id}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                isBonus
                  ? 'bg-cyan-950/80 border-cyan-400 shadow-blue-glow scale-105'
                  : isActive
                  ? 'bg-afc-navy-surface border-afc-gold shadow-gold-glow scale-105'
                  : 'bg-black/40 border-afc-gold/20'
              }`}
            >
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Seat {c.seatNumber}
              </div>
              <div className="text-xs font-bold text-white truncate">{c.name}</div>
              <div className="text-[10px] text-gray-400 truncate">{c.zone}</div>
              <div className="font-serif font-black text-sm text-afc-gold-light mt-1">
                {c.score} <span className="text-[9px] font-sans font-normal text-gray-400">pts</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Modal Overlay for Lifelines (Audience Poll / Pastor Call / Scripture Search) */}
      {activeLifelineModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg bg-afc-navy border-2 border-afc-gold rounded-3xl p-6 sm:p-8 text-center shadow-gold-glow-lg space-y-4">
            
            {activeLifelineModal === 'audience' && (
              <>
                <div className="w-16 h-16 rounded-2xl bg-blue-950 border border-blue-400 text-blue-300 mx-auto flex items-center justify-center shadow-blue-glow">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-white">
                  Ekiti Area Youth Congregation Poll
                </h3>
                <p className="text-xs text-gray-300">
                  The church hall audience has submitted their votes for Question {currentQuestionIndex + 1}:
                </p>

                {/* Simulated Realtime Congregation Distribution */}
                <div className="space-y-2.5 pt-2 text-left text-xs font-bold">
                  {currentQ.options && Object.entries(currentQ.options).map(([letter, text]) => {
                    const isCorrect = letter === currentQ.answer;
                    const percent = isCorrect ? 68 : (letter === 'A' ? 14 : (letter === 'C' ? 11 : 7));
                    return (
                      <div key={letter}>
                        <div className="flex justify-between text-gray-300 mb-1">
                          <span>Option {letter}: {text}</span>
                          <span className="text-afc-gold">{percent}%</span>
                        </div>
                        <div className="w-full bg-gray-800 h-2.5 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-afc-gold h-full rounded-full transition-all duration-1000"
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {activeLifelineModal === 'scripture' && (
              <>
                <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-400 text-emerald-300 mx-auto flex items-center justify-center shadow-lg">
                  <BookOpen className="w-8 h-8 animate-pulse" />
                </div>
                <h3 className="text-xl font-serif font-bold text-white">
                  Consult the Holy Scriptures (30s Search)
                </h3>
                <p className="text-xs text-gray-300">
                  Contestant has 30 seconds to open their King James Bible and search for the scripture passage!
                </p>
                <div className="p-4 rounded-xl bg-afc-navy-surface border border-afc-gold/30 text-afc-gold-light font-serif font-bold text-base">
                  Scripture Hint: {currentQ.scriptureRef}
                </div>
              </>
            )}

            {activeLifelineModal === 'pastor' && (
              <>
                <div className="w-16 h-16 rounded-2xl bg-purple-950 border border-purple-400 text-purple-300 mx-auto flex items-center justify-center shadow-lg">
                  <PhoneCall className="w-8 h-8 animate-bounce" />
                </div>
                <h3 className="text-xl font-serif font-bold text-white">
                  Phone an Apostolic Faith Minister
                </h3>
                <p className="text-xs text-gray-300">
                  Live phone call to an Area Pastor or Bible teacher in Ekiti Area / Faith City Anthony.
                </p>
                <div className="p-3.5 rounded-xl bg-afc-navy-surface border border-purple-400/40 text-xs text-purple-200">
                  "Let your conversation be with grace, seasoned with salt." — Colossians 4:6
                </div>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
