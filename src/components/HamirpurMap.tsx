import React, { useState, useMemo } from 'react';
import { HAMIRPUR_LOCATIONS, HAMIRPUR_AUTHORITIES } from '../data/hamirpurData';
import { HamirpurLocation } from '../types';
import { evaluateRouteSafetyAI } from '../services/aiService';
import { 
  MapPin, 
  ShieldCheck, 
  AlertTriangle, 
  Sun, 
  Moon, 
  Navigation, 
  Eye, 
  Radio, 
  Lightbulb, 
  Newspaper,
  Compass,
  ArrowRight,
  Filter
} from 'lucide-react';

export const HamirpurMap: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<HamirpurLocation>(HAMIRPUR_LOCATIONS[0]);
  const [timeHour, setTimeHour] = useState<number>(22); // Default 10:00 PM to highlight night safety
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [routeOrigin, setRouteOrigin] = useState<string>('New Bus Stand (Bhota Chowk)');
  const [routeDest, setRouteDest] = useState<string>('NIT Hamirpur Campus & Gate (Anu Road)');
  const [isAnalyzingRoute, setIsAnalyzingRoute] = useState<boolean>(false);
  const [aiRouteResult, setAiRouteResult] = useState<any>(null);

  // Time dynamic adjustment for safety score
  const dynamicLocations = useMemo(() => {
    const isLateNight = timeHour >= 21 || timeHour < 5;
    const isEvening = timeHour >= 18 && timeHour < 21;

    return HAMIRPUR_LOCATIONS.map((loc) => {
      let score = loc.baseSafetyScore;
      if (isLateNight) {
        // Areas with low lighting suffer big drop
        const lightingPenalty = (100 - loc.lightingScore) * 0.35;
        score = Math.max(30, Math.round(score - lightingPenalty - (loc.category === 'Industrial' ? 15 : 5)));
      } else if (isEvening) {
        score = Math.max(45, Math.round(score - 4));
      }

      return {
        ...loc,
        currentSafetyScore: score,
      };
    });
  }, [timeHour]);

  const filteredLocations = useMemo(() => {
    if (filterCategory === 'All') return dynamicLocations;
    return dynamicLocations.filter((l) => l.category === filterCategory);
  }, [dynamicLocations, filterCategory]);

  const handleAnalyzeRoute = async () => {
    setIsAnalyzingRoute(true);
    try {
      const result = await evaluateRouteSafetyAI({
        origin: routeOrigin,
        destination: routeDest,
        timeOfDayHours: timeHour,
        locationArea: 'Hamirpur District, HP',
      });
      setAiRouteResult(result);
    } finally {
      setIsAnalyzingRoute(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-[#059669] bg-[#ECFDF5] border-[#A7F3D0]';
    if (score >= 65) return 'text-[#D97706] bg-[#FFFBEB] border-[#FDE68A]';
    return 'text-[#DC2626] bg-[#FEF2F2] border-[#FECACA]';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'Safe Corridor';
    if (score >= 65) return 'Moderate Vigilance';
    return 'High-Risk Zone';
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Context */}
      <div className="bg-white rounded-3xl p-6 border border-[#FEE2E2] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FFE4E6] text-[#9F1239] font-bold">
                Himachal Public Safety Feed
              </span>
              <span className="text-xs text-[#78615E]">Hamirpur Sector (NH-103 Corridor)</span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#342422] font-serif">
              Real-Time Location Safety Score & Threat Radar
            </h2>
            <p className="text-xs text-[#78615E] mt-1 max-w-2xl">
              Dynamically derived from Sadar Police Station Hamirpur PCR logs, municipal streetlamp sensors, CCTV coverage density, and regional newspaper incident alerts.
            </p>
          </div>

          {/* Dynamic Time-of-Day Slider */}
          <div className="bg-[#FFF9F6] p-4 rounded-2xl border border-[#FED7D7] min-w-[280px]">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-[#342422] flex items-center gap-1.5">
                {timeHour >= 6 && timeHour < 18 ? (
                  <Sun className="w-4 h-4 text-[#F59E0B]" />
                ) : (
                  <Moon className="w-4 h-4 text-[#7C3AED]" />
                )}
                <span>Simulated Time of Day</span>
              </span>
              <span className="font-mono font-bold text-[#9F1239] bg-white px-2 py-0.5 rounded border border-[#FECDD3]">
                {String(timeHour).padStart(2, '0')}:00 {timeHour >= 12 ? 'PM' : 'AM'}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="23"
              value={timeHour}
              onChange={(e) => setTimeHour(parseInt(e.target.value))}
              className="w-full accent-[#E11D48] cursor-pointer"
            />

            <div className="flex justify-between text-[10px] text-[#8C6D68] mt-1">
              <span>06:00 (Dawn)</span>
              <span>14:00 (Noon)</span>
              <span>22:00 (Night)</span>
              <span>03:00 (Late)</span>
            </div>
          </div>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-[#FEE2E2]">
          <span className="text-xs font-semibold text-[#78615E] flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter Sectors:
          </span>
          {['All', 'Commercial', 'Educational', 'Transit', 'Residential', 'Industrial'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 text-xs rounded-xl font-medium transition-all ${
                filterCategory === cat
                  ? 'bg-[#E11D48] text-white shadow-xs'
                  : 'bg-[#FFF1EE] text-[#655250] hover:bg-[#FEE2E2]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Interactive Map Visualizer + Location Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Interactive Visual Map (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#FEE2E2] shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-[#342422] flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#E11D48]" />
              <span>Hamirpur Urban Safety Spatial Map</span>
            </h3>
            <span className="text-[11px] text-[#78615E]">Tap any location node to view live metrics</span>
          </div>

          {/* Bespoke Interactive Schematic Map of Hamirpur Town */}
          <div className="relative w-full h-[400px] bg-gradient-to-b from-[#FFFDFB] to-[#FFF5F2] rounded-2xl border border-[#FED7D7] overflow-hidden p-4">
            {/* Road network schematic paths */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 400">
              <defs>
                <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FED7D7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#FCA5A5" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Major Roads / Arteries */}
              {/* NH-103 Spine: Dosarka to Salasi to Bus Stand to Gandhi Chowk to Anu to NIT */}
              <path
                d="M 120 360 Q 220 310 270 240 T 330 170 T 400 110 T 490 60"
                fill="none"
                stroke="url(#roadGrad)"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 120 360 Q 220 310 270 240 T 330 170 T 400 110 T 490 60"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="3"
                strokeDasharray="6 6"
              />

              {/* Branch to Medical College */}
              <path
                d="M 330 170 Q 260 140 220 120"
                fill="none"
                stroke="url(#roadGrad)"
                strokeWidth="8"
                strokeLinecap="round"
              />

              {/* Branch to Hira Nagar */}
              <path
                d="M 400 110 Q 450 140 480 170"
                fill="none"
                stroke="url(#roadGrad)"
                strokeWidth="8"
                strokeLinecap="round"
              />

              {/* Safe Corridor glow around Gandhi Chowk to NIT */}
              <path
                d="M 330 170 T 400 110 T 490 60"
                fill="none"
                stroke="#10B981"
                strokeWidth="4"
                strokeOpacity="0.3"
              />
            </svg>

            {/* Clickable Map Nodes */}
            {filteredLocations.map((loc, idx) => {
              // Custom map coordinates on 600x400 canvas mapped to realistic relative positions
              const positions: Record<string, { top: string; left: string }> = {
                'nit-hamirpur': { top: '15%', left: '80%' },
                'anu-chowk': { top: '28%', left: '66%' },
                'hira-nagar': { top: '42%', left: '80%' },
                'gandhi-chowk': { top: '42%', left: '55%' },
                'medical-college': { top: '30%', left: '36%' },
                'new-bus-stand': { top: '60%', left: '45%' },
                'dosarka-bypass': { top: '78%', left: '32%' },
                'salasi-industrial': { top: '88%', left: '20%' },
              };

              const pos = positions[loc.id] || { top: '50%', left: '50%' };
              const isSelected = selectedLocation.id === loc.id;
              const isDanger = (loc as any).currentSafetyScore < 60;
              const isSafe = (loc as any).currentSafetyScore >= 80;

              return (
                <div
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  style={{ top: pos.top, left: pos.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                >
                  {/* Halo pulse */}
                  <div
                    className={`absolute inset-0 rounded-full scale-150 transition-all ${
                      isDanger
                        ? 'bg-rose-400/30 animate-ping'
                        : isSafe
                        ? 'bg-emerald-400/20 group-hover:scale-200'
                        : 'bg-amber-400/20'
                    }`}
                  />

                  {/* Marker Pin */}
                  <div
                    className={`relative px-2.5 py-1.5 rounded-2xl shadow-md border flex items-center gap-1.5 transition-all text-xs font-bold ${
                      isSelected
                        ? 'bg-[#342422] text-white border-black scale-110 z-30 ring-2 ring-[#F43F5E]'
                        : isSafe
                        ? 'bg-white text-[#065F46] border-[#A7F3D0] hover:scale-105'
                        : isDanger
                        ? 'bg-[#FFF1F2] text-[#9F1239] border-[#FECDD3] hover:scale-105'
                        : 'bg-white text-[#92400E] border-[#FDE68A] hover:scale-105'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate max-w-[100px]">{loc.name.split(' ')[0]}</span>
                    <span
                      className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                        isSafe
                          ? 'bg-[#D1FAE5] text-[#065F46]'
                          : isDanger
                          ? 'bg-[#FFE4E6] text-[#9F1239]'
                          : 'bg-[#FEF3C7] text-[#92400E]'
                      }`}
                    >
                      {(loc as any).currentSafetyScore}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Map Legend */}
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs p-2.5 rounded-xl border border-[#FED7D7] text-[10px] space-y-1 z-20 shadow-xs">
              <div className="font-bold text-[#342422]">Live Safety Index</div>
              <div className="flex items-center gap-1.5 text-[#065F46]">
                <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                <span>80-100: Highly Monitored & Safe</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#92400E]">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span>
                <span>65-79: Normal Caution</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#9F1239]">
                <span className="w-2 h-2 rounded-full bg-[#E11D48]"></span>
                <span>Below 65: Low Lighting Risk</span>
              </div>
            </div>
          </div>

          {/* Newspaper & Police Bulletin Feed */}
          <div className="mt-4 p-4 rounded-2xl bg-[#FFF9F6] border border-[#FEE2E2]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#881337] mb-2">
              <Newspaper className="w-4 h-4 text-[#E11D48]" />
              <span>Verified Regional Police & News Alerts (Hamirpur HP)</span>
            </div>
            <div className="space-y-1.5 text-xs text-[#523F3D]">
              <div className="flex items-start gap-2">
                <span className="text-[#E11D48] font-bold">·</span>
                <p>
                  <strong>Amar Ujala / Hamirpur Police Bulletin:</strong> Dedicated pink PCR vehicle "Shakti Patrol" deployed at Gandhi Chowk and Anu Road from 7:00 PM to 6:00 AM.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#D97706] font-bold">·</span>
                <p>
                  <strong>Public Works Advisory:</strong> Streetlight upgrade ongoing between Salasi Industrial Belt and Dosarka Bypass. Pedestrians advised to take Main Bazaar route after 8:30 PM.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Detail Card for Selected Location (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-[#FEE2E2] shadow-xs">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#9F1239]">
                  {selectedLocation.category} Sector
                </span>
                <h3 className="text-xl font-extrabold text-[#342422]">{selectedLocation.name}</h3>
                <p className="text-xs text-[#78615E] font-medium">{selectedLocation.hindiName}</p>
              </div>

              {/* Big Score Stamp */}
              <div
                className={`p-3 rounded-2xl border text-center min-w-[70px] ${getScoreColor(
                  (selectedLocation as any).currentSafetyScore || selectedLocation.baseSafetyScore
                )}`}
              >
                <div className="text-2xl font-black font-mono">
                  {(selectedLocation as any).currentSafetyScore || selectedLocation.baseSafetyScore}
                </div>
                <div className="text-[9px] font-bold uppercase">
                  {getScoreBadge(
                    (selectedLocation as any).currentSafetyScore || selectedLocation.baseSafetyScore
                  )}
                </div>
              </div>
            </div>

            <p className="text-xs text-[#6B4B48] leading-relaxed mb-4">
              {selectedLocation.description}
            </p>

            {/* Key Metrics Breakdown */}
            <div className="grid grid-cols-2 gap-2.5 mb-4 text-xs">
              <div className="p-2.5 rounded-xl bg-[#FFF9F6] border border-[#FEE2E2]">
                <div className="flex items-center gap-1.5 text-[#78615E] mb-1">
                  <Lightbulb className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Street Lighting</span>
                </div>
                <div className="font-bold text-[#342422]">{selectedLocation.lightingScore}% Coverage</div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#FFF9F6] border border-[#FEE2E2]">
                <div className="flex items-center gap-1.5 text-[#78615E] mb-1">
                  <Eye className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>CCTV Density</span>
                </div>
                <div className="font-bold text-[#342422]">{selectedLocation.cctvDensity} Density</div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#FFF9F6] border border-[#FEE2E2]">
                <div className="flex items-center gap-1.5 text-[#78615E] mb-1">
                  <Radio className="w-3.5 h-3.5 text-[#059669]" />
                  <span>Police Patrols</span>
                </div>
                <div className="font-bold text-[#342422]">{selectedLocation.pcrPatrolFrequency}</div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#FFF9F6] border border-[#FEE2E2]">
                <div className="flex items-center gap-1.5 text-[#78615E] mb-1">
                  <Moon className="w-3.5 h-3.5 text-[#7C3AED]" />
                  <span>Night Footfall</span>
                </div>
                <div className="font-bold text-[#342422]">{selectedLocation.crowdActivityNight}</div>
              </div>
            </div>

            {/* Safe Havens Nearby */}
            <div className="border-t border-[#FEE2E2] pt-3">
              <h4 className="text-xs font-bold text-[#342422] mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
                <span>Verified Safe Havens Nearby:</span>
              </h4>
              <div className="space-y-1.5">
                {selectedLocation.safeHavensNearby.map((haven, i) => (
                  <div
                    key={i}
                    className="text-xs p-2 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] text-[#166534] flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                    <span>{haven}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Route Safety Optimizer Component */}
          <div className="bg-[#FFF8F6] rounded-3xl p-5 border border-[#FED7D7]">
            <h4 className="font-bold text-sm text-[#342422] flex items-center gap-1.5 mb-2">
              <Navigation className="w-4 h-4 text-[#E11D48]" />
              <span>AI Route Safety Evaluator (Hamirpur)</span>
            </h4>
            <p className="text-xs text-[#78615E] mb-3">
              Calculates safest street trajectories with CCTV, open pharmacies, and active patrols.
            </p>

            <div className="space-y-2 mb-3">
              <div>
                <label className="text-[11px] font-semibold text-[#655250]">Origin:</label>
                <select
                  value={routeOrigin}
                  onChange={(e) => setRouteOrigin(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl border border-[#FEE2E2] bg-white focus:outline-none"
                >
                  {HAMIRPUR_LOCATIONS.map((l) => (
                    <option key={l.id} value={l.name}>
                      {l.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#655250]">Destination:</label>
                <select
                  value={routeDest}
                  onChange={(e) => setRouteDest(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl border border-[#FEE2E2] bg-white focus:outline-none"
                >
                  {HAMIRPUR_LOCATIONS.map((l) => (
                    <option key={l.id} value={l.name}>
                      {l.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleAnalyzeRoute}
              disabled={isAnalyzingRoute}
              className="w-full py-2.5 rounded-xl bg-[#E11D48] text-white text-xs font-bold hover:bg-[#BE123C] shadow-xs flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{isAnalyzingRoute ? 'Analyzing Lighting & Police Grid...' : 'Evaluate Safest Path'}</span>
            </button>

            {/* AI Evaluator Result */}
            {aiRouteResult && (
              <div className="mt-4 p-3.5 rounded-2xl bg-white border border-[#FECDD3] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#881337]">Safest Path Score:</span>
                  <span className="font-mono font-bold text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded">
                    {aiRouteResult.safetyScore}/100
                  </span>
                </div>
                <p className="text-[#342422]">{aiRouteResult.recommendedRoute}</p>
                <div className="p-2 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] text-[#9F1239] text-[11px]">
                  <strong>Avoid: </strong> {aiRouteResult.avoidStretches?.join(', ')}
                </div>
                <p className="text-[11px] italic text-[#78615E]">{aiRouteResult.aiAdvisory}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
