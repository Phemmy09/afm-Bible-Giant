import React from 'react';
import { 
  X, 
  Volume2, 
  Play, 
  Square, 
  Music, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Award 
} from 'lucide-react';
import classicalAudio from '../services/audioService';

export default function SoundboardModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const soundCues = [
    {
      title: "Handel's Trumpet Flourish (Correct Answer)",
      desc: "Triumphant major arpeggio fanfare in D-major followed by resonant church organ chime.",
      icon: CheckCircle2,
      color: "text-emerald-400 border-emerald-500/40 bg-emerald-950/20",
      action: () => classicalAudio.playCorrect()
    },
    {
      title: "Bach Solemn Baroque Chord (Missed/Wrong)",
      desc: "Sorrowful descending baroque minor cadence with deep organ pedal note.",
      icon: XCircle,
      color: "text-rose-400 border-rose-500/40 bg-rose-950/20",
      action: () => classicalAudio.playWrong()
    },
    {
      title: "Regal Coronation Fanfare (Reveal Question)",
      desc: "Noble brass trumpet announcement for revealing high-stakes questions.",
      icon: Music,
      color: "text-afc-gold border-afc-gold/40 bg-afc-navy-surface",
      action: () => classicalAudio.playReveal()
    },
    {
      title: "Baroque Herald Trumpet (Bonus Passed)",
      desc: "Ascending brass herald indicating bonus question passed to next contestant.",
      icon: Sparkles,
      color: "text-cyan-400 border-cyan-500/40 bg-cyan-950/20",
      action: () => classicalAudio.playBonusPass()
    },
    {
      title: "Angelic Harp Glissando (Lifeline Activated)",
      desc: "Shimmering celestial harp run when 50:50, scripture search, or advice is used.",
      icon: Sparkles,
      color: "text-purple-400 border-purple-500/40 bg-purple-950/20",
      action: () => classicalAudio.playLifeline()
    },
    {
      title: "Metronome Clockwork (Timer Tick)",
      desc: "Precision classical acoustic metronome tick.",
      icon: Clock,
      color: "text-amber-400 border-amber-500/40 bg-amber-950/20",
      action: () => classicalAudio.playTick()
    },
    {
      title: "Baroque Cathedral Chime (Time's Up)",
      desc: "Deep bell toll signaling the countdown has expired.",
      icon: Clock,
      color: "text-orange-400 border-orange-500/40 bg-orange-950/20",
      action: () => classicalAudio.playTimeUp()
    },
    {
      title: "Purcell Trumpet March (Podium 3rd Place)",
      desc: "Stately English baroque royal fanfare for the Bronze Bible Giant.",
      icon: Award,
      color: "text-amber-600 border-amber-600/40 bg-amber-950/20",
      action: () => classicalAudio.playPodiumThird()
    },
    {
      title: "Imperial Symphonic Fanfare (Podium 2nd Place)",
      desc: "Rising orchestral strings flourish for the Silver Bible Giant.",
      icon: Award,
      color: "text-slate-300 border-slate-400/40 bg-slate-900/30",
      action: () => classicalAudio.playPodiumSecond()
    },
    {
      title: "Handel Hallelujah Climax (1st Place Champion)",
      desc: "The grand coronation: Handel's Messiah Hallelujah chorus motif with triumphant church bells!",
      icon: Award,
      color: "text-afc-gold-light border-afc-gold bg-afc-gold/10 font-bold",
      action: () => classicalAudio.playPodiumFirst()
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-afc-navy border-2 border-afc-gold/50 rounded-2xl shadow-gold-glow-lg overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-afc-navy-surface border-b border-afc-gold/30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-afc-gold/20 text-afc-gold">
              <Music className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-afc-gold-light">
                Classical Orchestral Soundboard
              </h3>
              <p className="text-xs text-gray-300">
                Audition & trigger all authentic classical music and trumpet fanfares
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ambient Suspense Controller */}
        <div className="px-6 py-3 bg-gradient-to-r from-afc-navy-mid to-afc-navy border-b border-afc-gold/20 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-afc-gold uppercase tracking-wider">
              Ambient Suspense (Baroque Cello Drone)
            </span>
            <p className="text-[11px] text-gray-400">
              Plays a continuous low strings tension drone while contestants deliberate
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => classicalAudio.startSuspense()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-afc-gold/20 border border-afc-gold text-afc-gold-light hover:bg-afc-gold/30"
            >
              <Play className="w-3.5 h-3.5" /> Start Drone
            </button>
            <button
              onClick={() => classicalAudio.stopSuspense()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-rose-950/40 border border-rose-500/40 text-rose-300 hover:bg-rose-900/50"
            >
              <Square className="w-3.5 h-3.5" /> Stop
            </button>
          </div>
        </div>

        {/* Cues List */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-2.5">
          {soundCues.map((cue, idx) => {
            const Icon = cue.icon;
            return (
              <div 
                key={idx}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all hover:scale-[1.01] ${cue.color}`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-black/30">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-100">{cue.title}</h4>
                    <p className="text-xs text-gray-300 line-clamp-1">{cue.desc}</p>
                  </div>
                </div>

                <button
                  onClick={cue.action}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 hover:bg-afc-gold hover:text-afc-navy border border-white/20 transition-all ml-4 shrink-0"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Play
                </button>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-afc-navy-surface border-t border-afc-gold/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold rounded-lg bg-afc-gold text-afc-navy hover:brightness-110"
          >
            Close Soundboard
          </button>
        </div>

      </div>
    </div>
  );
}
