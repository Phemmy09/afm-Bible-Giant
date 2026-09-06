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
  Star,
  Download,
  Share2
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
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const frame = () => {
          confetti({
            particleCount: 6,
            angle: 60,
            spread: 60,
            origin: { x: 0 },
            colors: ['#D4AF37', '#FFF9D2', '#10B981', '#FFDF73']
          });
          confetti({
            particleCount: 6,
            angle: 120,
            spread: 60,
            origin: { x: 1 },
            colors: ['#D4AF37', '#FFF9D2', '#BE123C', '#06B6D4']
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
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-10 space-y-8 animate-fade-in text-center">
      
      {/* Grand Title Banner */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-afc-gold/20 border border-afc-gold/50 text-afc-gold text-xs font-black uppercase tracking-widest shadow-gold-glow">
          <Sparkles className="w-4 h-4" />
          Apostolic Faith Church • AFMWECA Youth Development Directorate (YDD)
        </div>
        
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black tracking-wide gold-text-shimmer">
          THE BIBLE GIANT PODIUM
        </h1>
        
        <p className="text-xs sm:text-sm text-gray-300 font-medium max-w-xl mx-auto">
          Honouring the champions of scripture mastery and church heritage at 74 Ajilosun Street, Ado-Ekiti.
        </p>
      </div>

      {/* Podium Reveal Step Controller */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {revealStep < 3 ? (
          <button
            onClick={handleNextReveal}
            className="flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-afc-gold-bright via-afc-gold to-afc-gold-dark text-afc-navy font-serif font-black text-sm sm:text-base shadow-gold-glow-lg hover:scale-105 transition-all cursor-pointer"
          >
            <span>
              {revealStep === 0 && 'Begin Ceremony: Reveal 3rd Place Bronze Giant'}
              {revealStep === 1 && 'Next: Reveal 2nd Place Silver Giant'}
              {revealStep === 2 && '👑 Crown The 1st Place Bible Giant Champion!'}
            </span>
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handlePrintCertificate}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-serif font-bold text-sm shadow-xl hover:scale-105 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Print Official Certificate
            </button>
            <button
              onClick={onBackToStage}
              className="px-6 py-3 rounded-2xl bg-afc-navy-surface border border-afc-gold/40 text-afc-gold-light font-bold text-sm hover:bg-afc-navy hover:border-afc-gold transition-all"
            >
              Return to Stage
            </button>
          </div>
        )}
      </div>

      {/* 3D Visual Podium Arrangement: 2nd (Silver, Left) | 1st (Gold, Center) | 3rd (Bronze, Right) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-4 pb-2">
        
        {/* =========================================================================
            2ND PLACE (SILVER BIBLE GIANT) - Revealed Second (Step 2)
           ========================================================================= */}
        <div className="order-2 md:order-1 transition-all duration-700">
          {revealStep >= 2 ? (
            <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-800 to-afc-navy border-2 border-slate-400 shadow-2xl space-y-4 animate-fade-in relative">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-200 text-slate-900 font-serif font-black text-2xl flex items-center justify-center border-2 border-white shadow-lg">
                2
              </div>
              <div>
                <span className="px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-slate-700 text-slate-200 border border-slate-500">
                  Silver Giant (2nd Place)
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-2">
                  {secondPlace.name}
                </h3>
                <p className="text-xs text-slate-300 flex items-center justify-center gap-1 mt-0.5 font-semibold">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  {secondPlace.zone}
                </p>
                <div className="mt-3 font-serif font-black text-2xl text-slate-100">
                  {secondPlace.score} <span className="text-xs font-sans font-normal text-slate-400">pts</span>
                </div>
              </div>

              {/* Physical Podium Pedestal (Medium Height) */}
              <div className="h-28 rounded-2xl bg-gradient-to-t from-slate-900 to-slate-800/80 border-t-4 border-slate-300 flex items-center justify-center font-serif font-black text-2xl text-slate-300 shadow-inner">
                2ND
              </div>
            </div>
          ) : (
            <div className="p-10 rounded-3xl border-2 border-dashed border-slate-700 bg-black/30 text-gray-500 font-bold text-xs">
              2nd Place Concealed
            </div>
          )}
        </div>

        {/* =========================================================================
            1ST PLACE (GOLD GRAND CHAMPION) - Revealed Third (Step 3)
           ========================================================================= */}
        <div className="order-1 md:order-2 transition-all duration-700 -mt-6">
          {revealStep >= 3 ? (
            <div className="p-7 rounded-3xl bg-gradient-to-b from-yellow-950/90 via-afc-navy to-yellow-950/70 border-4 border-afc-gold shadow-gold-glow-lg space-y-4 animate-fade-in relative overflow-hidden">
              <div className="absolute top-2 right-2">
                <Crown className="w-8 h-8 text-afc-gold animate-bounce" />
              </div>

              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-afc-gold-dark via-afc-gold-bright to-white text-afc-navy font-serif font-black text-3xl flex items-center justify-center border-4 border-white shadow-gold-glow">
                1
              </div>

              <div>
                <span className="px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-gradient-to-r from-afc-gold to-afc-gold-dark text-afc-navy shadow-md">
                  👑 GRAND BIBLE GIANT CHAMPION
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-white mt-3 leading-tight">
                  {firstPlace.name}
                </h2>
                <p className="text-xs text-afc-gold flex items-center justify-center gap-1 mt-1 font-bold">
                  <MapPin className="w-3.5 h-3.5 text-afc-gold" />
                  {firstPlace.zone}
                </p>
                <div className="mt-4 font-serif font-black text-3xl sm:text-4xl text-afc-gold-light">
                  {firstPlace.score} <span className="text-sm font-sans font-normal text-gray-300">Total Points</span>
                </div>
              </div>

              {/* Physical Podium Pedestal (Tallest Height) */}
              <div className="h-40 rounded-2xl bg-gradient-to-t from-yellow-950/80 to-afc-gold/40 border-t-4 border-afc-gold flex flex-col items-center justify-center text-afc-gold shadow-inner">
                <Trophy className="w-10 h-10 mb-1 animate-pulse" />
                <span className="font-serif font-black text-3xl">1ST PLACE</span>
              </div>
            </div>
          ) : (
            <div className="p-14 rounded-3xl border-2 border-dashed border-afc-gold/40 bg-black/40 text-afc-gold font-serif font-bold text-sm">
              👑 Champion Throne Awaiting Coronation
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
                <h3 className="text-xl font-serif font-bold text-white mt-2">
                  {thirdPlace.name}
                </h3>
                <p className="text-xs text-amber-300 flex items-center justify-center gap-1 mt-0.5 font-semibold">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  {thirdPlace.zone}
                </p>
                <div className="mt-3 font-serif font-black text-2xl text-amber-200">
                  {thirdPlace.score} <span className="text-xs font-sans font-normal text-amber-400">pts</span>
                </div>
              </div>

              {/* Physical Podium Pedestal (Lowest Height) */}
              <div className="h-20 rounded-2xl bg-gradient-to-t from-amber-950 to-amber-900/60 border-t-2 border-amber-500 flex items-center justify-center font-serif font-black text-2xl text-amber-400 shadow-inner">
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
        <div className="mt-12 p-8 sm:p-12 rounded-3xl bg-[#060B19] border-4 border-afc-gold shadow-gold-glow max-w-3xl mx-auto text-center space-y-5 text-white print:border-black print:text-black relative">
          
          {/* Dual Emblems Header */}
          <div className="flex items-center justify-between border-b border-afc-gold/30 pb-4">
            <img src="/logo.svg" alt="AFC Crest" className="w-16 h-16 rounded-full border border-afc-gold" />
            <div className="text-center flex-1 px-3">
              <h3 className="font-serif font-black text-xl text-afc-gold tracking-wide">
                THE APOSTOLIC FAITH CHURCH
              </h3>
              <p className="text-xs text-afc-gold-light font-bold">
                Youth Development Directorate (AFMWECA YDD)
              </p>
              <p className="text-[10px] text-gray-300">
                Ekiti Area Headquarters: 74 Ajilosun Street, Ado-Ekiti
              </p>
            </div>
            <img src="/afc/ydd_logo_hq.png" alt="YDD Logo" className="w-16 h-16 rounded-full border border-afc-gold bg-white p-0.5" />
          </div>

          <div className="py-2">
            <h4 className="font-serif font-black text-2xl text-afc-gold-light tracking-widest">
              CERTIFICATE OF SCRIPTURAL MASTERY
            </h4>
            <p className="text-xs text-gray-300 mt-1 italic font-serif">
              "Thy word is a lamp unto my feet, and a light unto my path." — Psalm 119:105
            </p>
          </div>

          <div className="py-4 space-y-2">
            <p className="text-xs text-gray-300 font-medium">This is to solemnly certify that:</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-white underline decoration-afc-gold decoration-2 underline-offset-8">
              {firstPlace.name}
            </h2>
            <p className="text-sm font-bold text-afc-gold pt-2">
              Representing {firstPlace.zone}
            </p>
            <p className="text-xs sm:text-sm text-gray-200 max-w-lg mx-auto pt-3 leading-relaxed">
              Has emerged as the victorious Grand Champion of the <strong>"Who Wants to Be a Bible Giant"</strong> competition with an outstanding tournament score of <strong>{firstPlace.score} points</strong>.
            </p>
          </div>

          <div className="pt-8 grid grid-cols-2 gap-8 text-xs text-gray-300 border-t border-afc-gold/30">
            <div className="space-y-1">
              <div className="font-serif font-bold text-white text-sm">Coordinator, Ekiti Area YDD</div>
              <span className="text-[10px] text-gray-400">Youth Directorate</span>
            </div>
            <div className="space-y-1">
              <div className="font-serif font-bold text-white text-sm">District / Area Overseer</div>
              <span className="text-[10px] text-gray-400">The Apostolic Faith Church</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
