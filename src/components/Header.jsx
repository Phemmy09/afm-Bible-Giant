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
  Music,
  Lock,
  KeyRound,
  Home
} from 'lucide-react';
import classicalAudio from '../services/audioService';

export default function Header({ 
  activeView, 
  setActiveView, 
  roomCode, 
  connectionStatus = 'connected',
  onOpenSoundboard,
  onOpenHeritage,
  onOpenAdminLogin,
  isAdminAuthenticated = false
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
    <header className="sticky top-0 z-40 bg-[#030712]/95 backdrop-blur-xl border-b border-afc-gold/30 px-3 sm:px-6 py-3 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Brand Identity & Logos */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setActiveView('home')}
        >
          <div className="flex items-center -space-x-3">
            <div className="relative z-10 w-11 h-11 rounded-full border-2 border-afc-gold shadow-gold-glow bg-afc-navy p-0.5 group-hover:scale-105 transition-transform">
              <img src="/logo.svg" alt="AFC Crest" className="w-full h-full object-contain" />
            </div>
            <div className="relative z-20 w-9 h-9 rounded-full border-2 border-cyan-400 shadow-cyan-glow bg-white p-0.5 group-hover:scale-105 transition-transform">
              <img src="/afc/ydd_logo_hq.png" alt="YDD Logo" className="w-full h-full object-contain" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-serif font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-afc-gold-light via-afc-gold to-afc-gold-dark">
                WHO WANTS TO BE A BIBLE GIANT
              </h1>
              <span className="hidden md:inline-block px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-afc-crimson text-white rounded-full border border-afc-crimson-light">
                Ekiti Area
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-gray-300 font-medium">
              The Apostolic Faith Church • Youth Development Directorate (YDD)
            </p>
          </div>
        </div>

        {/* Center: Main Navigation Tabs */}
        <div className="hidden lg:flex items-center bg-afc-navy-surface/90 p-1 rounded-2xl border border-afc-gold/30 shadow-inner">
          <button
            onClick={() => setActiveView('home')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeView === 'home'
                ? 'bg-afc-gold text-afc-navy shadow-md font-black'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => {
              classicalAudio.playReveal();
              setActiveView('stage');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeView === 'stage'
                ? 'bg-afc-gold text-afc-navy shadow-md font-black'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>Stage (Projector)</span>
          </button>

          <button
            onClick={onOpenHeritage}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-gray-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Heritage Pavilion</span>
          </button>
        </div>

        {/* Right: Soundboard, Admin Command Portal Button, Mute, Fullscreen */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Dedicated Admin Portal Button */}
          <button
            onClick={() => {
              if (isAdminAuthenticated) {
                setActiveView('admin');
              } else {
                onOpenAdminLogin();
              }
            }}
            title="Quizmaster Admin Command Dashboard"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-black transition-all cursor-pointer shadow-md hover:scale-105 ${
              activeView === 'admin'
                ? 'bg-afc-gold text-afc-navy border-afc-gold shadow-gold-glow'
                : 'bg-gradient-to-r from-afc-navy-surface via-afc-navy-mid to-afc-navy-surface border-afc-gold/50 text-afc-gold-light hover:border-afc-gold hover:shadow-gold-glow'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-afc-gold" />
            <span className="font-serif">Admin Portal</span>
            <Lock className="w-3 h-3 text-afc-gold opacity-80" />
          </button>

          {/* Soundboard Modal Button */}
          <button
            onClick={onOpenSoundboard}
            title="Classical Soundboard Controls"
            className="p-2 rounded-xl bg-afc-navy-surface border border-afc-gold/25 text-afc-gold hover:bg-afc-gold/20 transition-colors cursor-pointer"
          >
            <Music className="w-4 h-4" />
          </button>

          {/* Mute Toggle */}
          <button
            onClick={toggleMute}
            title={isMuted ? "Unmute Classical Audio" : "Mute Classical Audio"}
            className="p-2 rounded-xl bg-afc-navy-surface border border-afc-gold/25 text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullScreen}
            title="Toggle Fullscreen"
            className="p-2 rounded-xl bg-afc-navy-surface border border-afc-gold/25 text-gray-300 hover:text-afc-gold transition-colors cursor-pointer"
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
