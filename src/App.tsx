import React, { useState } from 'react';
import { AlertStatus, EmergencyContact, ForensicRecording } from './types';
import { Header } from './components/Header';
import { SafetyDashboard } from './components/SafetyDashboard';
import { HamirpurMap } from './components/HamirpurMap';
import { PinkCabsTransport } from './components/PinkCabsTransport';
import { VoiceNavigator } from './components/VoiceNavigator';
import { CyberSecurityCenter } from './components/CyberSecurityCenter';
import { PocsoLegalHub } from './components/PocsoLegalHub';
import { ForensicVault } from './components/ForensicVault';
import { SosAlertModal } from './components/SosAlertModal';

const INITIAL_CONTACTS: EmergencyContact[] = [
  {
    id: 'c-1',
    name: 'Neha Sharma',
    phone: '+91 98160 12345',
    relation: 'Sister',
    isAiGuardianEnabled: true,
    priority: 1,
  },
  {
    id: 'c-2',
    name: 'Suman Devi',
    phone: '+91 94180 54321',
    relation: 'Mother',
    isAiGuardianEnabled: true,
    priority: 1,
  },
  {
    id: 'c-3',
    name: 'Dr. Archana Katoch',
    phone: '+91 98821 77654',
    relation: 'Hostel Warden (NIT)',
    isAiGuardianEnabled: true,
    priority: 2,
  },
];

const INITIAL_RECORDINGS: ForensicRecording[] = [
  {
    id: 'FSL-HP-920411-401',
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    durationSeconds: 14,
    audioBlobUrl: '',
    sha256Hash: '4a8b792d6e3c0b1158a5e8486981cfd33261775a909fc72e817be08762d08a9c',
    gpsCoords: { lat: 31.6865, lng: 76.5220, accuracyMeters: 3 },
    decibelPeak: 78,
    deviceFingerprint: 'DEV-ARM-X86-HAMIRPUR-HP22-9204',
    dispatchedToFsl: true,
    fslReferenceNumber: 'HP-FSL-JUNGA-2026-92041',
    incidentNotes: 'Automated test dispatch triggered near Gandhi Chowk, Hamirpur sector.',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [sosStatus, setSosStatus] = useState<AlertStatus>('idle');
  const [contacts, setContacts] = useState<EmergencyContact[]>(INITIAL_CONTACTS);
  const [recordings, setRecordings] = useState<ForensicRecording[]>(INITIAL_RECORDINGS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleTriggerSos = () => {
    setSosStatus('countdown');
  };

  const handleQuickSos = () => {
    // If idle, start countdown
    if (sosStatus === 'idle') {
      setSosStatus('countdown');
    } else {
      setSosStatus('idle');
    }
  };

  const handleCancelSos = () => {
    setSosStatus('idle');
    showToast('Emergency SOS cancelled (Marked as False Alarm).');
  };

  const handleResolveSos = (newRecording?: ForensicRecording) => {
    setSosStatus('idle');
    if (newRecording) {
      setRecordings((prev) => [newRecording, ...prev]);
      showToast('Incident de-escalated. Cryptographic forensic dossier saved & transferred to State FSL.');
    } else {
      showToast('Emergency alert de-escalated safely.');
    }
  };

  const handleAddContact = (contact: EmergencyContact) => {
    setContacts((prev) => [contact, ...prev]);
    showToast(`Added ${contact.name} to trusted emergency circle.`);
  };

  const handleRemoveContact = (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
    showToast('Contact removed.');
  };

  const handleToggleAiGuardian = (id: string) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isAiGuardianEnabled: !c.isAiGuardianEnabled } : c))
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF9F6] text-[#2D2424] flex flex-col font-sans selection:bg-[#FEE2E2] selection:text-[#9F1239]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#342422] text-white text-xs px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-stone-700 animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onQuickSosTrigger={handleQuickSos}
        isSosActive={sosStatus === 'active'}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {activeTab === 'dashboard' && (
          <SafetyDashboard
            onTriggerSos={handleTriggerSos}
            contacts={contacts}
            onAddContact={handleAddContact}
            onRemoveContact={handleRemoveContact}
            onToggleAiGuardian={handleToggleAiGuardian}
            onNavigateToMap={() => setActiveTab('map')}
            onNavigateToVoice={() => setActiveTab('voice')}
          />
        )}

        {activeTab === 'map' && <HamirpurMap />}

        {activeTab === 'cabs' && <PinkCabsTransport />}

        {activeTab === 'voice' && <VoiceNavigator />}

        {activeTab === 'cyber' && <CyberSecurityCenter />}

        {activeTab === 'pocso' && <PocsoLegalHub />}

        {activeTab === 'forensic' && (
          <ForensicVault
            recordings={recordings}
            onAddNewRecording={(rec) => {
              setRecordings((prev) => [rec, ...prev]);
              showToast('New forensic recording added and hashed.');
            }}
          />
        )}
      </main>

      {/* SOS Active / Countdown Overlay Modal */}
      <SosAlertModal
        status={sosStatus}
        onCancel={handleCancelSos}
        onResolve={handleResolveSos}
        contacts={contacts}
      />

      {/* Footer */}
      <footer className="bg-[#FFF1EE] border-t border-[#FED7D7] py-6 px-4 text-xs text-[#78615E] mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <div className="font-bold text-[#342422] font-serif">
              AbhayaSetu (अभय सेतु) · Women's Real-Time Safety & Crisis Response Network
            </div>
            <div className="text-[11px] text-[#8C6D68] mt-0.5">
              Sector: Hamirpur, Himachal Pradesh (Gandhi Chowk · NIT Hamirpur · Salasi Corridor)
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <span>Helpline: <strong>112</strong> (Police)</span>
            <span>·</span>
            <span>Women HP: <strong>181</strong></span>
            <span>·</span>
            <span>POCSO Childline: <strong>1098</strong></span>
            <span>·</span>
            <span>Cybercrime: <strong>1930</strong></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
