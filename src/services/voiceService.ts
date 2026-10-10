/**
 * Voice Service: ElevenLabs & Calming Speech Synthesis Engine
 */

class VoiceService {
  private audioContext: AudioContext | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking = false;
  private ambientOscillator: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;

  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new AudioCtx();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    return this.audioContext;
  }

  /**
   * Speak calming navigation directions using Web Speech API or ElevenLabs API
   */
  public async speakCalmingRoute(
    text: string, 
    options?: {
      voiceName?: string;
      rate?: number;
      pitch?: number;
      elevenLabsApiKey?: string;
      elevenLabsVoiceId?: string;
      onEnd?: () => void;
    }
  ): Promise<void> {
    const { 
      rate = 0.88, // slightly slow, comforting tempo
      pitch = 1.05, // warm, empathetic pitch
      elevenLabsApiKey,
      elevenLabsVoiceId = '21m00Tcm4TlvDq8ikWAM',
      onEnd
    } = options || {};

    // 1. Try ElevenLabs API if key is provided
    if (elevenLabsApiKey && elevenLabsApiKey.trim().length > 10) {
      try {
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${elevenLabsVoiceId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': elevenLabsApiKey.trim(),
          },
          body: JSON.stringify({
            text,
            model_id: 'eleven_turbo_v2_5',
            voice_settings: {
              stability: 0.75,
              similarity_boost: 0.85,
              style: 0.2,
              use_speaker_boost: true
            }
          })
        });

        if (response.ok) {
          const blob = await response.blob();
          const audioUrl = URL.createObjectURL(blob);
          const audio = new Audio(audioUrl);
          this.isSpeaking = true;
          audio.onended = () => {
            this.isSpeaking = false;
            onEnd?.();
          };
          await audio.play();
          return;
        }
      } catch (err) {
        console.warn('ElevenLabs API request failed, falling back to Web Speech engine:', err);
      }
    }

    // 2. High-Fidelity Web Speech API fallback
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = 1.0;

      // Select warm female or natural voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(v => 
        (v.lang.includes('en') || v.lang.includes('hi')) && 
        (v.name.toLowerCase().includes('female') || 
         v.name.toLowerCase().includes('natural') || 
         v.name.toLowerCase().includes('samantha') || 
         v.name.toLowerCase().includes('zira') ||
         v.name.toLowerCase().includes('aditi') ||
         v.name.toLowerCase().includes('google uk english female'))
      ) || voices[0];

      if (preferred) {
        utterance.voice = preferred;
      }

      utterance.onend = () => {
        this.isSpeaking = false;
        onEnd?.();
      };
      utterance.onerror = () => {
        this.isSpeaking = false;
        onEnd?.();
      };

      this.currentUtterance = utterance;
      this.isSpeaking = true;
      window.speechSynthesis.speak(utterance);
    }
  }

  /**
   * Stop current speech
   */
  public stopSpeaking(): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.stopCalmingHarmonics();
  }

  /**
   * Start 528 Hz gentle "Solffeggio / Grounding" ambient frequency for panic relief
   */
  public startCalmingHarmonics(): void {
    try {
      const ctx = this.getAudioContext();
      if (this.ambientOscillator) {
        return;
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, ctx.currentTime); // 528 Hz frequency associated with calming

      // Very soft, non-intrusive volume
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      this.ambientOscillator = osc;
      this.ambientGain = gain;
    } catch (e) {
      console.warn('Audio context error:', e);
    }
  }

  public stopCalmingHarmonics(): void {
    if (this.ambientOscillator && this.ambientGain && this.audioContext) {
      try {
        const ctx = this.audioContext;
        this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, ctx.currentTime);
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
        setTimeout(() => {
          this.ambientOscillator?.stop();
          this.ambientOscillator?.disconnect();
          this.ambientOscillator = null;
          this.ambientGain = null;
        }, 600);
      } catch (e) {
        this.ambientOscillator = null;
      }
    }
  }

  /**
   * Play High-Decibel SOS Deterrent Siren
   */
  public playEmergencySiren(): () => void {
    const ctx = this.getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    gain.gain.setValueAtTime(0.3, ctx.currentTime);

    // Modulate between 750 Hz and 1300 Hz
    let high = true;
    const interval = setInterval(() => {
      if (ctx.state === 'running') {
        const targetFreq = high ? 1350 : 780;
        osc.frequency.setTargetAtTime(targetFreq, ctx.currentTime, 0.12);
        high = !high;
      }
    }, 280);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    return () => {
      clearInterval(interval);
      try {
        gain.gain.setTargetAtTime(0.001, ctx.currentTime, 0.05);
        setTimeout(() => {
          osc.stop();
          osc.disconnect();
        }, 100);
      } catch (e) {
        // cleanup
      }
    };
  }

  public getSpeakingStatus(): boolean {
    return this.isSpeaking;
  }
}

export const voiceService = new VoiceService();
