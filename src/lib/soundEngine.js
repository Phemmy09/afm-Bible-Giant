// AFC Bible Giant — Symphonic Classical Sound Engine
// Web Audio API-based cue system with classical/orchestral sounds

class SoundEngine {
  constructor() {
    this.audioContext = null;
    this.isEnabled = false;
    this.isInitialized = false;
    this.gainNode = null;
    this.masterVolume = 0.7;
    this.activeOscillators = new Map();
  }

  async init() {
    if (this.isInitialized) return;
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.gain.value = this.masterVolume;
      this.gainNode.connect(this.audioContext.destination);
      this.isInitialized = true;
      this.isEnabled = true;
    } catch (e) {
      console.warn('Web Audio API not available:', e);
    }
  }

  async enable() {
    if (!this.isInitialized) await this.init();
    if (this.audioContext?.state === 'suspended') {
      await this.audioContext.resume();
    }
    this.isEnabled = true;
  }

  setVolume(vol) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    if (this.gainNode) this.gainNode.gain.value = this.masterVolume;
  }

  // --- Synthesized Sound Cues ---

  _playTone(freq, duration, type = 'sine', envelope = {}) {
    if (!this.isEnabled || !this.audioContext) return;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = 0;
    osc.connect(gain);
    gain.connect(this.gainNode);

    const now = this.audioContext.currentTime;
    const { attack = 0.05, decay = 0.1, sustain = 0.6, release = 0.3 } = envelope;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.8, now + attack);
    gain.gain.linearRampToValueAtTime(sustain, now + attack + decay);
    gain.gain.setValueAtTime(sustain, now + duration - release);
    gain.gain.linearRampToValueAtTime(0, now + duration);

    osc.start(now);
    osc.stop(now + duration + 0.05);
    return osc;
  }

  _playChord(freqs, duration, type = 'sine', envelope = {}) {
    freqs.forEach(f => this._playTone(f, duration, type, envelope));
  }

  playCorrectChime() {
    // Ascending major chord arpeggio (C-E-G-C')
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this._playTone(freq, 0.4 - i * 0.05, 'sine', {
          attack: 0.02, decay: 0.05, sustain: 0.5, release: 0.15,
        });
      }, i * 80);
    });
  }

  playIncorrectBuzz() {
    // Descending minor with slight dissonance
    this._playTone(220, 0.5, 'sawtooth', { attack: 0.01, decay: 0.1, sustain: 0.3, release: 0.2 });
    this._playTone(207.65, 0.5, 'sawtooth', { attack: 0.01, decay: 0.1, sustain: 0.2, release: 0.2 });
    setTimeout(() => {
      this._playTone(185, 0.3, 'sawtooth', { attack: 0.01, decay: 0.05, sustain: 0.2, release: 0.15 });
    }, 150);
  }

  playSuspenseDrone() {
    // Low sustained pad chord
    const id = 'suspense';
    this.stopCue(id);
    if (!this.isEnabled || !this.audioContext) return;

    const freqs = [65.41, 98, 130.81]; // C2, G2, C3
    const oscs = [];
    freqs.forEach(freq => {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.value = 0;
      osc.connect(gain);
      gain.connect(this.gainNode);
      const now = this.audioContext.currentTime;
      gain.gain.linearRampToValueAtTime(0.15, now + 2);
      osc.start(now);
      oscs.push({ osc, gain });
    });
    this.activeOscillators.set(id, oscs);
  }

  playFanfare() {
    // Triumphant brass-like ascending fanfare
    const sequence = [
      { freq: 392, delay: 0, dur: 0.2 },    // G4
      { freq: 523.25, delay: 120, dur: 0.2 }, // C5
      { freq: 659.25, delay: 240, dur: 0.2 }, // E5
      { freq: 783.99, delay: 360, dur: 0.3 }, // G5
      { freq: 1046.5, delay: 550, dur: 0.6 }, // C6 — hold
    ];
    sequence.forEach(({ freq, delay, dur }) => {
      setTimeout(() => {
        this._playTone(freq, dur, 'square', { attack: 0.03, decay: 0.05, sustain: 0.5, release: 0.2 });
        this._playTone(freq * 1.002, dur, 'square', { attack: 0.03, decay: 0.05, sustain: 0.3, release: 0.2 }); // slight detune for richness
      }, delay);
    });
  }

  playApplause() {
    // Noise-based applause simulation
    if (!this.isEnabled || !this.audioContext) return;
    const bufferSize = this.audioContext.sampleRate * 2;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * i / bufferSize);
    }
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 3000;
    filter.Q.value = 0.5;
    const gain = this.audioContext.createGain();
    gain.gain.value = 0.2;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.gainNode);
    source.start();
  }

  playMetronomeTick() {
    this._playTone(1200, 0.05, 'sine', { attack: 0.005, decay: 0.01, sustain: 0.3, release: 0.02 });
  }

  playUCTick() {
    this._playTone(800, 0.06, 'triangle', { attack: 0.005, decay: 0.02, sustain: 0.4, release: 0.02 });
  }

  playTimerLockThud() {
    this._playTone(60, 0.4, 'sine', { attack: 0.01, decay: 0.1, sustain: 0.5, release: 0.2 });
    this._playTone(80, 0.3, 'sine', { attack: 0.01, decay: 0.1, sustain: 0.3, release: 0.15 });
  }

  playWheelSpin() {
    // Clicking/ratchet sound that accelerates
    let delay = 0;
    for (let i = 0; i < 30; i++) {
      const interval = 50 + i * 8;
      setTimeout(() => {
        this._playTone(600 + Math.random() * 200, 0.03, 'square', {
          attack: 0.003, decay: 0.01, sustain: 0.3, release: 0.01,
        });
      }, delay);
      delay += interval;
    }
  }

  playWheelLand() {
    // Bell-like tone
    this._playChord([523.25, 659.25, 783.99], 1.0, 'sine', {
      attack: 0.01, decay: 0.2, sustain: 0.4, release: 0.5,
    });
  }

  playPodiumDrumRoll() {
    const id = 'drum_roll';
    this.stopCue(id);
    if (!this.isEnabled || !this.audioContext) return;

    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    osc.type = 'triangle';
    osc.frequency.value = 100;
    gain.gain.value = 0;
    osc.connect(gain);
    gain.connect(this.gainNode);
    const now = this.audioContext.currentTime;
    gain.gain.linearRampToValueAtTime(0.3, now + 1);
    // Tremolo effect
    const lfo = this.audioContext.createOscillator();
    const lfoGain = this.audioContext.createGain();
    lfo.frequency.value = 20;
    lfoGain.gain.value = 0.15;
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    lfo.start(now);
    osc.start(now);
    this.activeOscillators.set(id, [{ osc, gain }, { osc: lfo, gain: lfoGain }]);
  }

  playPodiumReveal() {
    this.stopCue('drum_roll');
    this.playFanfare();
  }

  stopCue(id) {
    const oscs = this.activeOscillators.get(id);
    if (oscs) {
      oscs.forEach(({ osc, gain }) => {
        try {
          const now = this.audioContext.currentTime;
          gain.gain.linearRampToValueAtTime(0, now + 0.3);
          osc.stop(now + 0.35);
        } catch (e) { /* already stopped */ }
      });
      this.activeOscillators.delete(id);
    }
  }

  stopAll() {
    for (const id of this.activeOscillators.keys()) {
      this.stopCue(id);
    }
  }

  playCue(cueName) {
    const cueMap = {
      suspense_drone: () => this.playSuspenseDrone(),
      correct_chime: () => this.playCorrectChime(),
      incorrect_buzz: () => this.playIncorrectBuzz(),
      fanfare: () => this.playFanfare(),
      applause: () => this.playApplause(),
      metronome_tick: () => this.playMetronomeTick(),
      uc_tick: () => this.playUCTick(),
      timer_lock_thud: () => this.playTimerLockThud(),
      wheel_spin: () => this.playWheelSpin(),
      wheel_land: () => this.playWheelLand(),
      podium_drum_roll: () => this.playPodiumDrumRoll(),
      podium_reveal: () => this.playPodiumReveal(),
    };
    const fn = cueMap[cueName];
    if (fn) fn();
  }
}

export const soundEngine = new SoundEngine();
export default soundEngine;
