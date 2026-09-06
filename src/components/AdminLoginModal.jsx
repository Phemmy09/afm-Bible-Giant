import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Unlock, 
  KeyRound, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  AlertCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import classicalAudio from '../services/audioService';

export const ADMIN_PASSWORD_KEY = 'afc_admin_master_password';
export const ADMIN_SESSION_KEY = 'afc_admin_session_auth';
export const DEFAULT_ADMIN_PASSWORD = 'admin2026';

export default function AdminLoginModal({ isOpen, onClose, onSuccess }) {
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showHint, setShowHint] = useState(false);

  if (!isOpen) return null;

  const getSavedAdminPassword = () => {
    return localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_ADMIN_PASSWORD;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctPassword = getSavedAdminPassword();

    if (passwordInput.trim() === correctPassword || passwordInput.trim().toLowerCase() === correctPassword.toLowerCase()) {
      setErrorMsg('');
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'active_' + Date.now());
      classicalAudio.playLifeline();
      onSuccess();
    } else {
      setErrorMsg('Incorrect Admin Password. Please verify and try again.');
      classicalAudio.playWrong();
    }
  };

  const handleQuickInsertHint = () => {
    setPasswordInput(getSavedAdminPassword());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-md bg-afc-navy border-2 border-afc-gold/60 rounded-3xl p-6 sm:p-8 shadow-gold-glow-lg text-center space-y-6">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dual Crest */}
        <div className="flex items-center justify-center -space-x-3 pt-1">
          <div className="relative z-10 w-14 h-14 rounded-full border-2 border-afc-gold shadow-gold-glow bg-afc-navy p-1">
            <img src="/logo.svg" alt="AFC Crest" className="w-full h-full object-contain" />
          </div>
          <div className="relative z-20 w-12 h-12 rounded-full border-2 border-cyan-400 shadow-cyan-glow bg-white p-0.5">
            <img src="/afc/ydd_logo_hq.png" alt="YDD Logo" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-afc-gold/15 border border-afc-gold/40 text-afc-gold text-[10px] font-black uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            Quizmaster Access Gate
          </div>
          
          <h3 className="text-xl font-serif font-black text-white gold-text-shimmer">
            Admin Command Portal
          </h3>
          
          <p className="text-xs text-gray-300">
            Authorized tournament setup, question bank & live controls
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-afc-gold flex items-center gap-1.5 uppercase tracking-wider">
                <KeyRound className="w-3.5 h-3.5" />
                Admin Password:
              </label>
              
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="text-[10px] text-cyan-300 hover:underline flex items-center gap-1"
              >
                <HelpCircle className="w-3 h-3" />
                {showHint ? 'Hide Hint' : 'Default Hint'}
              </button>
            </div>

            {/* Hint Panel */}
            {showHint && (
              <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-[11px] text-cyan-200 flex items-center justify-between animate-fade-in">
                <span>Default Password: <strong className="font-mono text-white">{getSavedAdminPassword()}</strong></span>
                <button
                  type="button"
                  onClick={handleQuickInsertHint}
                  className="px-2 py-0.5 rounded bg-cyan-500 text-afc-navy font-bold text-[10px] hover:bg-cyan-400 cursor-pointer"
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
                placeholder="Enter admin password..."
                className="w-full px-4 py-3 rounded-2xl bg-afc-navy-surface border-2 border-afc-gold/40 text-white placeholder-gray-500 text-sm font-mono tracking-wider focus:outline-none focus:border-afc-gold focus:shadow-gold-glow transition-all"
                autoFocus
                required
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

          {/* Error message */}
          {errorMsg && (
            <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl gold-button flex items-center justify-center gap-2 text-sm uppercase tracking-wider font-serif font-black shadow-gold-glow cursor-pointer transition-transform active:scale-98"
          >
            <Unlock className="w-4 h-4" />
            <span>Enter Admin Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
