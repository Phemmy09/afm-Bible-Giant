// Luxury Classical Music & Orchestral Sound Engine
// Built using Web Audio API polyphonic synthesis for 100% offline & latency-free reliability,
// featuring authentic classical harmony, brass fanfares, harps, and solemn baroque tones.

class ClassicalSoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isMuted = false;
    this.volume = 0.85;
    this.suspenseNode = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : this.volume, this.ctx.currentTime);
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  // Create a warm classical synth note with rich harmonics (pipe organ / brass / strings)
  playTone(freq, duration, type = 'triangle', startTime = 0, gainVal = 0.3) {
    this.init();
    if (this.isMuted || !this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime + startTime);

    // Warm envelope
    const now = this.ctx.currentTime + startTime;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(gainVal, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.05);
  }

  // 1. Classical Correct Answer: Handel's Messiah Triumphant Major Trumpet Chords (D major arpeggio flourish)
  playCorrect() {
    this.stopSuspense();
    this.init();
    if (this.isMuted || !this.ctx) return;

    // D Major Flourish: D4, F#4, A4, D5 in swift baroque trumpet style + sustained grand chord
    const notes = [
      { f: 293.66, t: 0.0, d: 0.15 },  // D4
      { f: 369.99, t: 0.12, d: 0.15 }, // F#4
      { f: 440.00, t: 0.24, d: 0.18 }, // A4
      { f: 587.33, t: 0.38, d: 0.70 }, // D5
    ];

    notes.forEach(n => {
      this.playTone(n.f, n.d, 'sawtooth', n.t, 0.25);
      this.playTone(n.f * 0.5, n.d, 'triangle', n.t, 0.2); // octave bass
    });

    // Final resonant organ chime
    setTimeout(() => {
      this.playTone(587.33, 1.2, 'sine', 0, 0.3); // D5
      this.playTone(739.99, 1.2, 'sine', 0, 0.2); // F#5
      this.playTone(880.00, 1.4, 'sine', 0, 0.25); // A5
    }, 400);
  }

  // 2. Classical Missed / Wrong Answer: Bach D-Minor Solemn Baroque Organ / Cello Chord
  playWrong() {
    this.stopSuspense();
    this.init();
    if (this.isMuted || !this.ctx) return;

    // Sorrowful diminished / D-minor descent
    const notes = [
      { f: 440.00, t: 0.0, d: 0.3 },   // A4
      { f: 415.30, t: 0.15, d: 0.35 }, // G#4
      { f: 369.99, t: 0.30, d: 0.4 },  // F#4
      { f: 293.66, t: 0.45, d: 1.1 },  // D4
      { f: 146.83, t: 0.45, d: 1.2 },  // D3 Deep organ
    ];

    notes.forEach(n => {
      this.playTone(n.f, n.d, 'sawtooth', n.t, 0.22);
      this.playTone(n.f * 0.5, n.d, 'triangle', n.t, 0.25);
    });
  }

  // 3. Question Reveal: Regal Coronation Trumpet Fanfare
  playReveal() {
    this.init();
    if (this.isMuted || !this.ctx) return;

    const fanfare = [
      { f: 392.00, t: 0.0, d: 0.12 }, // G4
      { f: 392.00, t: 0.14, d: 0.12 }, // G4
      { f: 392.00, t: 0.28, d: 0.12 }, // G4
      { f: 523.25, t: 0.44, d: 0.75 }, // C5
      { f: 659.25, t: 0.44, d: 0.75 }, // E5
      { f: 783.99, t: 0.44, d: 0.90 }, // G5
    ];

    fanfare.forEach(n => {
      this.playTone(n.f, n.d, 'sawtooth', n.t, 0.2);
    });
  }

  // 4. Timer Tick: Precision Classical Clockwork Metronome
  playTick() {
    this.init();
    if (this.isMuted || !this.ctx) return;
    this.playTone(880, 0.05, 'sine', 0, 0.15);
    this.playTone(1760, 0.03, 'triangle', 0, 0.08);
  }

  // 5. Timer Expiry / Buzzer: Baroque Clock Chime
  playTimeUp() {
    this.stopSuspense();
    this.init();
    if (this.isMuted || !this.ctx) return;
    this.playTone(330, 0.5, 'square', 0, 0.2);
    this.playTone(293.66, 0.8, 'sawtooth', 0.2, 0.25);
    this.playTone(196, 1.2, 'triangle', 0.4, 0.3);
  }

  // 6. Bonus Question Passed: Regal Herald Trumpet
  playBonusPass() {
    this.init();
    if (this.isMuted || !this.ctx) return;

    const notes = [
      { f: 523.25, t: 0.0, d: 0.15 }, // C5
      { f: 659.25, t: 0.15, d: 0.18 }, // E5
      { f: 783.99, t: 0.32, d: 0.5 },  // G5
      { f: 1046.50, t: 0.48, d: 0.75 }, // C6
    ];

    notes.forEach(n => {
      this.playTone(n.f, n.d, 'sawtooth', n.t, 0.2);
    });
  }

  // 7. Lifeline Activated: Angelic Harp / Celestial Bell Glissando
  playLifeline() {
    this.init();
    if (this.isMuted || !this.ctx) return;

    const harp = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.51];
    harp.forEach((f, i) => {
      this.playTone(f, 0.4, 'sine', i * 0.06, 0.18);
    });
  }

  // 8. Suspense Background Drone (Simulates orchestra cellos / quiet church organ holding tension)
  startSuspense() {
    this.init();
    if (this.isMuted || !this.ctx || this.suspenseNode) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(65.41, this.ctx.currentTime); // C2 low cello drone

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 1.0);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();

      this.suspenseNode = { osc, gain };
    } catch (e) {
      console.warn('Suspense audio error:', e);
    }
  }

  stopSuspense() {
    if (this.suspenseNode && this.ctx) {
      try {
        const { osc, gain } = this.suspenseNode;
        gain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          try { osc.stop(); } catch(e) {}
        }, 550);
      } catch (e) {}
      this.suspenseNode = null;
    }
  }

  // 9. Grand Podium - 3rd Place Bronze Fanfare (Stately Purcell Trumpet March)
  playPodiumThird() {
    this.stopSuspense();
    this.init();
    if (this.isMuted || !this.ctx) return;

    const chords = [
      { f: 392.00, t: 0.0, d: 0.3 },  // G4
      { f: 440.00, t: 0.32, d: 0.3 }, // A4
      { f: 493.88, t: 0.64, d: 0.3 }, // B4
      { f: 587.33, t: 0.96, d: 1.2 }, // D5
    ];
    chords.forEach(c => {
      this.playTone(c.f, c.d, 'sawtooth', c.t, 0.28);
      this.playTone(c.f * 0.5, c.d, 'triangle', c.t, 0.22);
    });
  }

  // 10. Grand Podium - 2nd Place Silver Fanfare (Triumphant Elgar / Imperial Flourish)
  playPodiumSecond() {
    this.stopSuspense();
    this.init();
    if (this.isMuted || !this.ctx) return;

    const chords = [
      { f: 523.25, t: 0.0, d: 0.25 }, // C5
      { f: 659.25, t: 0.26, d: 0.25 }, // E5
      { f: 783.99, t: 0.52, d: 0.35 }, // G5
      { f: 880.00, t: 0.88, d: 0.35 }, // A5
      { f: 1046.50, t: 1.25, d: 1.8 }, // C6
    ];
    chords.forEach(c => {
      this.playTone(c.f, c.d, 'sawtooth', c.t, 0.3);
      this.playTone(c.f * 0.5, c.d, 'triangle', c.t, 0.25);
    });
  }

  // 11. Grand Champion - 1st Place Grand Climax (Handel Hallelujah Chorus / Beethoven Ode to Joy Climax)
  playPodiumFirst() {
    this.stopSuspense();
    this.init();
    if (this.isMuted || !this.ctx) return;

    // Opening Grand Royal Fanfare (Handel Hallelujah motive)
    const melody = [
      // Hal - le - lu - jah!
      { f: 587.33, t: 0.0, d: 0.35 }, // D5
      { f: 440.00, t: 0.38, d: 0.35 }, // A4
      { f: 493.88, t: 0.76, d: 0.35 }, // B4
      { f: 440.00, t: 1.14, d: 0.75 }, // A4
      
      // Hal - le - lu - jah!
      { f: 587.33, t: 1.95, d: 0.35 }, // D5
      { f: 440.00, t: 2.33, d: 0.35 }, // A4
      { f: 493.88, t: 2.71, d: 0.35 }, // B4
      { f: 440.00, t: 3.09, d: 0.75 }, // A4

      // Hal - le - lu - jah, Hal - le - lu - jah!
      { f: 587.33, t: 3.90, d: 0.25 },
      { f: 659.25, t: 4.18, d: 0.25 },
      { f: 739.99, t: 4.46, d: 0.35 },
      { f: 880.00, t: 4.85, d: 1.8 }, // Sustained high A5 climax!
    ];

    melody.forEach(m => {
      this.playTone(m.f, m.d, 'sawtooth', m.t, 0.32);
      this.playTone(m.f * 0.5, m.d, 'triangle', m.t, 0.26);
      this.playTone(m.f * 0.25, m.d, 'sine', m.t, 0.3); // deep pipe organ bass
    });

    // Resonant grand cathedral bell chimes
    setTimeout(() => {
      this.playTone(587.33, 2.5, 'sine', 0, 0.35);
      this.playTone(880.00, 2.5, 'sine', 0, 0.35);
      this.playTone(1174.66, 2.5, 'sine', 0, 0.3);
    }, 4850);
  }
}

export const classicalAudio = new ClassicalSoundEngine();
export default classicalAudio;
