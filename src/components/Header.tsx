import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Shield, Phone, Radio, Battery, Wifi, AlertTriangle } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onQuickSosTrigger: () => void;
  isSosActive: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onQuickSosTrigger,
  isSosActive,
}) => {
  const [batteryLevel, setBatteryLevel] = useState<number>(88);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery?.().then((battery: any) => {
        setBatteryLevel(Math.round(battery.level * 100));
        battery.addEventListener('levelchange', () => {
          setBatteryLevel(Math.round(battery.level * 100));
        });
      });
    }
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Safety Hub & SOS', countBadge: null },
    { id: 'map', label: 'Hamirpur Safety Map', countBadge: 'HP-22' },
    { id: 'cabs', label: 'Pink Cabs & Transport', countBadge: '4 Ready' },
    { id: 'voice', label: 'ElevenLabs Voice Guide', countBadge: 'Live' },
    { id: 'cyber', label: 'Cyber & Anti-Morphing', countBadge: 'AI' },
    { id: 'pocso', label: 'POCSO & Legal Aid', countBadge: '1098' },
    { id: 'forensic', label: 'Forensic Vault', countBadge: 'Chain' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FFFBF9]/95 backdrop-blur-md border-b border-[#FEE2E2]">
      {/* Top Reassurance & Quick Hotlines Ribbon */}
      <div className="bg-[#FFF1EE] text-[#443836] border-b border-[#FED7D7] text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[#9F1239] font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F43F5E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E11D48]"></span>
            </span>
            <span>Hamirpur Safety Grid Active</span>
          </div>
          <span className="text-[#D1A6A0]" aria-hidden="true">·</span>
          <span className="text-[#78615E]">GPS: 31.6865°N, 76.5220°E (Gandhi Chowk Sector)</span>
          <span className="text-[#D1A6A0]" aria-hidden="true">·</span>
          <div className="flex items-center gap-1 text-[#78615E]">
            <Battery className="w-3.5 h-3.5 text-[#059669]" />
            <span>{batteryLevel}%</span>
          </div>
          <span className="text-[#D1A6A0]" aria-hidden="true">·</span>
          <div className="flex items-center gap-1 text-[#78615E]">
            <Wifi className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Encrypted 5G</span>
          </div>
        </div>

        {/* Emergency Quick Hotlines */}
        <div className="flex items-center gap-2">
          <span className="text-[#8C6D68] text-[11px] font-medium hidden sm:inline">Instant Hotlines:</span>
          <a 
            href="tel:112" 
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-white hover:bg-[#FEE2E2] text-[#9F1239] font-medium transition-colors border border-[#FECDD3]"
            title="National Emergency Helpline"
          >
            <Phone className="w-2.5 h-2.5" /> 112
          </a>
          <a 
            href="tel:181" 
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-white hover:bg-[#FEE2E2] text-[#9F1239] font-medium transition-colors border border-[#FECDD3]"
            title="HP Women Helpline"
          >
            <Phone className="w-2.5 h-2.5" /> 181 (Women HP)
          </a>
          <a 
            href="tel:1098" 
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-white hover:bg-[#FEF3C7] text-[#92400E] font-medium transition-colors border border-[#FDE68A]"
            title="POCSO Childline"
          >
            <Phone className="w-2.5 h-2.5" /> 1098 (POCSO)
          </a>
          <a 
            href="tel:1930" 
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-white hover:bg-[#EDE9FE] text-[#6B21A8] font-medium transition-colors border border-[#DDD6FE]"
            title="Cyber Crime Portal"
          >
            <Shield className="w-2.5 h-2.5" /> 1930 (Cyber)
          </a>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo size="md" showUploadOption={true} />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-[#342422] font-serif">
                AbhayaSetu <span className="text-[#E11D48] text-base font-sans font-medium">(अभय सेतु)</span>
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#FCE7F3] text-[#9D174D] font-medium">
                Women's Safety Network
              </span>
            </div>
            <p className="text-xs text-[#78615E]">
              Real-Time Crisis Shield · ElevenLabs Navigation · Cyber Forensic Protection · Hamirpur, HP
            </p>
          </div>
        </div>

        {/* SOS Action Button in Header */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <div className="text-xs font-semibold text-[#342422]">{currentTime}</div>
            <div className="text-[11px] text-[#059669]">Guardians Synced</div>
          </div>

          <button
            onClick={onQuickSosTrigger}
            className={`px-4 py-2 rounded-xl font-bold text-sm tracking-wide shadow-md transition-all flex items-center gap-2 ${
              isSosActive
                ? 'bg-[#E11D48] text-white animate-pulse ring-4 ring-[#FDA4AF]'
                : 'bg-gradient-to-r from-[#E11D48] to-[#F43F5E] text-white hover:from-[#BE123C] hover:to-[#E11D48] hover:shadow-lg active:scale-95'
            }`}
          >
            <AlertTriangle className="w-4 h-4 animate-bounce" />
            <span>{isSosActive ? 'ALERT ACTIVE' : 'SOS EMERGENCY'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-bar */}
      <div className="border-t border-[#FEE2E2] px-4 overflow-x-auto scrollbar-none bg-[#FFF8F6]">
        <div className="max-w-7xl mx-auto flex items-center gap-1 py-1 min-w-max">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#FEE2E2] text-[#9F1239] shadow-xs font-semibold'
                    : 'text-[#655250] hover:text-[#342422] hover:bg-[#FFF1EE]'
                }`}
              >
                <span>{item.label}</span>
                {item.countBadge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded ${
                      isActive
                        ? 'bg-[#FECDD3] text-[#881337]'
                        : 'bg-[#F5E6E3] text-[#856561]'
                    }`}
                  >
                    {item.countBadge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
