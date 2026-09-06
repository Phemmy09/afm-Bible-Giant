import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  KeyRound, 
  ShieldCheck, 
  Sparkles, 
  Eye, 
  EyeOff, 
  ArrowRight,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import classicalAudio from '../services/audioService';

export const MASTER_PASSWORD_KEY = 'afc_tournament_master_password';
export const AUTH_SESSION_KEY = 'afc_tournament_auth_session';
export const DEFAULT_MASTER_PASSWORD = 'BIBLEGIANT2026';

export default function AuthLockScreen({ onAuthenticated }) {
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [rememberDevice, setRememberDevice] = useState(true);
  const [showHint, setShowHint] = useState(false);

  const getSavedMasterPassword = () => {
    return localStorage.getItem(MASTER_PASSWORD_KEY) || DEFAULT_MASTER_PASSWORD;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctPassword = getSavedMasterPassword();

    // Check case-insensitive trim match
    if (passwordInput.trim() === correctPassword || passwordInput.trim().toUpperCase() === correctPassword.toUpperCase()) {
      setErrorMsg('');
      classicalAudio.playLifeline(); // pleasant chime

      if (rememberDevice) {
        localStorage.setItem(AUTH_SESSION_KEY, 'authenticated_' + Date.now());
      } else {
        sessionStorage.setItem(AUTH_SESSION_KEY, 'authenticated_' + Date.now());
      }

      onAuthenticated();
    } else {
      setErrorMsg('Incorrect tournament passcode. Please check and try again.');
      classicalAudio.playWrong();
    }
  };

  const handleQuickPresetUnlock = () => {
    setPasswordInput(getSavedMasterPassword());
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#030712]/95 backdrop-blur-2xl">
      
      {/* Background Decorative Rings & Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-afc-gold/5 blur-3xl animate-pulse"></div>
        <div className="w-[450px] h-[450px] rounded-full bg-cyan-500/5 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md gold-card-futuristic rounded-3xl p-6 sm:p-8 border-2 border-afc-gold/60 shadow-gold-glow-lg text-center space-y-6 animate-fade-in">
        
        {/* Dual Crest Header */}
        <div className="flex items-center justify-center -space-x-3 pt-2">
          <div className="relative z-10 w-16 h-16 rounded-full border-2 border-afc-gold shadow-gold-glow bg-afc-navy p-1">
            <img src="/logo.svg" alt="AFC Crest" className="w-full h-full object-contain" />
          </div>
          <div className="relative z-20 w-14 h-14 rounded-full border-2 border-cyan-400 shadow-cyan-glow bg-white p-1">
            <img src="/afc/ydd_logo_hq.png" alt="YDD Logo" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-afc-gold/15 border border-afc-gold/40 text-afc-gold text-[10px] font-black uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            Tournament Security Gate
          </div>
          
          <h2 className="text-xl sm:text-2xl font-serif font-black text-white gold-text-shimmer">
            WHO WANTS TO BE A BIBLE GIANT
          </h2>
          
          <p className="text-xs text-gray-300">
            Apostolic Faith Church • AFMWECA Youth Development Directorate
          </p>
        </div>

        {/* Unlock Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-afc-gold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5" />
                Enter Master Passcode:
              </span>
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="text-[10px] text-cyan-300 hover:underline flex items-center gap-0.5 font-normal"
              >
                <HelpCircle className="w-3 h-3" />
                {showHint ? 'Hide Hint' : 'Default Passcode'}
              </button>
            </label>

            {/* Hint Callout */}
            {showHint && (
              <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-[11px] text-cyan-200 flex items-center justify-between animate-fade-in">
                <span>Default Passcode: <strong className="font-mono text-white select-all">{getSavedMasterPassword()}</strong></span>
                <button
                  type="button"
                  onClick={handleQuickPresetUnlock}
                  className="px-2 py-0.5 rounded bg-cyan-500 text-afc-navy font-bold text-[10px] hover:bg-cyan-400"
                >
                  Insert
                </button>
              </div>
            )}

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="Enter password to unlock tournament..."
                className="w-full px-4 py-3 rounded-2xl bg-afc-navy border-2 border-afc-gold/40 text-white placeholder-gray-500 text-sm font-mono tracking-wider focus:outline-none focus:border-afc-gold focus:shadow-gold-glow transition-all"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Remember Device Checkbox */}
          <div className="flex items-center justify-between text-xs text-gray-300 pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberDevice}
                onChange={(e) => setRememberDevice(e.target.checked)}
                className="rounded border-afc-gold/40 text-afc-gold focus:ring-0 w-4 h-4 bg-afc-navy"
              />
              <span>Remember session on this device</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl gold-button flex items-center justify-center gap-2 text-sm uppercase tracking-wider font-serif font-black shadow-gold-glow cursor-pointer transition-transform active:scale-98"
          >
            <Unlock className="w-4 h-4" />
            <span>Unlock Tournament Arena</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security Footer Note */}
        <div className="pt-2 border-t border-afc-gold/20 text-[10px] text-gray-400 space-y-1">
          <p>The Apostolic Faith Church • Ekiti Area Headquarters</p>
          <p className="text-gray-500">74 Ajilosun Street, Ado-Ekiti, Ekiti State, Nigeria</p>
        </div>

      </div>
    </div>
  );
}
