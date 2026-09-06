import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Maximize, 
  Tv, 
  ShieldCheck, 
  Trophy, 
  BookOpen, 
  Wifi, 
  HelpCircle,
  Music
} from 'lucide-react';
import classicalAudio from '../services/audioService';

export default function Header({ 
  activeView, 
  setActiveView, 
  roomCode, 
  connectionStatus = 'connected',
  onOpenSoundboard,
  onOpenHelp,
  onOpenHeritage
}) {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    classicalAudio.setMuted(next);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#060B19]/90 backdrop-blur-md border-b border-afc-gold/30 px-4 py-2.5 shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Brand Identity & Logos */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer" onClick={() => setActiveView('stage')}>
            <img 
              src="/logo.svg" 
              alt="AFC Bible Giant Logo" 
              className="w-12 h-12 rounded-full border-2 border-afc-gold shadow-gold-glow group-hover:scale-105 transition-transform" 
            />
            <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-afc-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-afc-gold"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-serif font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-afc-gold-light via-afc-gold to-afc-gold-dark">
                WHO WANTS TO BE A BIBLE GIANT
              </h1>
              <span className="hidden md:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-afc-crimson/80 text-white rounded border border-afc-crimson-light">
                Ekiti Area
              </span>
            </div>
            <p className="text-[11px] text-gray-300 tracking-wider font-medium flex items-center gap-2">
              <span className="text-afc-gold">THE APOSTOLIC FAITH CHURCH</span>
              <span className="text-gray-500">•</span>
              <span className="hidden lg:inline italic text-afc-gold-light/90">"Jesus, The Light of the World"</span>
              <span className="hidden xl:inline text-gray-500">•</span>
              <span className="hidden xl:inline text-gray-400">74 Ajilosun St, Ado-Ekiti</span>
            </p>
          </div>
        </div>

        {/* Center: View Switchers (Quizmaster Controller vs Stage Display vs Podium) */}
        <div className="flex items-center bg-afc-navy-surface/80 p-1 rounded-xl border border-afc-gold/25 shadow-inner">
          <button
            onClick={() => setActiveView('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeView === 'admin'
                ? 'bg-gradient-to-r from-afc-gold via-afc-gold to-afc-gold-dark text-afc-navy shadow-md'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Quizmaster</span> Admin
          </button>

          <button
            onClick={() => setActiveView('stage')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeView === 'stage'
                ? 'bg-gradient-to-r from-afc-gold via-afc-gold to-afc-gold-dark text-afc-navy shadow-md'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Stage</span> Screen
          </button>

          <button
            onClick={() => setActiveView('podium')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeView === 'podium'
                ? 'bg-gradient-to-r from-afc-gold via-afc-gold to-afc-gold-dark text-afc-navy shadow-md'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Grand</span> Podium
          </button>
        </div>

        {/* Right: Heritage Pavilion, Room Sync, Audio, Fullscreen */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* YDD Heritage Pavilion Button */}
          <button
            onClick={onOpenHeritage}
            title="Apostolic Faith Heritage & YDD Pavilion"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-afc-navy-surface via-afc-navy-mid to-afc-navy-surface border border-afc-gold/40 text-afc-gold-light hover:border-afc-gold hover:shadow-gold-glow text-xs font-bold transition-all"
          >
            <img src="/afc/ydd.webp" alt="YDD" className="w-4 h-4 rounded-full" />
            <span className="hidden md:inline">YDD Heritage</span>
          </button>

          {/* Room PIN Badge */}
          <div className="hidden sm:flex items-center gap-1.5 bg-afc-navy-surface px-2.5 py-1 rounded-lg border border-afc-gold/20 text-xs">
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-gray-400 text-[10px] uppercase font-bold">Room:</span>
            <span className="font-mono font-bold text-afc-gold-light">{roomCode}</span>
          </div>

          {/* Soundboard Modal Button */}
          <button
            onClick={onOpenSoundboard}
            title="Classical Soundboard Controls"
            className="p-1.5 rounded-lg bg-afc-navy-surface border border-afc-gold/25 text-afc-gold hover:bg-afc-gold/20 transition-colors"
          >
            <Music className="w-4 h-4" />
          </button>

          {/* Mute Toggle */}
          <button
            onClick={toggleMute}
            title={isMuted ? "Unmute Classical Audio" : "Mute Classical Audio"}
            className="p-1.5 rounded-lg bg-afc-navy-surface border border-afc-gold/25 text-gray-300 hover:text-white transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullScreen}
            title="Toggle Stage Fullscreen"
            className="p-1.5 rounded-lg bg-afc-navy-surface border border-afc-gold/25 text-gray-300 hover:text-afc-gold transition-colors"
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
