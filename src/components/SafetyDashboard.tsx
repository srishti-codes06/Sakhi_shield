import React, { useState } from 'react';
import { EmergencyContact } from '../types';
import { 
  AlertTriangle, 
  Shield, 
  Users, 
  Bot, 
  MapPin, 
  PhoneCall, 
  Plus, 
  Trash2, 
  Check, 
  Send, 
  Radio, 
  Volume2, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  HeartHandshake
} from 'lucide-react';

interface SafetyDashboardProps {
  onTriggerSos: () => void;
  contacts: EmergencyContact[];
  onAddContact: (contact: EmergencyContact) => void;
  onRemoveContact: (id: string) => void;
  onToggleAiGuardian: (id: string) => void;
  onNavigateToMap: () => void;
  onNavigateToVoice: () => void;
}

export const SafetyDashboard: React.FC<SafetyDashboardProps> = ({
  onTriggerSos,
  contacts,
  onAddContact,
  onRemoveContact,
  onToggleAiGuardian,
  onNavigateToMap,
  onNavigateToVoice,
}) => {
  const [isPressingSos, setIsPressingSos] = useState<boolean>(false);
  const [pressProgress, setPressProgress] = useState<number>(0);
  const [isSilentSosToggled, setIsSilentSosToggled] = useState<boolean>(false);
  const [newContactName, setNewContactName] = useState<string>('');
  const [newContactPhone, setNewContactPhone] = useState<string>('');
  const [newContactRelation, setNewContactRelation] = useState<string>('Sister');
  const [showAddContactForm, setShowAddContactForm] = useState<boolean>(false);
  const [copiedPayloadId, setCopiedPayloadId] = useState<string | null>(null);

  // Hold-to-trigger timer
  const pressTimerRef = React.useRef<any>(null);

  const startSosPress = () => {
    setIsPressingSos(true);
    setPressProgress(0);
    const startTime = Date.now();
    const duration = 1500; // 1.5 seconds hold

    pressTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.round((elapsed / duration) * 100));
      setPressProgress(progress);
      if (progress >= 100) {
        clearInterval(pressTimerRef.current);
        setIsPressingSos(false);
        setPressProgress(0);
        onTriggerSos();
      }
    }, 30);
  };

  const endSosPress = () => {
    if (pressTimerRef.current) {
      clearInterval(pressTimerRef.current);
      pressTimerRef.current = null;
    }
    setIsPressingSos(false);
    setPressProgress(0);
  };

  const generateSharePayload = (contact: EmergencyContact) => {
    const text = `🚨 [EMERGENCY ALERT via AbhayaSetu]
Dear ${contact.name}, I may need immediate assistance!
📍 My Current Location: Gandhi Chowk, Hamirpur, HP (31.6865°N, 76.5220°E)
🗺️ Live Track: https://maps.google.com/?q=31.6865,76.5220
🔋 Battery: 88% | Sector: Sadar Police Hamirpur
AI Guardian is continuously recording forensic audio.`;
    navigator.clipboard.writeText(text);
    setCopiedPayloadId(contact.id);
    setTimeout(() => setCopiedPayloadId(null), 3000);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName || !newContactPhone) return;
    const newContact: EmergencyContact = {
      id: `c-${Date.now()}`,
      name: newContactName,
      phone: newContactPhone,
      relation: newContactRelation,
      isAiGuardianEnabled: true,
      priority: 1,
    };
    onAddContact(newContact);
    setNewContactName('');
    setNewContactPhone('');
    setShowAddContactForm(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Warm Pastel Hero Section with Central SOS Control */}
      <section className="bg-gradient-to-b from-[#FFF5F2] via-[#FFF8F6] to-[#FFFBF9] rounded-3xl p-6 md:p-8 border border-[#FED7D7] shadow-xs relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#FFE4E6]/40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-[#FEF3C7]/40 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#FEE2E2] text-xs font-semibold text-[#9F1239] mb-4 shadow-2xs">
            <Shield className="w-3.5 h-3.5 text-[#E11D48]" />
            <span>24/7 Shield Active · Hamirpur District Emergency Node</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-[#342422] font-serif tracking-tight mb-2">
            Your Shield of Safety & Instant Sanctuary
          </h2>
          <p className="text-sm text-[#78615E] max-w-xl mb-8 leading-relaxed">
            Press and hold the button for 1.5 seconds to trigger encrypted distress dispatch to loved ones, police, verified volunteers, and start forensic audio preservation.
          </p>

          {/* Tactical SOS Button Core */}
          <div className="relative flex flex-col items-center justify-center my-2">
            {/* Pulsing Aura */}
            <div className="absolute w-56 h-56 rounded-full bg-[#FFE4E6] animate-pulse-ring pointer-events-none" />
            <div className="absolute w-44 h-44 rounded-full bg-[#FECDD3] opacity-50 pointer-events-none" />

            {/* Circular Progress Ring */}
            <svg className="w-48 h-48 -rotate-90 pointer-events-none absolute" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="44"
                stroke="#FED7D7"
                strokeWidth="5"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                stroke="#E11D48"
                strokeWidth="5"
                strokeDasharray="276"
                strokeDashoffset={276 - (276 * pressProgress) / 100}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-75"
              />
            </svg>

            {/* SOS Interactive Button */}
            <button
              onMouseDown={startSosPress}
              onMouseUp={endSosPress}
              onTouchStart={startSosPress}
              onTouchEnd={endSosPress}
              onClick={onTriggerSos}
              className={`relative z-10 w-36 h-36 rounded-full font-extrabold text-white flex flex-col items-center justify-center shadow-xl transition-all duration-200 select-none cursor-pointer ${
                isPressingSos
                  ? 'scale-95 bg-[#BE123C] ring-4 ring-[#FDA4AF]'
                  : 'bg-gradient-to-tr from-[#E11D48] via-[#F43F5E] to-[#FB7185] hover:scale-102 hover:shadow-2xl active:scale-95'
              }`}
            >
              <AlertTriangle className="w-9 h-9 mb-1 text-white animate-bounce" />
              <span className="text-xl tracking-wider font-mono">SOS</span>
              <span className="text-[10px] font-medium opacity-90">
                {isPressingSos ? `${pressProgress}%` : 'Hold 1.5s / Tap'}
              </span>
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs">
            <button
              onClick={() => setIsSilentSosToggled(!isSilentSosToggled)}
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 transition-all ${
                isSilentSosToggled
                  ? 'bg-[#EDE9FE] border-[#C4B5FD] text-[#6B21A8] font-semibold'
                  : 'bg-white border-[#FEE2E2] text-[#78615E] hover:bg-[#FFF1EE]'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>{isSilentSosToggled ? 'Silent Mode Armed (Discreet)' : 'Silent Mode: OFF'}</span>
            </button>

            <button
              onClick={onNavigateToVoice}
              className="px-3 py-1.5 rounded-xl bg-white border border-[#FEE2E2] text-[#9F1239] hover:bg-[#FFF1EE] flex items-center gap-2 font-medium transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F43F5E]" />
              <span>Start ElevenLabs Voice Route Companion</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#D1A6A0]" />
            </button>
          </div>
        </div>
      </section>

      {/* Grid: Trusted Contacts & AI Digital Twin Connection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Trusted Contacts (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-[#FEE2E2] shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#FFF1EE] flex items-center justify-center text-[#E11D48]">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-[#342422] text-base">Trusted Emergency Contacts</h3>
                  <p className="text-xs text-[#78615E]">
                    Recipients of one-tap GPS pings, live audio streams, and automated AI check-ins
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowAddContactForm(!showAddContactForm)}
                className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#FFF1EE] hover:bg-[#FEE2E2] text-[#9F1239] transition-all flex items-center gap-1 border border-[#FECDD3]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Contact</span>
              </button>
            </div>

            {/* Add Contact Form */}
            {showAddContactForm && (
              <form onSubmit={handleAddSubmit} className="mb-4 p-4 rounded-2xl bg-[#FFF9F6] border border-[#FED7D7] space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    className="px-3 py-2 text-xs rounded-xl border border-[#FEE2E2] bg-white focus:outline-none focus:ring-2 focus:ring-[#F43F5E]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone / WhatsApp"
                    value={newContactPhone}
                    onChange={(e) => setNewContactPhone(e.target.value)}
                    className="px-3 py-2 text-xs rounded-xl border border-[#FEE2E2] bg-white focus:outline-none focus:ring-2 focus:ring-[#F43F5E]"
                  />
                  <select
                    value={newContactRelation}
                    onChange={(e) => setNewContactRelation(e.target.value)}
                    className="px-3 py-2 text-xs rounded-xl border border-[#FEE2E2] bg-white focus:outline-none focus:ring-2 focus:ring-[#F43F5E]"
                  >
                    <option value="Sister">Sister</option>
                    <option value="Mother">Mother</option>
                    <option value="Father">Father</option>
                    <option value="Brother">Brother</option>
                    <option value="Friend">Friend</option>
                    <option value="Hostel Warden">Hostel Warden</option>
                    <option value="Colleague">Colleague</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddContactForm(false)}
                    className="px-3 py-1.5 text-xs rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold rounded-xl bg-[#E11D48] text-white hover:bg-[#BE123C]"
                  >
                    Save Contact
                  </button>
                </div>
              </form>
            )}

            {/* Contact Cards List */}
            <div className="space-y-3">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="p-3.5 rounded-2xl bg-[#FFFBF9] border border-[#FEE2E2] flex items-center justify-between gap-3 hover:border-[#FCA5A5] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#FFE4E6] flex items-center justify-center font-bold text-xs text-[#9F1239]">
                      {contact.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[#342422]">{contact.name}</span>
                        <span className="text-[11px] text-[#78615E]">({contact.relation})</span>
                        {contact.isAiGuardianEnabled && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#EDE9FE] text-[#6B21A8] font-medium flex items-center gap-0.5">
                            <Bot className="w-2.5 h-2.5" /> AI Twin Sync
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#8C6D68]">{contact.phone}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => generateSharePayload(contact)}
                      className="px-2.5 py-1.5 rounded-xl border border-[#FECDD3] bg-white hover:bg-[#FFF1EE] text-[11px] font-medium text-[#9F1239] transition-all flex items-center gap-1"
                      title="Generate pre-formatted emergency dispatch text"
                    >
                      {copiedPayloadId === contact.id ? (
                        <>
                          <Check className="w-3 h-3 text-[#059669]" />
                          <span className="text-[#059669]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3 h-3" />
                          <span>Dispatch Ping</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onToggleAiGuardian(contact.id)}
                      className={`p-1.5 rounded-xl border transition-all text-xs ${
                        contact.isAiGuardianEnabled
                          ? 'bg-[#EDE9FE] text-[#6B21A8] border-[#C4B5FD]'
                          : 'bg-white text-stone-400 border-stone-200 hover:text-stone-700'
                      }`}
                      title="Toggle AI Guardian Autonomous Responder"
                    >
                      <Bot className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onRemoveContact(contact.id)}
                      className="p-1.5 rounded-xl text-stone-400 hover:text-[#E11D48] hover:bg-[#FFF1EE] transition-all"
                      title="Remove contact"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Safe Haven Highlight for Hamirpur */}
          <div className="p-4 rounded-3xl bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-[#FEF3C7] flex items-center justify-center text-[#B45309]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#78350F]">Nearest Verified Safe Haven in Hamirpur</h4>
                <p className="text-[11px] text-[#92400E]">
                  Sanjeevani Medicos & Police Aid Booth (Gandhi Chowk) · 140m away · Open 24/7
                </p>
              </div>
            </div>
            <button
              onClick={onNavigateToMap}
              className="px-3 py-1.5 rounded-xl bg-white border border-[#FDE68A] text-[#92400E] font-semibold text-xs hover:bg-[#FEF3C7] transition-all"
            >
              View Route
            </button>
          </div>
        </div>

        {/* Right Column: AI Version of Your Connections (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-[#FEE2E2] shadow-xs">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-[#EDE9FE] flex items-center justify-center text-[#7C3AED]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-[#342422] text-base">AI Digital Twin Guardian</h3>
                <p className="text-xs text-[#78615E]">Autonomous agent standing by for your circle</p>
              </div>
            </div>

            <p className="text-xs text-[#6B4B48] mb-4 leading-relaxed bg-[#FAF5FF] p-3 rounded-2xl border border-[#E9D5FF]">
              If you trigger an alert while your contacts are sleeping or driving, your <strong>AI Guardian Agent</strong> immediately synthesizes telemetry, relays real-time incident transcripts, and wakes their devices with priority override.
            </p>

            {/* Live Simulation Feed */}
            <div className="space-y-2.5 text-xs font-sans">
              <div className="p-3 rounded-xl bg-[#FFF9F6] border border-[#FEE2E2]">
                <div className="flex items-center justify-between text-[11px] text-[#9F1239] font-semibold mb-1">
                  <span>Victim's AI Agent</span>
                  <span>10:14 PM · Hamirpur Node</span>
                </div>
                <p className="text-[#342422]">
                  "Priya's location is near Gandhi Chowk. Ambient noise: 52 dB. Walking pace: 4.1 km/h. Checking ahead for streetlight coverage along Anu Road."
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#F5F3FF] border border-[#DDD6FE]">
                <div className="flex items-center justify-between text-[11px] text-[#6B21A8] font-semibold mb-1">
                  <span>Sister Neha's AI Guardian</span>
                  <span>10:14 PM · Auto-Sync</span>
                </div>
                <p className="text-[#342422]">
                  "Acknowledged. Neha is sleeping. Activating high-priority bypass ringtone. Pre-alerting Saheli Pink Cab Driver Sunita (HP-22-B-4412)."
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0]">
                <div className="flex items-center justify-between text-[11px] text-[#15803D] font-semibold mb-1">
                  <span>Volunteer Network AI</span>
                  <span>10:15 PM · Volunteer Grid</span>
                </div>
                <p className="text-[#342422]">
                  "Akanksha (NIT Student Marshal) is 280m away at Gate 2. Ready to escort if SOS elevates."
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#FEE2E2] flex items-center justify-between text-xs">
              <span className="text-[#78615E]">Agent Health: Operational</span>
              <span className="text-[#059669] font-semibold">Latency: 42ms</span>
            </div>
          </div>

          {/* Quick Authority Liaison Card */}
          <div className="bg-gradient-to-br from-[#FFF1EE] to-[#FFE4E6] p-5 rounded-3xl border border-[#FECDD3] text-xs space-y-2.5">
            <h4 className="font-bold text-[#881337] flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#E11D48]" />
              <span>Hamirpur Police Liaison Quick Links</span>
            </h4>
            <div className="space-y-1.5 text-[#655250]">
              <div className="flex justify-between items-center bg-white/70 p-2 rounded-xl">
                <span>Women Police Cell Hamirpur</span>
                <a href="tel:01972-224358" className="font-bold text-[#E11D48] hover:underline">
                  01972-224358
                </a>
              </div>
              <div className="flex justify-between items-center bg-white/70 p-2 rounded-xl">
                <span>Sadar Police Station Hamirpur</span>
                <a href="tel:01972-222434" className="font-bold text-[#E11D48] hover:underline">
                  01972-222434
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
