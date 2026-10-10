import { HamirpurLocation, PinkCabDriver, VerifiedVolunteer, CalmingVoicePersona } from '../types';

export const HAMIRPUR_LOCATIONS: HamirpurLocation[] = [
  {
    id: 'gandhi-chowk',
    name: 'Gandhi Chowk',
    hindiName: 'गांधी चौक',
    category: 'Commercial',
    coordinates: { lat: 31.6865, lng: 76.5220 },
    baseSafetyScore: 92,
    lightingScore: 95,
    cctvDensity: 'High',
    pcrPatrolFrequency: 'Frequent (15m)',
    crowdActivityNight: 'Moderate',
    recentIncidents30Days: 0,
    safeHavensNearby: ['24/7 Sanjeevani Medical Store', 'Police Aid Booth', 'HDFC Bank ATM Lobby', 'Cafe Evergreen'],
    description: 'Central commercial square of Hamirpur town with constant vendor footfall, bright municipal high-mast lighting, and permanent traffic police presence.'
  },
  {
    id: 'nit-hamirpur',
    name: 'NIT Hamirpur Campus & Gate (Anu Road)',
    hindiName: 'एनआईटी हमीरपुर परिसर',
    category: 'Educational',
    coordinates: { lat: 31.7084, lng: 76.5273 },
    baseSafetyScore: 88,
    lightingScore: 90,
    cctvDensity: 'High',
    pcrPatrolFrequency: 'Frequent (15m)',
    crowdActivityNight: 'High',
    recentIncidents30Days: 0,
    safeHavensNearby: ['NIT Main Security Checkpost', 'Campus Health Center', 'Student Activity Center', 'State Bank Campus Branch'],
    description: 'Vibrant academic campus hub with dedicated 24/7 private security marshals, active female student warden desk, and well-illuminated main avenue.'
  },
  {
    id: 'new-bus-stand',
    name: 'New Bus Stand (Bhota Chowk)',
    hindiName: 'नया बस स्टैंड',
    category: 'Transit',
    coordinates: { lat: 31.6821, lng: 76.5248 },
    baseSafetyScore: 80,
    lightingScore: 84,
    cctvDensity: 'High',
    pcrPatrolFrequency: 'Frequent (15m)',
    crowdActivityNight: 'High',
    recentIncidents30Days: 1,
    safeHavensNearby: ['HRTC Women Helpdesk', 'Police Post Bus Stand', '24-Hour Passenger Waiting Hall', 'Railway/Bus Canteen'],
    description: 'Interstate transport terminus connecting Kangra, Bilaspur, and Shimla. Active around the clock with police assistance kiosk and HRTC staff.'
  },
  {
    id: 'medical-college',
    name: 'Dr. Radhakrishnan Govt Medical College',
    hindiName: 'मेडिकल कॉलेज हमीरपुर',
    category: 'Educational',
    coordinates: { lat: 31.6912, lng: 76.5189 },
    baseSafetyScore: 91,
    lightingScore: 93,
    cctvDensity: 'High',
    pcrPatrolFrequency: 'Frequent (15m)',
    crowdActivityNight: 'High',
    recentIncidents30Days: 0,
    safeHavensNearby: ['Emergency Casualty Reception', 'Hospital Security Control Room', 'Jan Aushadhi Kendra', 'Ambulance Bay'],
    description: 'Hospital zone with 24/7 security personnel, continuous doctor and nurse movement, bright illumination, and direct police liaison.'
  },
  {
    id: 'hira-nagar',
    name: 'Hira Nagar Residential Belt',
    hindiName: 'हीरा नगर',
    category: 'Residential',
    coordinates: { lat: 31.6934, lng: 76.5235 },
    baseSafetyScore: 78,
    lightingScore: 72,
    cctvDensity: 'Medium',
    pcrPatrolFrequency: 'Moderate (30m)',
    crowdActivityNight: 'Low',
    recentIncidents30Days: 0,
    safeHavensNearby: ['Community Center Gate', 'Sharma Kirana Store', 'Resident Welfare Desk'],
    description: 'Peaceful residential neighborhood. Good community vigilance during day, but street lighting is patchy in inner alleyways after 10 PM.'
  },
  {
    id: 'dosarka-bypass',
    name: 'Dosarka Bypass Junction',
    hindiName: 'दोसड़का बाईपास',
    category: 'Transit',
    coordinates: { lat: 31.6712, lng: 76.5085 },
    baseSafetyScore: 64,
    lightingScore: 60,
    cctvDensity: 'Medium',
    pcrPatrolFrequency: 'Moderate (30m)',
    crowdActivityNight: 'Low',
    recentIncidents30Days: 2,
    safeHavensNearby: ['Highway Petrol Pump 24/7', 'Dhaba Highway Haven', 'Toll Patrol Booth'],
    description: 'Major highway intersection on NH-103. Heavy freight vehicles, but pedestrian sidewalks are sparse and lighting drops significantly at night.'
  },
  {
    id: 'salasi-industrial',
    name: 'Salasi Industrial Stretch',
    hindiName: 'सलासी औद्योगिक क्षेत्र',
    category: 'Industrial',
    coordinates: { lat: 31.6645, lng: 76.5132 },
    baseSafetyScore: 49,
    lightingScore: 42,
    cctvDensity: 'Low',
    pcrPatrolFrequency: 'Sparse (1h+)',
    crowdActivityNight: 'Deserted',
    recentIncidents30Days: 4,
    safeHavensNearby: ['Factory Gate 3 Security Post', 'Power Substation Watchtower'],
    description: 'High-risk stretch after sunset. Warehouses and closed manufacturing sheds, unlit curves, and limited mobile network coverage.'
  },
  {
    id: 'anu-chowk',
    name: 'Anu Chowk & College Road',
    hindiName: 'अनु चौक',
    category: 'Commercial',
    coordinates: { lat: 31.7011, lng: 76.5255 },
    baseSafetyScore: 84,
    lightingScore: 82,
    cctvDensity: 'Medium',
    pcrPatrolFrequency: 'Frequent (15m)',
    crowdActivityNight: 'Moderate',
    recentIncidents30Days: 0,
    safeHavensNearby: ['Anu Govt College Guard Room', 'Stationery & Cyber Cafe', 'Bake-Fresh Bakery'],
    description: 'Youth and student corridor linking Hamirpur city center to NIT. Active evening footfall with active community patrols.'
  }
];

