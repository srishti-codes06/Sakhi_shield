import React, { useState } from 'react';
import { CALMING_VOICE_PERSONAS } from '../data/hamirpurData';
import { CalmingVoicePersona } from '../types';
import { voiceService } from '../services/voiceService';
import { generateCalmingNavigationScript } from '../services/aiService';
import { 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Radio, 
  Play, 
  Square, 
  Heart, 
  Navigation, 
  Headphones, 
  Key, 
  Sliders, 
  ShieldCheck,
  Mic,
  Activity
} from 'lucide-react';

export const VoiceNavigator: React.FC = () => {
  const [selectedPersona, setSelectedPersona] = useState<CalmingVoicePersona>(CALMING_VOICE_PERSONAS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isHarmonicsActive, setIsHarmonicsActive] = useState<boolean>(false);
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState<string>('');
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(false);

  // Dynamic route script generation
  const [currentStreet, setCurrentStreet] = useState<string>('Gandhi Chowk towards Anu Road');
  const [nextSafeHaven, setNextSafeHaven] = useState<string>('Sanjeevani Medicos & Police Aid Booth');
  const [activeSpeechText, setActiveSpeechText] = useState<string>(
    'Take a slow, deep breath. You are walking along Gandhi Chowk. The street is wide and illuminated by municipal high-mast lights. Sanjeevani Medicos is just 140 meters ahead on your right. Your AI Guardian is active, and verified pink cabs are patrolling nearby. I am right here with you.'
  );

  // Voice cloning simulation state
  const [cloneProfile, setCloneProfile] = useState<'Sister' | 'Mother' | 'Guardian Friend'>('Sister');
  const [warmthSlider, setWarmthSlider] = useState<number>(85);
  const [pacingSlider, setPacingSlider] = useState<number>(88);

  const handlePlayVoice = async () => {
    if (isPlaying) {
      voiceService.stopSpeaking();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    await voiceService.speakCalmingRoute(activeSpeechText, {
      rate: pacingSlider / 100,
      pitch: 1.05,
      elevenLabsApiKey: elevenLabsApiKey || undefined,
      elevenLabsVoiceId: selectedPersona.elevenLabsVoiceId,
      onEnd: () => setIsPlaying(false),
    });
  };

  const handleToggleHarmonics = () => {
    if (isHarmonicsActive) {
      voiceService.stopCalmingHarmonics();
      setIsHarmonicsActive(false);
    } else {
      voiceService.startCalmingHarmonics();
      setIsHarmonicsActive(true);
    }
  };

  const handleRegenerateScript = async () => {
    const script = await generateCalmingNavigationScript({
      personaName: selectedPersona.name,
      currentStreet,
      nextSafeHaven,
      timeRemainingMins: 3,
    });
    setActiveSpeechText(script);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#FFF5F2] via-[#FAF5FF] to-[#FFF1EE] rounded-3xl p-6 border border-[#E9D5FF] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-xs font-bold text-[#6B21A8] mb-2 border border-[#DDD6FE]">
              <Headphones className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span>ElevenLabs Natural Calming Audio Guidance</span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#342422] font-serif">
              Gentle Voice Navigation & Guardian Voice Companion
            </h2>
            <p className="text-xs text-[#78615E] mt-1 max-w-2xl leading-relaxed">
              When walking through dimly lit or tense corridors at night, listening to a steady, compassionate voice lowers acute cortisol spikes and guides you along verified well-lit safe havens.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowApiKeyInput(!showApiKeyInput)}
              className="px-3 py-2 rounded-xl bg-white border border-[#DDD6FE] text-xs font-semibold text-[#6B21A8] hover:bg-[#FAF5FF] transition-all flex items-center gap-1.5"
            >
              <Key className="w-3.5 h-3.5" />
              <span>{elevenLabsApiKey ? 'ElevenLabs Key Active' : 'Configure ElevenLabs Key'}</span>
            </button>
          </div>
        </div>

        {/* Optional ElevenLabs API Key configuration */}
        {showApiKeyInput && (
          <div className="mt-4 p-4 rounded-2xl bg-white/90 border border-[#DDD6FE] max-w-lg">
            <label className="text-xs font-bold text-[#342422] block mb-1">
              ElevenLabs API Key (Optional):
            </label>
            <p className="text-[11px] text-[#78615E] mb-2">
              If provided, high-definition neural voice synthesis will stream directly from ElevenLabs. Otherwise, the high-fidelity built-in calming audio engine runs automatically.
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="xi-api-key..."
                value={elevenLabsApiKey}
                onChange={(e) => setElevenLabsApiKey(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              />
              <button
                onClick={() => setShowApiKeyInput(false)}
                className="px-3 py-2 text-xs font-bold rounded-xl bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Live Voice Player (Left) + Voice Cloning & Personas (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Active Voice Player & Script (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-[#FEE2E2] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF1EE] flex items-center justify-center text-[#E11D48]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#342422]">
                    Active Voice: {selectedPersona.name} ({selectedPersona.tone})
                  </h3>
                  <p className="text-xs text-[#78615E]">{selectedPersona.title}</p>
                </div>
              </div>

              {/* Harmonic grounding pad button */}
              <button
                onClick={handleToggleHarmonics}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isHarmonicsActive
                    ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#065F46] animate-pulse'
                    : 'bg-[#FFF9F6] border-[#FEE2E2] text-[#78615E] hover:bg-[#FFF1EE]'
                }`}
                title="528 Hz Solfeggio soothing grounding frequency to calm anxiety"
              >
                <Activity className="w-3.5 h-3.5 text-[#059669]" />
                <span>{isHarmonicsActive ? '528Hz Calming Drone ON' : 'Grounding Drone (528Hz)'}</span>
              </button>
            </div>

            {/* Spoken Guidance Prompt Box */}
            <div className="p-4 rounded-2xl bg-[#FFF9F6] border border-[#FED7D7] relative">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#9F1239] mb-1.5 flex items-center justify-between">
                <span>Spoken Reassurance Script (Hamirpur Sector)</span>
                <span className="text-[10px] text-[#78615E] font-normal">Real-Time Navigation</span>
              </div>
              <p className="text-xs text-[#342422] leading-relaxed italic">
                "{activeSpeechText}"
              </p>
            </div>

            {/* Voice Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={handlePlayVoice}
                className={`px-6 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-md transition-all ${
                  isPlaying
                    ? 'bg-[#BE123C] text-white animate-pulse'
                    : 'bg-gradient-to-r from-[#E11D48] to-[#F43F5E] text-white hover:from-[#BE123C] hover:to-[#E11D48]'
                }`}
              >
                {isPlaying ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlaying ? 'Pause Voice Guidance' : 'Play Calming Voice Guidance'}</span>
              </button>

              <button
                onClick={handleRegenerateScript}
                className="px-4 py-2.5 rounded-2xl border border-[#FECDD3] bg-white text-xs font-semibold text-[#9F1239] hover:bg-[#FFF1EE] transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F43F5E]" />
                <span>Regenerate Context Script</span>
              </button>
            </div>

            {/* Context Location Selectors for Hamirpur */}
            <div className="pt-3 border-t border-[#FEE2E2] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-[#78615E] block mb-1">Current Corridor:</label>
                <input
                  type="text"
                  value={currentStreet}
                  onChange={(e) => setCurrentStreet(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-[#FEE2E2] bg-[#FFFBF9] text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#78615E] block mb-1">Target Safe Haven:</label>
                <input
                  type="text"
                  value={nextSafeHaven}
                  onChange={(e) => setNextSafeHaven(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-[#FEE2E2] bg-[#FFFBF9] text-xs"
                />
              </div>
            </div>
          </div>

          {/* Calming Personas Selection */}
          <div className="bg-white rounded-3xl p-6 border border-[#FEE2E2] shadow-xs">
            <h3 className="font-bold text-[#342422] text-sm mb-3">
              Select Emotional Archetype & Voice Persona
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CALMING_VOICE_PERSONAS.map((persona) => {
                const isSelected = selectedPersona.id === persona.id;
                return (
                  <div
                    key={persona.id}
                    onClick={() => {
                      setSelectedPersona(persona);
                      setActiveSpeechText(persona.sampleText);
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#FFF1EE] border-[#F43F5E] ring-2 ring-[#FDA4AF]'
                        : 'bg-[#FFFBF9] border-[#FEE2E2] hover:border-[#FECDD3]'
                    }`}
                  >
                    <div className="font-bold text-xs text-[#342422] mb-0.5">{persona.name}</div>
                    <div className="text-[11px] font-semibold text-[#9F1239] mb-1">{persona.tone}</div>
                    <p className="text-[10px] text-[#78615E] leading-relaxed line-clamp-3">
                      {persona.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: ElevenLabs Voice Cloning & Guardian Simulator (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-[#FEE2E2] shadow-xs space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#EDE9FE] flex items-center justify-center text-[#7C3AED]">
                <Mic className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-[#342422] text-base">Guardian Voice Cloning Simulator</h3>
                <p className="text-xs text-[#78615E]">Simulate a loved one's voice for psychological calming</p>
              </div>
            </div>

            <p className="text-xs text-[#6B4B48] leading-relaxed bg-[#FAF5FF] p-3 rounded-2xl border border-[#E9D5FF]">
              Studies in emergency psychology show that hearing the vocal tone of an intimate family member (sister, mother, guardian) triggers oxytocin release, arresting hyperventilation and restoring motor clarity during nighttime distress.
            </p>

            {/* Profile Selector */}
            <div>
              <label className="text-xs font-bold text-[#342422] block mb-1.5">
                Target Guardian Profile:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Sister', 'Mother', 'Guardian Friend'] as const).map((prof) => (
                  <button
                    key={prof}
                    onClick={() => setCloneProfile(prof)}
                    className={`py-2 text-xs rounded-xl font-semibold transition-all border ${
                      cloneProfile === prof
                        ? 'bg-[#E11D48] text-white border-[#E11D48]'
                        : 'bg-[#FFF9F6] text-[#78615E] border-[#FEE2E2] hover:bg-[#FFF1EE]'
                    }`}
                  >
                    {prof}
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Tuning Sliders */}
            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-[#78615E]">Maternal Warmth & Empathy:</span>
                  <span className="font-bold text-[#9F1239]">{warmthSlider}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={warmthSlider}
                  onChange={(e) => setWarmthSlider(parseInt(e.target.value))}
                  className="w-full accent-[#E11D48]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-[#78615E]">Calming Cadence (Slow Pacing):</span>
                  <span className="font-bold text-[#9F1239]">{pacingSlider}% speed</span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="100"
                  value={pacingSlider}
                  onChange={(e) => setPacingSlider(parseInt(e.target.value))}
                  className="w-full accent-[#E11D48]"
                />
              </div>
            </div>

            {/* Test Sample Button */}
            <button
              onClick={() => {
                const sample =
                  cloneProfile === 'Sister'
                    ? "Hey, it's your sister. Keep walking straight towards Gandhi Chowk. I can see your location on the map. You are doing so well, just take another deep breath."
                    : cloneProfile === 'Mother'
                    ? 'Beti, don’t worry, your mother is watching over you. The main market street is bright and safe. Just three minutes more to the shelter.'
                    : 'Stay on the illuminated side of the road. I have the emergency contacts alerted and we are right here.';
                setActiveSpeechText(sample);
                handlePlayVoice();
              }}
              className="w-full py-2.5 rounded-xl bg-[#FFF1EE] border border-[#FECDD3] text-[#9F1239] font-bold text-xs hover:bg-[#FEE2E2] transition-all flex items-center justify-center gap-2"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Preview {cloneProfile}'s Voice Synthesis</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
