export type AlertStatus = 'idle' | 'countdown' | 'active' | 'cancelled' | 'resolved';

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
  isAiGuardianEnabled: boolean;
  priority: 1 | 2 | 3;
}

export interface HamirpurLocation {
  id: string;
  name: string;
  hindiName: string;
  category: 'Commercial' | 'Educational' | 'Transit' | 'Industrial' | 'Residential';
  coordinates: { lat: number; lng: number };
  baseSafetyScore: number; // 0 - 100
  lightingScore: number; // 0 - 100
  cctvDensity: 'High' | 'Medium' | 'Low' | 'None';
  pcrPatrolFrequency: 'Frequent (15m)' | 'Moderate (30m)' | 'Sparse (1h+)' | 'Rare';
  crowdActivityNight: 'High' | 'Moderate' | 'Low' | 'Deserted';
  recentIncidents30Days: number;
  safeHavensNearby: string[];
  description: string;
}

export interface PinkCabDriver {
  id: string;
  name: string;
  vehicleModel: string;
  plateNumber: string;
  vehicleColor: string;
  rating: number;
  distanceKm: number;
  etaMinutes: number;
  policeVerified: boolean;
  selfDefenseTrained: boolean;
  isOnline: boolean;
  contactNumber: string;
  currentZone: string;
}

export interface VerifiedVolunteer {
  id: string;
  name: string;
  role: 'NIT Student Marshal' | 'Community Safety Warden' | 'Local Merchant Guard' | 'NGO Responder';
  organization: string;
  distanceMeters: number;
  etaMinutes: number;
  badgeId: string;
  isAvailable: boolean;
  phone: string;
  location: string;
}

export interface ForensicRecording {
  id: string;
  timestamp: string;
  durationSeconds: number;
  audioBlobUrl: string;
  sha256Hash: string;
  gpsCoords: { lat: number; lng: number; accuracyMeters: number };
  decibelPeak: number;
  deviceFingerprint: string;
  dispatchedToFsl: boolean;
  fslReferenceNumber?: string;
  incidentNotes?: string;
}

export interface DeepfakeScanResult {
  riskScore: number; // 0 - 100
  verdict: 'High Likelihood of Manipulation / Morphing' | 'Suspicious Artifacts Detected' | 'Authentic / No Anomaly Detected';
  findings: string[];
  analyzedFeatures: {
    facialBoundaryArtifacts: boolean;
    lightingInconsistency: boolean;
    skinTextureGlitches: boolean;
    metadataStripped: boolean;
  };
  legalActionAdvice: string;
  applicableLawSections: string[];
}

export interface FakeCallScanResult {
  riskScore: number;
  verdict: 'High Threat: Digital Arrest / Extortion Scam' | 'Suspicious Impersonation' | 'Normal Communication';
  detectedTactics: string[];
  impersonatedEntity?: string;
  counterScript: string;
  reportingAction: string;
}

export interface CalmingVoicePersona {
  id: string;
  name: string;
  title: string;
  description: string;
  elevenLabsVoiceId: string;
  tone: 'Empathetic & Grounding' | 'Crisp & Vigilant' | 'Gentle & Maternal';
  sampleText: string;
}