export const PINK_CAB_FLEET: PinkCabDriver[] = [
  {
    id: 'driver-1',
    name: 'Sunita Sharma',
    vehicleModel: 'Maruti Alto K10 (Pink Shield)',
    plateNumber: 'HP-22-B-4412',
    vehicleColor: 'Pastel Rose & White',
    rating: 4.95,
    distanceKm: 0.6,
    etaMinutes: 3,
    policeVerified: true,
    selfDefenseTrained: true,
    isOnline: true,
    contactNumber: '+91 98160 44120',
    currentZone: 'Gandhi Chowk, Hamirpur'
  },
  {
    id: 'driver-2',
    name: 'Priya Thakur',
    vehicleModel: 'Maruti Wagon-R (Saheli SafeCab)',
    plateNumber: 'HP-22-C-1908',
    vehicleColor: 'Silver & Rose Ribbon',
    rating: 5.0,
    distanceKm: 1.2,
    etaMinutes: 5,
    policeVerified: true,
    selfDefenseTrained: true,
    isOnline: true,
    contactNumber: '+91 98162 19082',
    currentZone: 'Anu Road near NIT Hamirpur'
  },
  {
    id: 'driver-3',
    name: 'Anita Verma',
    vehicleModel: 'Mahindra E-Verito (Sakha Electric)',
    plateNumber: 'HP-22-E-0514',
    vehicleColor: 'Soft Blush Pink',
    rating: 4.88,
    distanceKm: 1.8,
    etaMinutes: 7,
    policeVerified: true,
    selfDefenseTrained: true,
    isOnline: true,
    contactNumber: '+91 94180 05141',
    currentZone: 'New Bus Stand Junction'
  },
  {
    id: 'driver-4',
    name: 'Kavita Chandel',
    vehicleModel: 'Tata Tiago EV (HP SafeRide)',
    plateNumber: 'HP-22-E-8821',
    vehicleColor: 'Pastel Peach',
    rating: 4.92,
    distanceKm: 2.5,
    etaMinutes: 9,
    policeVerified: true,
    selfDefenseTrained: true,
    isOnline: true,
    contactNumber: '+91 98055 88214',
    currentZone: 'Medical College Hamirpur'
  }
];

export const VERIFIED_VOLUNTEERS: VerifiedVolunteer[] = [
  {
    id: 'vol-1',
    name: 'Akanksha Dhiman',
    role: 'NIT Student Marshal',
    organization: 'NIT Hamirpur Women Security Cell',
    distanceMeters: 280,
    etaMinutes: 2,
    badgeId: 'NITH-SAFE-042',
    isAvailable: true,
    phone: '+91 98821 00421',
    location: 'Near Gate 2, NIT Hamirpur'
  },
  {
    id: 'vol-2',
    name: 'Ritu Kaundal',
    role: 'Community Safety Warden',
    organization: 'Himachal Mahila Kalyan Parishad',
    distanceMeters: 450,
    etaMinutes: 4,
    badgeId: 'HP-WARDEN-118',
    isAvailable: true,
    phone: '+91 94182 33118',
    location: 'Gandhi Chowk Main Market'
  },
  {
    id: 'vol-3',
    name: 'Shreya Pathania',
    role: 'NGO Responder',
    organization: 'Gunjan Organization for Community Development',
    distanceMeters: 750,
    etaMinutes: 6,
    badgeId: 'GNJ-HP-089',
    isAvailable: true,
    phone: '+91 98165 44089',
    location: 'Near Bus Stand Police Booth'
  },
  {
    id: 'vol-4',
    name: 'Rajinder Kumar (Safe Haven Merchant)',
    role: 'Local Merchant Guard',
    organization: 'Hamirpur Vyapar Mandal Women Care Alliance',
    distanceMeters: 120,
    etaMinutes: 1,
    badgeId: 'VM-SAFE-014',
    isAvailable: true,
    phone: '+91 98160 14014',
    location: 'Sanjeevani Medicos, Gandhi Chowk'
  }
];

