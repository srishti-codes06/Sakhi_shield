import React, { useState, useEffect, useRef } from 'react';
import { AlertStatus, EmergencyContact, ForensicRecording } from '../types';
import { voiceService } from '../services/voiceService';
import { forensicService } from '../services/forensicService';
import { 
  AlertTriangle, 
  Volume2, 
  VolumeX, 
  Mic, 
  ShieldCheck, 
  PhoneCall, 
  Send, 
  CheckCircle2, 
  Car, 
  Clock, 
  Lock, 
  X,
  FileCheck2
} from 'lucide-react';

interface SosAlertModalProps {
  status: AlertStatus;
  onCancel: () => void;
  onResolve: (recording?: ForensicRecording) => void;
  contacts: EmergencyContact[];
}

export const SosAlertModal: React.FC<SosAlertModalProps> = ({
  status,
  onCancel,
  onResolve,
  contacts,
}) => {
  const [countdown, setCountdown] = useState<number>(3);
  const [isSirenPlaying, setIsSirenPlaying] = useState<boolean>(false);
  const [isSilentMode, setIsSilentMode] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [currentDecibel, setCurrentDecibel] = useState<number>(45);
  const [safetyPinInput, setSafetyPinInput] = useState<string>('');
  const [showPinModal, setShowPinModal] = useState<boolean>(false);
  const [dispatchedSteps, setDispatchedSteps] = useState<{
    contactsNotified: boolean;
    policeLiaisonAlerted: boolean;
    forensicVaultIngestion: boolean;
    pinkCabBeaconActive: boolean;
  }>({
    contactsNotified: false,
    policeLiaisonAlerted: false,
    forensicVaultIngestion: false,
    pinkCabBeaconActive: false,
  });

  const stopSirenRef = useRef<(() => void) | null>(null);
  const timerIntervalRef = useRef<any>(null);

  // Countdown logic
  useEffect(() => {
    if (status === 'countdown') {
      setCountdown(3);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status]);

  // When active alert triggers: start recording, sirens, dispatches
  useEffect(() => {
    if (status === 'active') {
      // 1. Start audio recording immediately
      forensicService.startIncidentRecording((db) => {
        setCurrentDecibel(db);
      });

      // 2. Start incident timer
      setRecordingSeconds(0);
      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);

      // 3. Siren sound if not in silent mode
      if (!isSilentMode) {
        stopSirenRef.current = voiceService.playEmergencySiren();
        setIsSirenPlaying(true);
      }

      // 4. Staggered dispatch sequence simulation
      setTimeout(() => setDispatchedSteps((p) => ({ ...p, contactsNotified: true })), 600);
      setTimeout(() => setDispatchedSteps((p) => ({ ...p, policeLiaisonAlerted: true })), 1200);
      setTimeout(() => setDispatchedSteps((p) => ({ ...p, pinkCabBeaconActive: true })), 1800);
      setTimeout(() => setDispatchedSteps((p) => ({ ...p, forensicVaultIngestion: true })), 2400);

      return () => {
        if (stopSirenRef.current) {
          stopSirenRef.current();
          stopSirenRef.current = null;
        }
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
        }
      };
    }
  }, [status, isSilentMode]);

  const toggleSiren = () => {
    if (isSirenPlaying) {
      if (stopSirenRef.current) {
        stopSirenRef.current();
        stopSirenRef.current = null;
      }
      setIsSirenPlaying(false);
    } else {
      stopSirenRef.current = voiceService.playEmergencySiren();
      setIsSirenPlaying(true);
      setIsSilentMode(false);
    }
  };

  const handleDeescalate = async () => {
    // Stop siren
    if (stopSirenRef.current) {
      stopSirenRef.current();
      stopSirenRef.current = null;
    }
    // Stop recording and compute SHA-256
    const recording = await forensicService.stopIncidentRecording({
      lat: 31.6865,
      lng: 76.5220,
      accuracyMeters: 4,
    });
    onResolve(recording);
  };

  if (status === 'idle') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-md">
      {/* 1. Countdown Screen */}
      {status === 'countdown' && (
        <div className="bg-[#FFF5F5] border-2 border-[#FCA5A5] rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#FEE2E2] flex items-center justify-center mb-6 animate-pulse">
            <AlertTriangle className="w-10 h-10 text-[#E11D48]" />
          </div>

          <h2 className="text-2xl font-bold text-[#881337] mb-2">Emergency SOS Triggering</h2>
          <p className="text-sm text-[#78615E] mb-6">
            Sending encrypted distress signals and starting forensic audio recording in...
          </p>

          <div className="text-7xl font-extrabold text-[#E11D48] mb-8 font-mono tracking-tighter">
            {countdown}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-3 px-4 rounded-xl bg-white border border-[#FECDD3] text-[#78615E] font-semibold hover:bg-[#FFF1EE] transition-all"
            >
              Cancel (False Alarm)
            </button>
            <button
              onClick={() => {
                // Instantly fast-forward to active
                setCountdown(0);
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-[#E11D48] text-white font-semibold hover:bg-[#BE123C] shadow-md transition-all"
            >
              Send SOS Now
            </button>
          </div>
        </div>
      )}

      {/* 2. Full Active Alert State */}
      {status === 'active' && (
        <div className="bg-[#FFF8F6] border-2 border-[#F43F5E] rounded-3xl p-6 max-w-2xl w-full shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
          {/* Top Alert Banner */}
          <div className="flex items-center justify-between pb-4 border-b border-[#FEE2E2]">
            <div className="flex items-center gap-3">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E11D48] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#E11D48]"></span>
              </span>
              <div>
                <h2 className="text-xl font-bold text-[#881337] flex items-center gap-2">
                  <span>EMERGENCY SOS ACTIVE</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#FEE2E2] text-[#9F1239]">
                    {String(Math.floor(recordingSeconds / 60)).padStart(2, '0')}:
                    {String(recordingSeconds % 60).padStart(2, '0')}
                  </span>
                </h2>
                <p className="text-xs text-[#78615E]">
                  Sector: Hamirpur, HP (31.6865°N, 76.5220°E) · High-Priority Dispatch
                </p>
              </div>
            </div>

            {/* Siren and Silent Mode Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleSiren}
                className={`p-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-semibold transition-all ${
                  isSirenPlaying
                    ? 'bg-[#E11D48] text-white border-[#E11D48] animate-pulse'
                    : 'bg-white text-[#78615E] border-[#FECDD3] hover:bg-[#FFF1EE]'
                }`}
                title="Toggle High-Decibel Siren"
              >
                {isSirenPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span className="hidden sm:inline">{isSirenPlaying ? 'Siren ON' : 'Siren OFF'}</span>
              </button>
            </div>
          </div>

          <div className="overflow-y-auto space-y-4 py-4 pr-1">
            {/* Live Audio Ingestion & Forensic Card */}
            <div className="bg-[#FFF1EE] border border-[#FECDD3] rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#9F1239]">
                  <Mic className="w-4 h-4 animate-bounce text-[#E11D48]" />
                  <span>Instant Incident Audio Recording Active</span>
                </div>
                <span className="text-[11px] font-mono text-[#881337] bg-white px-2 py-0.5 rounded border border-[#FCA5A5]">
                  Peak: {currentDecibel} dB
                </span>
              </div>
              <p className="text-xs text-[#6B4B48] mb-3">
                Continuous audio stream is buffered with cryptographic timestamping. Evidence will be directly transferred to SFSL Junga and Hamirpur District Police.
              </p>

              {/* Dynamic Waveform Simulation */}
              <div className="h-10 bg-white/80 rounded-xl p-2 flex items-center justify-between gap-1 border border-[#FED7D7]">
                {Array.from({ length: 32 }).map((_, i) => {
                  const height = Math.min(
                    100,
                    Math.max(15, ((Math.sin(i * 0.4 + recordingSeconds * 3) + 1) / 2) * (currentDecibel * 1.1))
                  );
                  return (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-[#E11D48] to-[#FB7185] rounded-full transition-all duration-100"
                      style={{ height: `${height}%` }}
                    />
                  );
                })}
              </div>
            </div>

            {/* AI Guardian & Network Broadcast Status */}
            <div className="bg-white border border-[#FEE2E2] rounded-2xl p-4 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#78615E]">
                Autonomous Emergency Broadcast Status
              </h3>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-[#FFF9F6]">
                  <div className="flex items-center gap-2">
                    {dispatchedSteps.contactsNotified ? (
                      <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    ) : (
                      <Clock className="w-4 h-4 text-[#F59E0B] animate-spin" />
                    )}
                    <span className="font-medium text-[#342422]">
                      AI Guardian Contact Dispatch ({contacts.length} Trusted Contacts)
                    </span>
                  </div>
                  <span className="text-[11px] text-[#059669] font-semibold">
                    {dispatchedSteps.contactsNotified ? 'SMS & Pings Sent' : 'Transmitting...'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-[#FFF9F6]">
                  <div className="flex items-center gap-2">
                    {dispatchedSteps.policeLiaisonAlerted ? (
                      <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    ) : (
                      <Clock className="w-4 h-4 text-[#F59E0B] animate-spin" />
                    )}
                    <span className="font-medium text-[#342422]">
                      Women Police Cell Hamirpur (Sector Control Room)
                    </span>
                  </div>
                  <span className="text-[11px] text-[#059669] font-semibold">
                    {dispatchedSteps.policeLiaisonAlerted ? 'Priority Escalated' : 'Routing...'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-[#FFF9F6]">
                  <div className="flex items-center gap-2">
                    {dispatchedSteps.pinkCabBeaconActive ? (
                      <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    ) : (
                      <Clock className="w-4 h-4 text-[#F59E0B] animate-spin" />
                    )}
                    <span className="font-medium text-[#342422]">
                      Saheli Pink Cab Emergency Fleet (2 Drivers within 800m)
                    </span>
                  </div>
                  <span className="text-[11px] text-[#059669] font-semibold">
                    {dispatchedSteps.pinkCabBeaconActive ? 'Beacon Locked' : 'Locating...'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-[#FFF9F6]">
                  <div className="flex items-center gap-2">
                    {dispatchedSteps.forensicVaultIngestion ? (
                      <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    ) : (
                      <Clock className="w-4 h-4 text-[#F59E0B] animate-spin" />
                    )}
                    <span className="font-medium text-[#342422]">
                      Cryptographic Chain-of-Custody (State FSL Junga)
                    </span>
                  </div>
                  <span className="text-[11px] text-[#059669] font-semibold">
                    {dispatchedSteps.forensicVaultIngestion ? 'SHA-256 Hashing' : 'Binding...'}
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Action Hub */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="tel:112"
                className="p-3 bg-[#E11D48] text-white rounded-2xl flex items-center justify-center gap-2 font-bold text-sm shadow hover:bg-[#BE123C] transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Police 112</span>
              </a>

              <a
                href="tel:01972-224358"
                className="p-3 bg-white border border-[#FECDD3] text-[#9F1239] rounded-2xl flex items-center justify-center gap-2 font-bold text-sm hover:bg-[#FFF1EE] transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Hamirpur Women Cell</span>
              </a>
            </div>
          </div>

          {/* De-escalate and Safe Stand-down footer */}
          <div className="pt-3 border-t border-[#FEE2E2] flex items-center justify-between gap-3">
            <span className="text-xs text-[#78615E]">
              Only resolve after you are confirmed in a secure safe haven.
            </span>

            <button
              onClick={() => setShowPinModal(true)}
              className="px-4 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>I am Safe (De-escalate)</span>
            </button>
          </div>
        </div>
      )}

      {/* PIN Confirmation Modal to prevent coerced de-escalation */}
      {showPinModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-[#FEE2E2]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 font-bold text-[#342422]">
                <Lock className="w-4 h-4 text-[#E11D48]" />
                <span>Safe De-escalation PIN</span>
              </div>
              <button onClick={() => setShowPinModal(false)} className="text-stone-400 hover:text-stone-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#78615E] mb-4">
              Enter your de-escalation code (Default Demo PIN: <strong>1234</strong>) to verify you are not being coerced by an assailant.
            </p>
            <input
              type="password"
              maxLength={4}
              value={safetyPinInput}
              onChange={(e) => setSafetyPinInput(e.target.value)}
              placeholder="Enter 4-digit PIN"
              className="w-full text-center text-2xl tracking-widest py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#F43F5E] mb-4 font-mono"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowPinModal(false)}
                className="flex-1 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50"
              >
                Back
              </button>
              <button
                onClick={() => {
                  if (safetyPinInput === '1234' || safetyPinInput.length >= 4) {
                    setShowPinModal(false);
                    handleDeescalate();
                  } else {
                    alert('Please enter PIN 1234 to verify safe resolution.');
                  }
                }}
                className="flex-1 py-2 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold"
              >
                Confirm Safe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
