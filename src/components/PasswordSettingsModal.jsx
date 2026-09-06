import React, { useState } from 'react';
import { 
  X, 
  KeyRound, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  EyeOff,
  Lock
} from 'lucide-react';
import { 
  MASTER_PASSWORD_KEY, 
  DEFAULT_MASTER_PASSWORD 
} from './AuthLockScreen';
import classicalAudio from '../services/audioService';

export default function PasswordSettingsModal({ isOpen, onClose }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' }); // type: 'success' | 'error'

  if (!isOpen) return null;

  const getSavedMasterPassword = () => {
    return localStorage.getItem(MASTER_PASSWORD_KEY) || DEFAULT_MASTER_PASSWORD;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const correctPassword = getSavedMasterPassword();

    if (currentPassword !== correctPassword && currentPassword.toUpperCase() !== correctPassword.toUpperCase()) {
      setMsg({ text: 'Current password does not match.', type: 'error' });
      classicalAudio.playWrong();
      return;
    }

    if (!newPassword || newPassword.length < 4) {
      setMsg({ text: 'New password must be at least 4 characters long.', type: 'error' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMsg({ text: 'New passwords do not match.', type: 'error' });
      return;
    }

    localStorage.setItem(MASTER_PASSWORD_KEY, newPassword.trim());
    setMsg({ text: 'Tournament master password updated successfully!', type: 'success' });
    classicalAudio.playLifeline();

    setTimeout(() => {
      onClose();
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setMsg({ text: '', type: '' });
    }, 1200);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset tournament passcode to default (BIBLEGIANT2026)?')) {
      localStorage.setItem(MASTER_PASSWORD_KEY, DEFAULT_MASTER_PASSWORD);
      setMsg({ text: 'Reset to default password: ' + DEFAULT_MASTER_PASSWORD, type: 'success' });
      classicalAudio.playLifeline();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-afc-navy border-2 border-afc-gold/60 rounded-3xl p-6 shadow-gold-glow-lg space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-afc-gold/30 pb-3">
          <div className="flex items-center gap-2.5 text-afc-gold-light font-serif font-black text-base">
            <KeyRound className="w-5 h-5 text-afc-gold" />
            <span>Tournament Security & Password</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback Message */}
        {msg.text && (
          <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
            msg.type === 'success' 
              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200' 
              : 'bg-rose-950/80 border-rose-500/50 text-rose-200'
          }`}>
            {msg.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-rose-400" />}
            <span>{msg.text}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4 text-left">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-300">Current Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password..."
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-afc-navy-surface border border-afc-gold/40 text-white text-xs font-mono focus:border-afc-gold focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-300">New Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new master password..."
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-afc-navy-surface border border-afc-gold/40 text-white text-xs font-mono focus:border-afc-gold focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-300">Confirm New Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new master password..."
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-afc-navy-surface border border-afc-gold/40 text-white text-xs font-mono focus:border-afc-gold focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="flex items-center gap-1.5 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showPassword ? 'Hide Passwords' : 'Show Passwords'}</span>
            </button>

            <button
              type="button"
              onClick={handleResetToDefault}
              className="text-cyan-400 hover:underline text-[11px]"
            >
              Reset to Default
            </button>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 text-gray-300 text-xs font-bold hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl gold-button text-xs font-serif font-black shadow-gold-glow"
            >
              Update Password
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
