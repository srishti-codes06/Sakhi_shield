import React, { useState, useRef } from 'react';
import { Shield, Sparkles, Upload } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showUploadOption?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showUploadOption = false }) => {
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(() => {
    return localStorage.getItem('abhayasetu_custom_logo') || null;
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCustomLogoUrl(result);
        localStorage.setItem('abhayasetu_custom_logo', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetToDefault = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomLogoUrl(null);
    localStorage.removeItem('abhayasetu_custom_logo');
  };

  const dimensionClasses = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
  }[size];

  return (
    <div className={`relative inline-flex items-center gap-3 ${className}`}>
      <div 
        className={`relative ${dimensionClasses} rounded-2xl flex items-center justify-center p-1.5 shadow-sm transition-all duration-300 group cursor-pointer overflow-hidden border border-[#FEE2E2] bg-gradient-to-br from-[#FFF5F5] via-[#FFF1EE] to-[#FEF3C7]`}
        onClick={() => showUploadOption && fileInputRef.current?.click()}
        title={showUploadOption ? 'Click to change or upload your logo image' : 'AbhayaSetu Emblem'}
      >
        {customLogoUrl ? (
          <img 
            src={customLogoUrl} 
            alt="AbhayaSetu Custom Logo" 
            className="w-full h-full object-contain rounded-xl"
          />
        ) : (
          <svg 
            viewBox="0 0 100 100" 
            className="w-full h-full text-[#E11D48] transition-transform duration-300 group-hover:scale-105"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Warm Pastel Glow */}
            <circle cx="50" cy="50" r="46" fill="#FEE2E2" fillOpacity="0.4" />
            <circle cx="50" cy="50" r="42" stroke="#FCA5A5" strokeWidth="1.5" strokeDasharray="3 3" />
            
            {/* Protective Shield Base */}
            <path 
              d="M50 12 L78 24 C78 52 50 78 50 88 C50 78 22 52 22 24 Z" 
              fill="url(#shieldGradient)" 
              stroke="#FB7185" 
              strokeWidth="2.5" 
              strokeLinejoin="round" 
            />

            {/* Sacred Lotus Blossom Center (Symbol of Purity & Resilience) */}
            {/* Center Petal */}
            <path 
              d="M50 35 C47 48 45 60 50 67 C55 60 53 48 50 35 Z" 
              fill="#F43F5E" 
            />
            {/* Left Petal */}
            <path 
              d="M50 50 C40 45 35 52 40 64 C44 65 48 64 50 67 Z" 
              fill="#FB7185" 
              fillOpacity="0.9"
            />
            {/* Right Petal */}
            <path 
              d="M50 50 C60 45 65 52 60 64 C56 65 52 64 50 67 Z" 
              fill="#FB7185" 
              fillOpacity="0.9"
            />

            {/* Golden Beacon of Safe Passage */}
            <circle cx="50" cy="30" r="4.5" fill="#F59E0B" />
            <circle cx="50" cy="30" r="2" fill="#FEF3C7" />

            {/* Radiating Protection Waves */}
            <path d="M42 27 C46 24 54 24 58 27" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M38 23 C44 19 56 19 62 23" stroke="#FDE68A" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7" />

            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="shieldGradient" x1="22" y1="12" x2="78" y2="88" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFF1EE" />
                <stop offset="50%" stopColor="#FFE4E6" />
                <stop offset="100%" stopColor="#FECDD3" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {showUploadOption && (
          <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
            <Upload className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      <input 
        ref={fileInputRef} 
        type="file" 
        accept="image/*" 
        className="hidden" 
        onChange={handleFileUpload}
      />

      {customLogoUrl && showUploadOption && (
        <button 
          onClick={resetToDefault} 
          className="text-[11px] text-[#881337] hover:underline"
        >
          Reset Logo
        </button>
      )}
    </div>
  );
};
