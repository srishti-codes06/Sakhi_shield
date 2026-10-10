import React, { useState } from 'react';
import { DeepfakeScanResult, FakeCallScanResult } from '../types';
import { analyzeMorphedImage, analyzeSuspiciousCall } from '../services/aiService';
import { 
  ShieldAlert, 
  PhoneOff, 
  FileWarning, 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  Sparkles, 
  Lock, 
  ExternalLink, 
  Copy, 
  Check, 
  Scale,
  Cpu
} from 'lucide-react';

export const CyberSecurityCenter: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'morphing' | 'fakecall' | 'takedown'>('morphing');

  // Morphing scanner state
  const [morphingImageDesc, setMorphingImageDesc] = useState<string>(
    'Suspicious image received on WhatsApp showing face swapped onto explicit photograph with blurred jawline boundary and missing camera EXIF metadata.'
  );
  const [isScanningImage, setIsScanningImage] = useState<boolean>(false);
  const [deepfakeResult, setDeepfakeResult] = useState<DeepfakeScanResult | null>(null);

  // Fake call detector state
  const [callTranscript, setCallTranscript] = useState<string>(
    'This is Inspector Vikram from Crime Branch. We have seized a parcel from Hamirpur containing narcotics linked to your Aadhaar card. You are placed under Digital Arrest on Skype. Transfer ₹60,000 to the verification vault immediately or local police will raid your residence in 15 minutes.'
  );
  const [isScanningCall, setIsScanningCall] = useState<boolean>(false);
  const [fakeCallResult, setFakeCallResult] = useState<FakeCallScanResult | null>(null);

  const [copiedDraft, setCopiedDraft] = useState<boolean>(false);

  const handleScanMorphing = async () => {
    setIsScanningImage(true);
    try {
      const result = await analyzeMorphedImage(morphingImageDesc);
      setDeepfakeResult(result);
    } finally {
      setIsScanningImage(false);
    }
  };

  const handleScanCall = async () => {
    setIsScanningCall(true);
    try {
      const result = await analyzeSuspiciousCall(callTranscript);
      setFakeCallResult(result);
    } finally {
      setIsScanningCall(false);
    }
  };

  const copyLegalNoticeDraft = () => {
    const text = `URGENT TAKEDOWN NOTICE UNDER RULE 3(2)(b) OF THE INFORMATION TECHNOLOGY RULES, 2021
To: Grievance Officer
Subject: Mandatory 24-Hour Removal of Non-Consensual Morphed/Intimate Image

Dear Grievance Officer,
I am writing to formally report an unauthorized, artificially morphed and non-consensual deepfake image published on your platform.
Under Rule 3(2)(b) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, intermediaries are legally mandated to disable access to non-consensual morphed or intimate material within 24 hours of receipt of notice.
This act also constitutes offenses under Section 66E, 67, and 67A of the Information Technology Act, 2000, and Section 354C of Bharatiya Nyaya Sanhita.

Please immediately preserve server logs and remove the contested content to prevent further dissemination.`;
    navigator.clipboard.writeText(text);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#FFF1EE] via-[#FAF5FF] to-[#FFF5F2] rounded-3xl p-6 border border-[#E9D5FF] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-xs font-bold text-[#6B21A8] mb-2 border border-[#DDD6FE]">
              <Cpu className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span>Gemma & Gemini AI Cyber Defense Protocol</span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#342422] font-serif">
              Cybersecurity: Deepfake Morphing & Extortion Call Defense
            </h2>
            <p className="text-xs text-[#78615E] mt-1 max-w-2xl leading-relaxed">
              Detect AI face-swapped morphing, unmask extortion schemes like "Digital Arrest" scams and voice cloning fraud, and file instant 1930 Cyber Crime complaints.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/80 p-3 rounded-2xl border border-[#FED7D7]">
            <ShieldAlert className="w-8 h-8 text-[#E11D48]" />
            <div>
              <div className="text-xs font-bold text-[#342422]">National Cyber Helpline</div>
              <div className="text-xs font-mono font-bold text-[#E11D48]">Dial 1930 (Toll-Free)</div>
            </div>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-[#FEE2E2]">
          <button
            onClick={() => setActiveSubTab('morphing')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeSubTab === 'morphing'
                ? 'bg-[#E11D48] text-white shadow-xs'
                : 'bg-white text-[#655250] hover:bg-[#FFF1EE] border border-[#FEE2E2]'
            }`}
          >
            1. Morphed Photo / Deepfake Scanner
          </button>
          <button
            onClick={() => setActiveSubTab('fakecall')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeSubTab === 'fakecall'
                ? 'bg-[#E11D48] text-white shadow-xs'
                : 'bg-white text-[#655250] hover:bg-[#FFF1EE] border border-[#FEE2E2]'
            }`}
          >
            2. AI Fake Call & Extortion Scam Detector
          </button>
          <button
            onClick={() => setActiveSubTab('takedown')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeSubTab === 'takedown'
                ? 'bg-[#E11D48] text-white shadow-xs'
                : 'bg-white text-[#655250] hover:bg-[#FFF1EE] border border-[#FEE2E2]'
            }`}
          >
            3. Mandatory 24-Hr Social Media Takedown Draft
          </button>
        </div>
      </div>

      {/* SubTab 1: Morphed Photo Scanner */}
      {activeSubTab === 'morphing' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-[#FEE2E2] shadow-xs space-y-4">
            <h3 className="font-bold text-base text-[#342422] flex items-center gap-2">
              <FileWarning className="w-5 h-5 text-[#E11D48]" />
              <span>Image Forensic Verification</span>
            </h3>
            <p className="text-xs text-[#78615E] leading-relaxed">
              If someone threatens you with a suspicious or explicit photo, test it here. Our AI neural scanner analyzes boundary artifacts, GAN spectral gradients, and illuminant anomalies.
            </p>

            {/* Presets */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#342422]">Test Scenario Presets:</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    setMorphingImageDesc(
                      'AI Face-swap detected on Instagram profile picture. Jawline shows 4px Gaussian blend seam, iris reflection conflicts with ambient lighting, EXIF camera tags stripped.'
                    )
                  }
                  className="px-2.5 py-1 text-[11px] rounded-xl bg-[#FFF1EE] text-[#9F1239] hover:bg-[#FEE2E2] border border-[#FECDD3]"
                >
                  Suspected AI Face-Swap (Blackmail Threat)
                </button>
                <button
                  onClick={() =>
                    setMorphingImageDesc(
                      'Direct mobile camera capture from Hamirpur market. Consistent sensor PRNU pattern, natural corneal reflections, authentic JPEG quantization tables intact. Verified authentic.'
                    )
                  }
                  className="px-2.5 py-1 text-[11px] rounded-xl bg-[#ECFDF5] text-[#065F46] hover:bg-[#D1FAE5] border border-[#A7F3D0]"
                >
                  Authentic Unaltered Camera Photo
                </button>
              </div>
            </div>

            {/* Textarea for description / metadata */}
            <div>
              <label className="text-xs font-bold text-[#342422] block mb-1">
                Image Context or Forensic Description:
              </label>
              <textarea
                rows={4}
                value={morphingImageDesc}
                onChange={(e) => setMorphingImageDesc(e.target.value)}
                className="w-full text-xs p-3 rounded-2xl border border-[#FEE2E2] bg-[#FFFBF9] focus:outline-none focus:ring-2 focus:ring-[#F43F5E]"
              />
            </div>

            <button
              onClick={handleScanMorphing}
              disabled={isScanningImage}
              className="w-full py-3 bg-[#E11D48] text-white rounded-2xl font-bold text-xs hover:bg-[#BE123C] shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isScanningImage ? 'Executing Neural Forensic Scan...' : 'Scan for Morphed Manipulation'}</span>
            </button>
          </div>

          {/* Deepfake Result Box */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-[#FEE2E2] shadow-xs flex flex-col justify-between">
            {deepfakeResult ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#FEE2E2]">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#78615E]">Forensic Result</span>
                    <h4 className="font-extrabold text-lg text-[#342422]">{deepfakeResult.verdict}</h4>
                  </div>
                  <div
                    className={`px-3 py-1.5 rounded-xl font-mono font-bold text-sm border ${
                      deepfakeResult.riskScore > 70
                        ? 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]'
                        : 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]'
                    }`}
                  >
                    Risk: {deepfakeResult.riskScore}%
                  </div>
                </div>

                {/* Key Findings List */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-[#342422]">Algorithmic Markers:</div>
                  {deepfakeResult.findings.map((f, idx) => (
                    <div key={idx} className="text-xs p-2.5 rounded-xl bg-[#FFF9F6] border border-[#FED7D7] text-[#6B4B48] flex items-start gap-2">
                      <span className="text-[#E11D48] font-bold">·</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                {/* Legal Action Advice */}
                <div className="p-3.5 rounded-2xl bg-[#FFF1EE] border border-[#FECDD3]">
                  <div className="text-xs font-bold text-[#881337] mb-1 flex items-center gap-1.5">
                    <Scale className="w-4 h-4" />
                    <span>Your Legal Protection Rights:</span>
                  </div>
                  <p className="text-xs text-[#6B4B48] leading-relaxed mb-2">
                    {deepfakeResult.legalActionAdvice}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {deepfakeResult.applicableLawSections.map((sec, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#9F1239] border border-[#FECDD3] font-mono">
                        {sec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-stone-400">
                <FileWarning className="w-12 h-12 mb-3 text-[#FED7D7]" />
                <h4 className="font-bold text-sm text-[#342422]">Awaiting Image Analysis</h4>
                <p className="text-xs text-[#78615E] max-w-xs mt-1">
                  Click 'Scan for Morphed Manipulation' to inspect artifacts and generate forensic evidence.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SubTab 2: Fake Call & Extortion Scam Detector */}
      {activeSubTab === 'fakecall' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-[#FEE2E2] shadow-xs space-y-4">
            <h3 className="font-bold text-base text-[#342422] flex items-center gap-2">
              <PhoneOff className="w-5 h-5 text-[#E11D48]" />
              <span>Fake Call & "Digital Arrest" Scam Analyzer</span>
            </h3>
            <p className="text-xs text-[#78615E] leading-relaxed">
              Scammers frequently target women and young adults with fake calls claiming courier narcotics, police arrests, or voice-cloned distress. Paste what the caller said to get immediate counter-scripts.
            </p>

            {/* Presets */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#342422]">Common Scam Templates:</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    setCallTranscript(
                      'This is Mumbai Customs & Crime Branch. We intercepted an international parcel sent in your name with 5 passports and contraband. You must stay on video call for Digital Arrest and send ₹50,000 security deposit.'
                    )
                  }
                  className="px-2.5 py-1 text-[11px] rounded-xl bg-[#FFF1EE] text-[#9F1239] hover:bg-[#FEE2E2] border border-[#FECDD3]"
                >
                  "Digital Arrest" / Customs Threat
                </button>
                <button
                  onClick={() =>
                    setCallTranscript(
                      'Hello mummy, I met with an accident near NIT Hamirpur gate and police inspector has seized my phone. Transfer ₹20,000 right now to this number or they will file FIR.'
                    )
                  }
                  className="px-2.5 py-1 text-[11px] rounded-xl bg-[#FFF1EE] text-[#9F1239] hover:bg-[#FEE2E2] border border-[#FECDD3]"
                >
                  AI Voice Cloning Family Distress Scam
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#342422] block mb-1">
                Call Transcript or Threat Narrative:
              </label>
              <textarea
                rows={4}
                value={callTranscript}
                onChange={(e) => setCallTranscript(e.target.value)}
                className="w-full text-xs p-3 rounded-2xl border border-[#FEE2E2] bg-[#FFFBF9] focus:outline-none focus:ring-2 focus:ring-[#F43F5E]"
              />
            </div>

            <button
              onClick={handleScanCall}
              disabled={isScanningCall}
              className="w-full py-3 bg-[#E11D48] text-white rounded-2xl font-bold text-xs hover:bg-[#BE123C] shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isScanningCall ? 'Analyzing Coercion & Deception Patterns...' : 'Detect Fake Call Threat'}</span>
            </button>
          </div>

          {/* Fake Call Result */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-[#FEE2E2] shadow-xs flex flex-col justify-between">
            {fakeCallResult ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#FEE2E2]">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#78615E]">Threat Level</span>
                    <h4 className="font-extrabold text-lg text-[#342422]">{fakeCallResult.verdict}</h4>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl font-mono font-bold text-sm bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]">
                    Scam Risk: {fakeCallResult.riskScore}%
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-[#342422]">Deception Tactics Detected:</div>
                  {fakeCallResult.detectedTactics.map((t, idx) => (
                    <div key={idx} className="text-xs p-2.5 rounded-xl bg-[#FFF9F6] border border-[#FED7D7] text-[#6B4B48] flex items-start gap-2">
                      <span className="text-[#E11D48] font-bold">·</span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>

                {/* Exact Counter Script */}
                <div className="p-4 rounded-2xl bg-[#FFF1EE] border border-[#FECDD3]">
                  <div className="text-xs font-bold text-[#881337] mb-1.5">
                    Recommended Rebuttal (Say this and hang up):
                  </div>
                  <div className="text-xs font-semibold text-[#342422] bg-white p-3 rounded-xl border border-[#FED7D7] italic">
                    {fakeCallResult.counterScript}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-xs text-[#166534]">
                  <strong>Immediate Action: </strong> {fakeCallResult.reportingAction}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-stone-400">
                <PhoneOff className="w-12 h-12 mb-3 text-[#FED7D7]" />
                <h4 className="font-bold text-sm text-[#342422]">Awaiting Call Transcript</h4>
                <p className="text-xs text-[#78615E] max-w-xs mt-1">
                  Click 'Detect Fake Call Threat' to unmask extortion tactics and get instant counter-responses.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SubTab 3: 24-Hour Mandatory Social Media Takedown Draft */}
      {activeSubTab === 'takedown' && (
        <div className="bg-white rounded-3xl p-6 border border-[#FEE2E2] shadow-xs space-y-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-between pb-3 border-b border-[#FEE2E2]">
            <div>
              <h3 className="font-bold text-base text-[#342422] flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#E11D48]" />
                <span>Statutory 24-Hour Removal Notice (Rule 3(2)(b) IT Rules 2021)</span>
              </h3>
              <p className="text-xs text-[#78615E] mt-0.5">
                Indian law obligates platforms (Instagram, WhatsApp, X, Telegram) to remove non-consensual morphed content within 24 hours of notification.
              </p>
            </div>

            <button
              onClick={copyLegalNoticeDraft}
              className="px-4 py-2 bg-[#E11D48] text-white rounded-xl text-xs font-bold hover:bg-[#BE123C] flex items-center gap-1.5 transition-all"
            >
              {copiedDraft ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedDraft ? 'Notice Copied!' : 'Copy Legal Notice'}</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF9F6] border border-[#FED7D7] font-mono text-xs text-[#443836] leading-relaxed whitespace-pre-line">
            {`URGENT TAKEDOWN NOTICE UNDER RULE 3(2)(b) OF THE INFORMATION TECHNOLOGY RULES, 2021
To: Grievance Officer
Subject: Mandatory 24-Hour Removal of Non-Consensual Morphed/Intimate Image

Dear Grievance Officer,
I am writing to formally report an unauthorized, artificially morphed and non-consensual deepfake image published on your platform.
Under Rule 3(2)(b) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, intermediaries are legally mandated to disable access to non-consensual morphed or intimate material within 24 hours of receipt of notice.
This act also constitutes offenses under Section 66E, 67, and 67A of the Information Technology Act, 2000, and Section 354C of Bharatiya Nyaya Sanhita.

Please immediately preserve server logs and remove the contested content to prevent further dissemination.`}
          </div>

          <div className="flex flex-wrap gap-4 pt-2 text-xs text-[#78615E]">
            <div>
              <strong>Official Portal: </strong>
              <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="text-[#E11D48] hover:underline font-bold">
                cybercrime.gov.in
              </a>
            </div>
            <div>
              <strong>Reporting Helpline: </strong>
              <span className="font-bold text-[#E11D48]">1930</span>
            </div>
            <div>
              <strong>Himachal Cyber Cell: </strong>
              <span>01972-222560 (Hamirpur)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