export const HAMIRPUR_AUTHORITIES = [
  {
    name: 'Sadar Police Station Hamirpur',
    phone: '01972-222434',
    altPhone: '112',
    headOfficer: 'SHO Sadar Hamirpur',
    address: 'Near DC Office, Hamirpur, HP - 177001',
    pcrResponseTimeMins: '3 - 6 mins',
    verified: true
  },
  {
    name: 'Women Police Cell Hamirpur (महिला पुलिस थाना)',
    phone: '01972-224358',
    altPhone: '1091 / 181',
    headOfficer: 'Inspector Sunita Kumari (Incharge)',
    address: 'Police Lines Hamirpur, HP',
    pcrResponseTimeMins: '2 - 4 mins (Priority SOS)',
    verified: true
  },
  {
    name: 'Cyber Crime Police Station (Hamirpur Range)',
    phone: '1930 / 01972-222560',
    altPhone: 'cybercrime.gov.in',
    headOfficer: 'DSP Cyber Intelligence HP',
    address: 'District Police Headquarters, Hamirpur',
    pcrResponseTimeMins: 'Instant Digital Freeze',
    verified: true
  },
  {
    name: 'State Forensic Science Laboratory (SFSL Junga / Mandi Range)',
    phone: '0177-2752521',
    altPhone: 'Direct Evidence Vault Line',
    headOfficer: 'Director SFSL Himachal Pradesh',
    address: 'SFSL Junga, HP (Digital Evidence Division)',
    pcrResponseTimeMins: '24/7 Digital Custody Ingestion',
    verified: true
  },
  {
    name: 'Gunjan Organization for Community Development',
    phone: '01894-233987',
    altPhone: '+91 94180 56789',
    headOfficer: 'Sandeep Parmar (Director)',
    address: 'Himachal Regional Women Aid Desk',
    pcrResponseTimeMins: 'Community Counselor Dispatch',
    verified: true
  },
  {
    name: 'District Legal Services Authority (DLSA) Hamirpur',
    phone: '01972-223126',
    altPhone: 'Toll-free 15100',
    headOfficer: 'Secretary DLSA / CJM Hamirpur',
    address: 'District Courts Complex Hamirpur, HP',
    pcrResponseTimeMins: 'Free Legal Aid & POCSO Counsel',
    verified: true
  }
];

export const CALMING_VOICE_PERSONAS: CalmingVoicePersona[] = [
  {
    id: 'aarohi-sister',
    name: 'Aarohi',
    title: 'Empathetic Companion & Sister',
    description: 'A warm, soothing, sisterly voice designed to lower heart rate and reduce panic with steady pacing and continuous presence.',
    elevenLabsVoiceId: '21m00Tcm4TlvDq8ikWAM', // Rachel / Warm female voice
    tone: 'Empathetic & Grounding',
    sampleText: 'You are doing great. Keep walking towards Gandhi Chowk. I am right here with you, and your route is monitored every single second.'
  },
  {
    id: 'meera-counselor',
    name: 'Dr. Meera',
    title: 'Clinical Grounding Guide',
    description: 'A gentle, steady, psychologically trained voice that uses 4-7-8 rhythm pacing and practical micro-directions.',
    elevenLabsVoiceId: 'EXAVITQu4vr4xnSDxMaL', // Bella
    tone: 'Gentle & Maternal',
    sampleText: 'Take a soft breath in. Breathe out. Turn right at the illuminated pharmacy. Look ahead, the verified cab is only one turn away.'
  },
  {
    id: 'tara-vigilant',
    name: 'Tara',
    title: 'Tactical Safe-Route Co-Pilot',
    description: 'Crisp, articulate, reassuring navigator who highlights streetlights, open shops, and CCTV coverage points in real time.',
    elevenLabsVoiceId: 'AZnzlk1XvdvUeBnXmlld', // Domi
    tone: 'Crisp & Vigilant',
    sampleText: 'Ahead in 50 meters is Anu Chowk. The street on your left has 4 active CCTVs and streetlights at 100%. Stay on the right sidewalk.'
  }
];
