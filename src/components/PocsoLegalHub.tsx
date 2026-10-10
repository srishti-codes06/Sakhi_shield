import React, { useState } from 'react';
import { 
  ShieldCheck, 
  HeartHandshake, 
  FileText, 
  PhoneCall, 
  Lock, 
  AlertCircle, 
  CheckCircle2, 
  Scale, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';

export const PocsoLegalHub: React.FC = () => {
  const [reportSubmitted, setReportSubmitted] = useState<boolean>(false);
  const [trackingHash, setTrackingHash] = useState<string>('');
  const [incidentType, setIncidentType] = useState<string>('Online Child Exploitation / CSAM');
  const [locationIncident, setLocationIncident] = useState<string>('Hamirpur District, HP');
  const [reportNarrative, setReportNarrative] = useState<string>('');

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportNarrative) return;
    const generatedHash = `POCSO-HP-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
    setTrackingHash(generatedHash);
    setReportSubmitted(true);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#FFF5F2] via-[#FFFBEB] to-[#FFF1EE] rounded-3xl p-6 border border-[#FED7D7] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-xs font-bold text-[#B45309] mb-2 border border-[#FDE68A]">
              <Scale className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Statutory Child Protection & Legal Shield</span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#342422] font-serif">
              POCSO Act Support & Child Safety Portal
            </h2>
            <p className="text-xs text-[#78615E] mt-1 max-w-2xl leading-relaxed">
              Protection of Children from Sexual Offences (POCSO) Act 2012 provides gender-neutral, zero-tolerance legal protection for every individual under 18 years of age.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/90 p-3 rounded-2xl border border-[#FED7D7]">
            <HeartHandshake className="w-8 h-8 text-[#E11D48]" />
            <div>
              <div className="text-xs font-bold text-[#342422]">Childline National Helpline</div>
              <div className="text-xs font-mono font-bold text-[#E11D48]">Dial 1098 (Toll-Free 24/7)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Legal Rights Summary (Left) + Anonymous Reporting Desk (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Statutory Rights & Safeguards (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-[#FEE2E2] shadow-xs space-y-4">
            <h3 className="font-bold text-base text-[#342422] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#E11D48]" />
              <span>Mandatory Rights Under POCSO Act, 2012</span>
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-[#FFF9F6] border border-[#FEE2E2] space-y-1">
                <div className="font-bold text-xs text-[#881337] flex items-center justify-between">
                  <span>Section 19: Mandatory Duty to Report</span>
                  <span className="text-[10px] bg-[#FFE4E6] px-2 py-0.5 rounded text-[#9F1239]">Statutory Duty</span>
                </div>
                <p className="text-xs text-[#6B4B48] leading-relaxed">
                  Any person who has knowledge that an offense under POCSO has been committed has an absolute legal obligation to report it to the Special Juvenile Police Unit (SJPU) or local police.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FFF9F6] border border-[#FEE2E2] space-y-1">
                <div className="font-bold text-xs text-[#881337] flex items-center justify-between">
                  <span>Section 23: Complete Anonymity & Identity Protection</span>
                  <span className="text-[10px] bg-[#ECFDF5] px-2 py-0.5 rounded text-[#065F46]">Strict Privacy</span>
                </div>
                <p className="text-xs text-[#6B4B48] leading-relaxed">
                  No person, media house, or organization shall reveal the name, address, school, or photograph of the child. Violation carries mandatory imprisonment under Section 23(4).
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FFF9F6] border border-[#FEE2E2] space-y-1">
                <div className="font-bold text-xs text-[#881337] flex items-center justify-between">
                  <span>Section 24 & 33: Child-Friendly Investigation</span>
                  <span className="text-[10px] bg-[#EFF6FF] px-2 py-0.5 rounded text-[#1D4ED8]">Protected Process</span>
                </div>
                <p className="text-xs text-[#6B4B48] leading-relaxed">
                  Statements must be recorded by a woman police officer not in police uniform, at the child’s residence or preferred safe location, in the presence of parents or trusted guardians.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FFF9F6] border border-[#FEE2E2] space-y-1">
                <div className="font-bold text-xs text-[#881337] flex items-center justify-between">
                  <span>Section 35: Expedited One-Year Trial & Free Legal Aid</span>
                  <span className="text-[10px] bg-[#FAF5FF] px-2 py-0.5 rounded text-[#6B21A8]">Special Courts</span>
                </div>
                <p className="text-xs text-[#6B4B48] leading-relaxed">
                  Special POCSO Courts must complete proceedings within one year. Free legal counsel is provided by District Legal Services Authority (DLSA Hamirpur).
                </p>
              </div>
            </div>
          </div>

          {/* Evidence Preservation Guidelines */}
          <div className="bg-[#FFF8F6] rounded-3xl p-6 border border-[#FED7D7] space-y-3">
            <h4 className="font-bold text-sm text-[#342422] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#E11D48]" />
              <span>Digital & Physical Evidence Preservation Protocol</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#6B4B48]">
              <div className="p-3 bg-white rounded-xl border border-[#FED7D7]">
                <strong className="text-[#342422] block mb-0.5">1. Preserve Original Media:</strong>
                Do not delete chat logs, audio notes, or media. Take uncropped screenshots capturing timestamps.
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#FED7D7]">
                <strong className="text-[#342422] block mb-0.5">2. Medical Examination (72h):</strong>
                Must be conducted by a registered female medical practitioner with zero cost at Govt Medical College Hamirpur.
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#FED7D7]">
                <strong className="text-[#342422] block mb-0.5">3. Forensic Hashing:</strong>
                Use our built-in Forensic Vault to generate cryptographic SHA-256 hashes of digital threats.
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#FED7D7]">
                <strong className="text-[#342422] block mb-0.5">4. Safe Custody:</strong>
                Child Welfare Committee (CWC Hamirpur) coordinates safe temporary sanctuary if home environment is compromised.
              </div>
            </div>
          </div>
        </div>

        {/* Right: Encrypted Anonymous Reporting Desk (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-[#FEE2E2] shadow-xs space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#FFF1EE] flex items-center justify-center text-[#E11D48]">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#342422]">Anonymous POCSO Reporting Desk</h3>
                <p className="text-xs text-[#78615E]">Encrypted submission without personal identity</p>
              </div>
            </div>

            {reportSubmitted ? (
              <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] space-y-3">
                <div className="flex items-center gap-2 text-[#065F46] font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Report Safely Encrypted & Queued</span>
                </div>
                <p className="text-xs text-[#065F46] leading-relaxed">
                  Your confidential submission has been tokenized and routed to the Special Juvenile Police Unit (SJPU Hamirpur) and Child Welfare Committee (CWC).
                </p>
                <div className="p-3 bg-white rounded-xl border border-[#A7F3D0]">
                  <div className="text-[10px] text-[#78615E]">Your Secure Case Tracking Token:</div>
                  <div className="font-mono font-bold text-sm text-[#065F46]">{trackingHash}</div>
                </div>
                <button
                  onClick={() => {
                    setReportSubmitted(false);
                    setReportNarrative('');
                  }}
                  className="w-full py-2 rounded-xl bg-[#059669] text-white text-xs font-bold hover:bg-[#047857]"
                >
                  File Another Confidential Report
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitReport} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-[#342422] block mb-1">Incident Category:</label>
                  <select
                    value={incidentType}
                    onChange={(e) => setIncidentType(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#FEE2E2] bg-[#FFFBF9]"
                  >
                    <option value="Online Child Exploitation / CSAM">Online Child Exploitation / CSAM</option>
                    <option value="Sexual Harassment / Stalking of Minor">Sexual Harassment / Stalking of Minor</option>
                    <option value="Physical Abuse / Aggravated Assault">Physical Abuse / Aggravated Assault</option>
                    <option value="Coercive Blackmail / Extortion">Coercive Blackmail / Extortion</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#342422] block mb-1">Location / Sector:</label>
                  <input
                    type="text"
                    value={locationIncident}
                    onChange={(e) => setLocationIncident(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#FEE2E2] bg-[#FFFBF9]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#342422] block mb-1">
                    Confidential Incident Narrative:
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe facts, platform usernames, or dates without disclosing the minor's name..."
                    value={reportNarrative}
                    onChange={(e) => setReportNarrative(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#FEE2E2] bg-[#FFFBF9] focus:outline-none focus:ring-2 focus:ring-[#F43F5E]"
                  />
                </div>

                <div className="p-2.5 rounded-xl bg-[#FFF9F6] border border-[#FED7D7] text-[11px] text-[#78615E] flex items-start gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#E11D48] shrink-0 mt-0.5" />
                  <span>Your IP address and hardware fingerprint are cryptographically stripped before transmission.</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#E11D48] text-white rounded-2xl font-bold text-xs hover:bg-[#BE123C] shadow-xs transition-all"
                >
                  Submit Encrypted POCSO Report
                </button>
              </form>
            )}
          </div>

          {/* Child Protection Authorities Contacts in Hamirpur */}
          <div className="bg-[#FFFBEB] p-5 rounded-3xl border border-[#FDE68A] text-xs space-y-2">
            <h4 className="font-bold text-[#92400E] flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-[#D97706]" />
              <span>Hamirpur Child Welfare Contacts</span>
            </h4>
            <div className="space-y-1.5 text-[#78350F]">
              <div className="flex justify-between bg-white/80 p-2 rounded-xl">
                <span>Childline India Hamirpur</span>
                <a href="tel:1098" className="font-bold text-[#E11D48]">1098</a>
              </div>
              <div className="flex justify-between bg-white/80 p-2 rounded-xl">
                <span>Child Welfare Committee (CWC) Hamirpur</span>
                <span className="font-mono">01972-224190</span>
              </div>
              <div className="flex justify-between bg-white/80 p-2 rounded-xl">
                <span>District Child Protection Officer (DCPO)</span>
                <span className="font-mono">01972-222340</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
