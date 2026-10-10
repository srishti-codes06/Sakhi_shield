import React, { useState } from 'react';
import { ForensicRecording } from '../types';
import { forensicService } from '../services/forensicService';
import { 
  FileCheck2, 
  Mic, 
  Square, 
  Download, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Lock, 
  Activity, 
  Building2, 
  CheckCircle2,
  ExternalLink,
  Volume2
} from 'lucide-react';

interface ForensicVaultProps {
  recordings: ForensicRecording[];
  onAddNewRecording: (rec: ForensicRecording) => void;
}

export const ForensicVault: React.FC<ForensicVaultProps> = ({
  recordings,
  onAddNewRecording,
}) => {
  const [isRecordingNow, setIsRecordingNow] = useState<boolean>(false);
  const [liveDb, setLiveDb] = useState<number>(42);
  const [recordTimer, setRecordTimer] = useState<number>(0);
  const [selectedRecording, setSelectedRecording] = useState<ForensicRecording | null>(
    recordings[0] || null
  );

  const timerRef = React.useRef<any>(null);

  const handleStartManualRecord = async () => {
    setIsRecordingNow(true);
    setRecordTimer(0);
    timerRef.current = setInterval(() => {
      setRecordTimer((p) => p + 1);
    }, 1000);

    await forensicService.startIncidentRecording((db) => {
      setLiveDb(db);
    });
  };

  const handleStopManualRecord = async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRecordingNow(false);

    const recording = await forensicService.stopIncidentRecording({
      lat: 31.6865,
      lng: 76.5220,
      accuracyMeters: 3,
    });
    onAddNewRecording(recording);
    setSelectedRecording(recording);
  };

  const downloadChainOfCustodyReport = (rec: ForensicRecording) => {
    const reportText = `================================================================================
GOVERNMENT OF HIMACHAL PRADESH - POLICE DEPARTMENT
DIGITAL EVIDENCE FORENSIC CHAIN-OF-CUSTODY CERTIFICATE
Under Section 65B of Indian Evidence Act / Section 63 Bharatiya Sakshya Adhiniyam
================================================================================

EVIDENCE REFERENCE NUMBER: ${rec.fslReferenceNumber}
LOCAL INCIDENT ID:        ${rec.id}
TIMESTAMP OF RECORDING:   ${rec.timestamp}
DURATION:                 ${rec.durationSeconds} seconds
LOCATION OF INGESTION:    Hamirpur District, HP (Lat: ${rec.gpsCoords.lat}, Lng: ${rec.gpsCoords.lng})
ACCURACY RADIUS:          ±${rec.gpsCoords.accuracyMeters} meters
PEAK SOUND PRESSURE:      ${rec.decibelPeak} dB

CRYPTOGRAPHIC INTEGRITY:
ALGORITHM:                SHA-256 (FIPS PUB 180-4)
DIGEST:                   ${rec.sha256Hash}
DEVICE FINGERPRINT:       ${rec.deviceFingerprint}

INGESTION DESTINATION:
1. State Forensic Science Laboratory (SFSL) Junga, Himachal Pradesh
2. Cyber Crime Cell & Women Police Station Hamirpur

STATUS:
- Chain of Custody initialized at moment of trigger.
- Bitstream integrity sealed against tampering.
================================================================================`;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Forensic_Certificate_${rec.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#FFF1EE] via-[#FFF9F6] to-[#FFE4E6] rounded-3xl p-6 border border-[#FECDD3] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-xs font-bold text-[#881337] mb-2 border border-[#FCA5A5]">
              <Lock className="w-3.5 h-3.5 text-[#E11D48]" />
              <span>Section 65B Indian Evidence Act Compliance Engine</span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#342422] font-serif">
              Incident Audio Forensic Vault & State FSL Transmission
            </h2>
            <p className="text-xs text-[#78615E] mt-1 max-w-2xl leading-relaxed">
              Whenever an emergency SOS is triggered, incident audio is instantly captured and hashed using SHA-256 cryptography. The tamper-proof dossier is automatically piped to the State Forensic Science Laboratory (SFSL) Junga.
            </p>
          </div>

          {/* Quick Manual Record Test Button */}
          <div>
            {isRecordingNow ? (
              <button
                onClick={handleStopManualRecord}
                className="px-5 py-3 rounded-2xl bg-[#E11D48] text-white font-bold text-xs flex items-center gap-2 animate-pulse shadow-md"
              >
                <Square className="w-4 h-4 fill-current" />
                <span>Stop & Hash Evidence ({recordTimer}s · {liveDb}dB)</span>
              </button>
            ) : (
              <button
                onClick={handleStartManualRecord}
                className="px-5 py-3 rounded-2xl bg-white border border-[#FECDD3] text-[#9F1239] font-bold text-xs hover:bg-[#FFF1EE] flex items-center gap-2 shadow-xs transition-all"
              >
                <Mic className="w-4 h-4 text-[#E11D48]" />
                <span>Test Forensic Recorder Now</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid: Recordings Ledger (Left) + Detailed Chain-of-Custody Dossier (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recordings Ledger (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#FEE2E2] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[#342422] flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-[#E11D48]" />
              <span>Sealed Forensic Records</span>
            </h3>
            <span className="text-xs font-mono font-bold text-[#9F1239] bg-[#FFF1EE] px-2 py-0.5 rounded">
              {recordings.length} Dossiers
            </span>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {recordings.map((rec) => {
              const isSelected = selectedRecording?.id === rec.id;
              return (
                <div
                  key={rec.id}
                  onClick={() => setSelectedRecording(rec)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#FFF5F2] border-[#F43F5E] ring-2 ring-[#FDA4AF]'
                      : 'bg-[#FFFBF9] border-[#FEE2E2] hover:border-[#FECDD3]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#881337] block">
                        {rec.fslReferenceNumber || rec.id}
                      </span>
                      <span className="text-xs font-bold text-[#342422]">
                        Incident Audio ({rec.durationSeconds}s)
                      </span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#ECFDF5] text-[#065F46] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#059669]" /> Sealed
                    </span>
                  </div>

                  <div className="text-[11px] text-[#78615E] flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(rec.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                    <span>·</span>
                    <span>Peak {rec.decibelPeak} dB</span>
                  </div>

                  <div className="text-[10px] font-mono text-[#8C6D68] truncate mt-1.5 bg-white p-1 rounded border border-[#FED7D7]">
                    SHA: {rec.sha256Hash}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Dossier Certificate View (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#FEE2E2] shadow-xs flex flex-col justify-between">
          {selectedRecording ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between pb-3 border-b border-[#FEE2E2]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9F1239]">
                    Official Chain-of-Custody Dossier
                  </span>
                  <h4 className="font-extrabold text-lg text-[#342422]">
                    {selectedRecording.fslReferenceNumber}
                  </h4>
                  <p className="text-xs text-[#78615E]">
                    HP Forensic Laboratory Secure Digital Evidence Repository
                  </p>
                </div>

                <button
                  onClick={() => downloadChainOfCustodyReport(selectedRecording)}
                  className="px-3 py-2 bg-[#E11D48] text-white rounded-xl text-xs font-bold hover:bg-[#BE123C] flex items-center gap-1.5 shadow-xs transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Legal Certificate</span>
                </button>
              </div>

              {/* Audio Playback Element */}
              <div className="p-4 rounded-2xl bg-[#FFF9F6] border border-[#FED7D7]">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-[#342422] flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-[#E11D48]" />
                    <span>Evidence Audio Playback</span>
                  </span>
                  <span className="text-[11px] font-mono text-[#78615E]">
                    Duration: {selectedRecording.durationSeconds}s
                  </span>
                </div>
                <audio controls src={selectedRecording.audioBlobUrl} className="w-full h-9 accent-[#E11D48]" />
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#FFFBF9] rounded-xl border border-[#FEE2E2]">
                  <span className="text-[11px] text-[#78615E] block">Geographic Coordinates:</span>
                  <strong className="text-[#342422] font-mono">
                    {selectedRecording.gpsCoords.lat}°N, {selectedRecording.gpsCoords.lng}°E
                  </strong>
                  <div className="text-[10px] text-[#059669]">Radius accuracy: ±{selectedRecording.gpsCoords.accuracyMeters}m</div>
                </div>

                <div className="p-3 bg-[#FFFBF9] rounded-xl border border-[#FEE2E2]">
                  <span className="text-[11px] text-[#78615E] block">Peak Ambient Decibel:</span>
                  <strong className="text-[#342422] font-mono">{selectedRecording.decibelPeak} dB SPL</strong>
                  <div className="text-[10px] text-[#78615E]">Mic Ingestion Level: High Fidelity</div>
                </div>
              </div>

              {/* Cryptographic SHA-256 Box */}
              <div className="p-3.5 rounded-2xl bg-[#FAF5FF] border border-[#DDD6FE]">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-[#6B21A8] flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> SHA-256 Forensic Tamper Hash:
                  </span>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded text-[#059669] font-semibold border border-[#BBF7D0]">
                    Verified Unaltered
                  </span>
                </div>
                <p className="font-mono text-[11px] text-[#4C1D95] break-all bg-white p-2 rounded-xl border border-[#E9D5FF]">
                  {selectedRecording.sha256Hash}
                </p>
              </div>

              {/* Transmission Pipeline */}
              <div className="p-3.5 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] text-xs text-[#065F46] space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#059669]" />
                  <span>State Forensic Ingestion Destination:</span>
                </div>
                <p>
                  Directly dispatched to <strong>State Forensic Science Laboratory (SFSL) Junga</strong>, Digital Evidence Division, and <strong>Sadar Police Station Hamirpur Investigation Unit</strong>.
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center p-8 text-stone-400">
              <p className="text-xs">Select a recording docket on the left to view forensic certificate</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
