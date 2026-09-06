import React, { useState } from 'react';
import { 
  Trophy, 
  Award, 
  Medal, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Printer, 
  Crown, 
  CheckCircle2, 
  MapPin, 
  Star 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import classicalAudio from '../services/audioService';

export default function GrandPodium({ contestants, onBackToStage, onResetTournament }) {
  // Reveal step: 0 = Intro, 1 = 3rd place, 2 = 2nd place, 3 = 1st place champion!
  const [revealStep, setRevealStep] = useState(0);

  // Sort contestants descending by score
  const sorted = [...contestants].sort((a, b) => b.score - a.score);
  const firstPlace = sorted[0] || { name: 'Champion', zone: 'Ekiti Area', score: 0 };
  const secondPlace = sorted[1] || { name: '1st Runner-up', zone: 'Ekiti Area', score: 0 };
  const thirdPlace = sorted[2] || { name: '2nd Runner-up', zone: 'Ekiti Area', score: 0 };

  const handleNextReveal = () => {
    const next = revealStep + 1;
    setRevealStep(next);

    if (next === 1) {
      // 3rd Place Purcell Trumpet March
      classicalAudio.playPodiumThird();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7, x: 0.2 },
          colors: ['#CD7F32', '#D4AF37', '#FFFFFF']
        });
      } catch (e) {}
    } else if (next === 2) {
      // 2nd Place Imperial Strings Fanfare
      classicalAudio.playPodiumSecond();
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.7, x: 0.8 },
          colors: ['#E2E8F0', '#94A3B8', '#D4AF37']
        });
      } catch (e) {}
    } else if (next === 3) {
      // 1st Place Grand Handel Hallelujah / Ode to Joy Coronation
      classicalAudio.playPodiumFirst();
      try {
        // Grand dual cannon confetti burst
        const duration = 4.5 * 1000;
        const animationEnd = Date.now() + duration;
        const frame = () => {
          confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#D4AF37', '#FFF3A8', '#10B981', '#FFDF73']
          });
          confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#D4AF37', '#FFF3A8', '#800020', '#FFDF73']
          });
          if (Date.now() < animationEnd) {
            requestAnimationFrame(frame);
          }
        };
        frame();
      } catch (e) {}
    }
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fade-in text-center">
      
      {/* Grand Title Banner */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-afc-gold/20 border border-afc-gold text-afc-gold text-xs font-black uppercase tracking-widest">
          <Sparkles className="w-4 h-4" />
          Apostolic Faith Church Ekiti Area • Grand Awards Ceremony
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-afc-gold-light via-afc-gold to-afc-gold-dark">
          THE BIBLE GIANT PODIUM
        </h1>
        
        <p className="text-xs sm:text-sm text-gray-300 font-medium max-w-xl mx-auto">
          Honouring the champions of scripture and church heritage at 74 Ajilosun Street, Ado-Ekiti.
        </p>
      </div>

      {/* Podium Reveal Step Controller */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {revealStep < 3 ? (
          <button
            onClick={handleNextReveal}
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-afc-gold via-afc-gold to-afc-gold-dark text-afc-navy font-serif font-black text-sm sm:text-base shadow-gold-glow-lg hover:scale-105 transition-all"
          >
            <span>
              {revealStep === 0 && 'Begin Ceremony: Reveal 3rd Place Bronze Giant'}
              {revealStep === 1 && 'Next: Reveal 2nd Place Silver Giant'}
              {revealStep === 2 && '👑 Crown The 1st Place Bible Giant Champion!'}
            </span>
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrintCertificate}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-afc-navy-surface border border-afc-gold text-afc-gold font-bold text-xs hover:bg-afc-gold/20"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Certificate</span>
            </button>
            
            <button
              onClick={onBackToStage}
              className="px-6 py-3 rounded-2xl bg-afc-navy-surface border border-gray-700 text-gray-300 font-bold text-xs hover:text-white"
            >
              Return to Stage
            </button>
          </div>
        )}
      </div>

      {/* 3-Tier Olympic-Style Grand Podium Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-8 max-w-4xl mx-auto">
        
        {/* =========================================================================
            2ND PLACE (SILVER BIBLE GIANT) - Revealed at Step 2 or higher
           ========================================================================= */}
        <div className="order-2 md:order-1 transition-all duration-700">
          {revealStep >= 2 ? (
            <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-afc-navy border-2 border-slate-300 shadow-xl space-y-4 animate-fade-in relative">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-300 text-afc-navy font-serif font-black text-2xl flex items-center justify-center border-2 border-white shadow-lg">
                2
              </div>
              <div>
                <span className="px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-slate-800 text-slate-200 border border-slate-400">
                  Silver Giant (2nd Place)
                </span>
                <h3 className="text-lg font-serif font-bold text-white mt-2">
                  {secondPlace.name}
                </h3>
                <p className="text-xs text-slate-300 flex items-center justify-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {secondPlace.zone}
                </p>
                <div className="mt-3 font-serif font-black text-2xl text-slate-100">
                  {secondPlace.score} <span className="text-xs font-sans font-normal text-slate-400">pts</span>
                </div>
              </div>

              {/* Physical Podium Pedestal (Medium Height) */}
              <div className="h-28 rounded-2xl bg-gradient-to-t from-slate-950 to-slate-800 border-t-2 border-slate-300 flex items-center justify-center font-serif font-black text-3xl text-slate-400">
                2ND
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-3xl border-2 border-dashed border-slate-700 bg-black/30 text-gray-500 font-bold text-xs">
              2nd Place Concealed
            </div>
          )}
        </div>

        {/* =========================================================================
            1ST PLACE (CHAMPION BIBLE GIANT) - Revealed at Step 3
           ========================================================================= */}
        <div className="order-1 md:order-2 transition-all duration-700">
          {revealStep >= 3 ? (
            <div className="p-8 rounded-3xl bg-gradient-to-b from-afc-navy-surface via-[#172554] to-afc-navy border-4 border-afc-gold shadow-gold-glow-lg space-y-4 animate-bounce-gentle relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <Crown className="w-12 h-12 text-afc-gold filter drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]" />
              </div>

              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-afc-gold-dark via-afc-gold to-afc-gold-light text-afc-navy font-serif font-black text-3xl flex items-center justify-center border-4 border-white shadow-gold-glow">
                1
              </div>

              <div>
                <span className="px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-afc-gold text-afc-navy shadow-gold-glow inline-block">
                  ★ EKITI AREA BIBLE GIANT CHAMPION ★
                </span>
                <h2 className="text-2xl font-serif font-black text-white mt-3">
                  {firstPlace.name}
                </h2>
                <p className="text-xs text-afc-gold flex items-center justify-center gap-1 mt-1 font-bold">
                  <MapPin className="w-3.5 h-3.5 text-afc-gold" />
                  {firstPlace.zone}
                </p>
                <div className="mt-4 font-serif font-black text-3xl text-afc-gold-light">
                  {firstPlace.score} <span className="text-sm font-sans font-normal text-gray-300">Total Points</span>
                </div>
              </div>

              {/* Physical Podium Pedestal (Tallest Height) */}
              <div className="h-36 rounded-2xl bg-gradient-to-t from-yellow-950/60 to-afc-gold/30 border-t-4 border-afc-gold flex flex-col items-center justify-center text-afc-gold">
                <Trophy className="w-8 h-8 mb-1 animate-pulse" />
                <span className="font-serif font-black text-3xl">1ST PLACE</span>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-3xl border-2 border-dashed border-afc-gold/40 bg-black/40 text-afc-gold font-serif font-bold text-sm">
              👑 Champion Throne Awaiting Climax
            </div>
          )}
        </div>

        {/* =========================================================================
            3RD PLACE (BRONZE BIBLE GIANT) - Revealed First (Step 1)
           ========================================================================= */}
        <div className="order-3 transition-all duration-700">
          {revealStep >= 1 ? (
            <div className="p-6 rounded-3xl bg-gradient-to-b from-amber-950/80 to-afc-navy border-2 border-amber-600 shadow-xl space-y-4 animate-fade-in relative">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-700 text-white font-serif font-black text-2xl flex items-center justify-center border-2 border-amber-400 shadow-lg">
                3
              </div>
              <div>
                <span className="px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-900 text-amber-200 border border-amber-500">
                  Bronze Giant (3rd Place)
                </span>
                <h3 className="text-lg font-serif font-bold text-white mt-2">
                  {thirdPlace.name}
                </h3>
                <p className="text-xs text-amber-300 flex items-center justify-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  {thirdPlace.zone}
                </p>
                <div className="mt-3 font-serif font-black text-2xl text-amber-200">
                  {thirdPlace.score} <span className="text-xs font-sans font-normal text-amber-400">pts</span>
                </div>
              </div>

              {/* Physical Podium Pedestal (Lowest Height) */}
              <div className="h-20 rounded-2xl bg-gradient-to-t from-amber-950 to-amber-900/60 border-t-2 border-amber-500 flex items-center justify-center font-serif font-black text-2xl text-amber-400">
                3RD
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-3xl border-2 border-dashed border-amber-900 bg-black/30 text-gray-500 font-bold text-xs">
              3rd Place Concealed
            </div>
          )}
        </div>

      </div>

      {/* Official Certificate of Honour (Visible after 1st place is crowned) */}
      {revealStep >= 3 && (
        <div className="mt-12 p-8 rounded-3xl bg-[#060B19] border-4 border-afc-gold shadow-gold-glow max-w-3xl mx-auto text-center space-y-4 text-white print:border-black print:text-black">
          <div className="flex items-center justify-center gap-3">
            <img src="/logo.svg" alt="AFC Emblem" className="w-16 h-16" />
            <div className="text-left">
              <h3 className="font-serif font-bold text-lg text-afc-gold">
                THE APOSTOLIC FAITH CHURCH
              </h3>
              <p className="text-[11px] text-gray-300">
                Ekiti Area Headquarters: 74 Ajilosun Street, Ado-Ekiti
              </p>
            </div>
          </div>

          <div className="py-2 border-y border-afc-gold/30">
            <h4 className="font-serif font-extrabold text-xl text-afc-gold-light tracking-widest">
              CERTIFICATE OF SCRIPTURAL EXCELLENCE
            </h4>
            <p className="text-xs text-gray-400 mt-1 italic">
              "Thy word is a lamp unto my feet, and a light unto my path." — Psalm 119:105
            </p>
          </div>

          <div className="py-4 space-y-2">
            <p className="text-xs text-gray-300">This is to certify that:</p>
            <h2 className="text-3xl font-serif font-black text-white underline decoration-afc-gold decoration-2 underline-offset-4">
              {firstPlace.name}
            </h2>
            <p className="text-sm font-semibold text-afc-gold">
              Representing {firstPlace.zone}
            </p>
            <p className="text-xs text-gray-300 max-w-md mx-auto pt-2">
              Has been declared the Grand Champion of the "Who Wants to Be a Bible Giant" competition with a total triumphant score of <strong>{firstPlace.score} points</strong>.
            </p>
          </div>

          <div className="pt-6 grid grid-cols-2 gap-8 text-xs text-gray-400">
            <div className="border-t border-gray-600 pt-2">
              <span>Area Youth Coordinator</span>
            </div>
            <div className="border-t border-gray-600 pt-2">
              <span>Ekiti Area Overseer / Minister</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
