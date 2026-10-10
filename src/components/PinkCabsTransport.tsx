import React, { useState } from 'react';
import { PINK_CAB_FLEET, VERIFIED_VOLUNTEERS, HAMIRPUR_AUTHORITIES } from '../data/hamirpurData';
import { PinkCabDriver, VerifiedVolunteer } from '../types';
import { 
  Car, 
  ShieldCheck, 
  Users, 
  PhoneCall, 
  MapPin, 
  Star, 
  CheckCircle2, 
  Navigation, 
  Clock, 
  HeartHandshake, 
  Radio, 
  Key, 
  ExternalLink,
  Building2
} from 'lucide-react';

export const PinkCabsTransport: React.FC = () => {
  const [activeRide, setActiveRide] = useState<{
    driver: PinkCabDriver;
    otp: string;
    status: 'dispatched' | 'arriving' | 'on_board';
    etaMinutes: number;
  } | null>(null);

  const [escortRequestSent, setEscortRequestSent] = useState<string | null>(null);

  const handleBookEmergencyRide = (driver: PinkCabDriver) => {
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setActiveRide({
      driver,
      otp: randomOtp,
      status: 'dispatched',
      etaMinutes: driver.etaMinutes,
    });
  };

  const handleCancelRide = () => {
    setActiveRide(null);
  };

  const handleRequestEscort = (vol: VerifiedVolunteer) => {
    setEscortRequestSent(vol.id);
    setTimeout(() => {
      setEscortRequestSent(null);
    }, 5000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Reassurance Banner */}
      <div className="bg-gradient-to-r from-[#FFF1EE] via-[#FFE4E6] to-[#FFF5F2] rounded-3xl p-6 border border-[#FECDD3] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-xs font-bold text-[#9F1239] mb-2 border border-[#FCA5A5]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E11D48]" />
              <span>Official Saheli Pink Transport Alliance · Hamirpur</span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#342422] font-serif">
              Women-Driven Cabs & Verified Volunteer Escort Network
            </h2>
            <p className="text-xs text-[#78615E] mt-1 max-w-2xl leading-relaxed">
              Every driver in the Pink Cab fleet is police background-checked, martial-arts self-defense certified, and linked with Hamirpur Women Police Cell for continuous telemetry.
            </p>
          </div>

          <div className="bg-white/80 p-3.5 rounded-2xl border border-[#FEE2E2] flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] flex items-center justify-center text-[#166534]">
              <Car className="w-5 h-5 text-[#059669]" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#342422]">4 Cabs Active in Hamirpur</div>
              <div className="text-[11px] text-[#059669] font-medium">Avg. Response Time: 3.8 mins</div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Emergency Ride Notification if Booked */}
      {activeRide && (
        <div className="bg-[#FFF9F6] border-2 border-[#F43F5E] rounded-3xl p-6 shadow-md animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#FEE2E2]">
            <div className="flex items-center gap-3">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E11D48] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#E11D48]"></span>
              </span>
              <div>
                <h3 className="font-bold text-[#881337] text-base">
                  Alert Transport Dispatched: {activeRide.driver.name}
                </h3>
                <p className="text-xs text-[#78615E]">
                  Vehicle: {activeRide.driver.vehicleModel} ({activeRide.driver.plateNumber})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white px-3 py-1.5 rounded-xl border border-[#FED7D7] text-center">
                <div className="text-[10px] text-[#78615E] font-medium">Safety Ride OTP</div>
                <div className="text-base font-extrabold text-[#E11D48] font-mono tracking-widest">
                  {activeRide.otp}
                </div>
              </div>
              <button
                onClick={handleCancelRide}
                className="px-3 py-1.5 text-xs rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-100"
              >
                Cancel Ride
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-white rounded-2xl border border-[#FEE2E2] flex items-center justify-between">
              <span className="text-[#78615E]">Estimated Arrival:</span>
              <span className="font-bold text-[#059669]">{activeRide.etaMinutes} mins (Approaching)</span>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-[#FEE2E2] flex items-center justify-between">
              <span className="text-[#78615E]">Driver Contact:</span>
              <a href={`tel:${activeRide.driver.contactNumber}`} className="font-bold text-[#E11D48] hover:underline">
                {activeRide.driver.contactNumber}
              </a>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-[#FEE2E2] flex items-center justify-between">
              <span className="text-[#78615E]">Police Telemetry:</span>
              <span className="font-bold text-[#2563EB]">Live Transmit to Sadar PCR</span>
            </div>
          </div>
        </div>
      )}

      {/* Grid: Pink Cabs Directory (Left) + Volunteer & NGO Responders (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Pink Cab Drivers Fleet (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-[#FEE2E2] shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-[#E11D48]" />
                <h3 className="font-bold text-[#342422] text-base">Nearby Female Drivers On Duty</h3>
              </div>
              <span className="text-xs text-[#78615E]">Hamirpur Town & Suburbs</span>
            </div>

            <div className="space-y-3.5">
              {PINK_CAB_FLEET.map((driver) => (
                <div
                  key={driver.id}
                  className="p-4 rounded-2xl bg-[#FFFBF9] border border-[#FEE2E2] hover:border-[#FCA5A5] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFE4E6] flex items-center justify-center font-bold text-sm text-[#9F1239] shrink-0">
                      {driver.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-sm text-[#342422]">{driver.name}</h4>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#065F46] font-medium flex items-center gap-0.5">
                          <ShieldCheck className="w-3 h-3 text-[#059669]" /> HP Police Verified
                        </span>
                        <div className="flex items-center gap-1 text-xs text-[#D97706] font-semibold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{driver.rating}</span>
                        </div>
                      </div>

                      <div className="text-xs text-[#6B4B48] mt-0.5">
                        {driver.vehicleModel} · <span className="font-mono font-semibold">{driver.plateNumber}</span>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-[#8C6D68] mt-1.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#E11D48]" /> {driver.currentZone}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1 font-semibold text-[#059669]">
                          <Clock className="w-3 h-3" /> {driver.etaMinutes} mins away ({driver.distanceKm} km)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col gap-2 shrink-0">
                    <button
                      onClick={() => handleBookEmergencyRide(driver)}
                      className="flex-1 sm:flex-none px-4 py-2 bg-[#E11D48] text-white rounded-xl font-bold text-xs hover:bg-[#BE123C] shadow-xs transition-all flex items-center justify-center gap-1.5"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Dispatch Safe Ride</span>
                    </button>
                    <a
                      href={`tel:${driver.contactNumber}`}
                      className="px-3 py-2 bg-white border border-[#FECDD3] text-[#9F1239] rounded-xl font-medium text-xs hover:bg-[#FFF1EE] transition-all flex items-center justify-center gap-1"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Direct Call</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Verified Volunteer Responders & NGO Partners (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-[#FEE2E2] shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-[#E11D48]" />
              <h3 className="font-bold text-[#342422] text-base">Verified Volunteer Network</h3>
            </div>
            <p className="text-xs text-[#78615E] mb-4">
              Vetted community marshals, student security wardens at NIT, and shopkeepers ready to provide physical escort.
            </p>

            <div className="space-y-3">
              {VERIFIED_VOLUNTEERS.map((vol) => (
                <div
                  key={vol.id}
                  className="p-3.5 rounded-2xl bg-[#FFF9F6] border border-[#FEE2E2] space-y-2 text-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-[#342422] flex items-center gap-1.5">
                        <span>{vol.name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#FFE4E6] text-[#9F1239] font-mono">
                          {vol.badgeId}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#78615E]">{vol.role} · {vol.organization}</div>
                    </div>

                    <div className="text-right">
                      <div className="font-bold text-[#059669] text-xs">{vol.etaMinutes}m ETA</div>
                      <div className="text-[10px] text-[#8C6D68]">{vol.distanceMeters}m away</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#FEE2E2]">
                    <span className="text-[11px] text-[#6B4B48] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#E11D48]" /> {vol.location}
                    </span>

                    <button
                      onClick={() => handleRequestEscort(vol)}
                      className="px-3 py-1 rounded-xl bg-white border border-[#FECDD3] text-[#9F1239] font-semibold text-[11px] hover:bg-[#FFF1EE] transition-all"
                    >
                      {escortRequestSent === vol.id ? 'Signal Sent!' : 'Request Escort'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regional NGO Alliances & Authorities */}
          <div className="bg-gradient-to-br from-[#FFF5F2] to-[#FFF1EE] rounded-3xl p-5 border border-[#FECDD3] text-xs space-y-3">
            <h4 className="font-bold text-[#881337] flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#E11D48]" />
              <span>Partner NGOs & Women Crisis Centers (Himachal)</span>
            </h4>

            <div className="space-y-2">
              <div className="bg-white/80 p-3 rounded-2xl border border-[#FED7D7]">
                <div className="font-bold text-[#342422]">Gunjan Organization for Community Development</div>
                <div className="text-[11px] text-[#78615E]">Psychological Counseling & Emergency Shelter</div>
                <div className="mt-1 flex items-center justify-between text-[11px]">
                  <span className="text-[#9F1239] font-medium">Regional Aid Desk</span>
                  <a href="tel:01894-233987" className="font-bold text-[#E11D48] hover:underline">
                    01894-233987
                  </a>
                </div>
              </div>

              <div className="bg-white/80 p-3 rounded-2xl border border-[#FED7D7]">
                <div className="font-bold text-[#342422]">District Legal Services Authority (DLSA) Hamirpur</div>
                <div className="text-[11px] text-[#78615E]">Free Legal Aid, POCSO Representation & Victim Compensation</div>
                <div className="mt-1 flex items-center justify-between text-[11px]">
                  <span className="text-[#9F1239] font-medium">District Courts Hamirpur</span>
                  <a href="tel:01972-223126" className="font-bold text-[#E11D48] hover:underline">
                    01972-223126
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
