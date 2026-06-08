export const fishermen = [
  { id: 'F001', name: 'Pêcheur #F001', phone: '+221 77 *** ** 01', language: 'Wolof', deviceId: 'MS-2026-001', location: { lat: 14.7167, lng: -17.4677 }, status: 'active' as const, boatName: 'Jàmm baax', lastSeen: '2026-05-05T08:30:00Z' },
  { id: 'F002', name: 'Pêcheur #F002', phone: '+221 77 *** ** 02', language: 'Pulaar', deviceId: 'MS-2026-002', location: { lat: 14.8500, lng: -17.0333 }, status: 'active' as const, boatName: 'Ndar', lastSeen: '2026-05-05T08:45:00Z' },
  { id: 'F003', name: 'Pêcheur #F003', phone: '+221 77 *** ** 03', language: 'Serer', deviceId: 'MS-2026-003', location: { lat: 14.9000, lng: -17.2000 }, status: 'alert' as const, boatName: 'Kër gui', lastSeen: '2026-05-05T09:00:00Z' },
  { id: 'F004', name: 'Pêcheur #F004', phone: '+221 77 *** ** 04', language: 'Wolof', deviceId: 'MS-2026-004', location: { lat: 14.7500, lng: -17.3500 }, status: 'active' as const, boatName: 'Sunu rekk', lastSeen: '2026-05-05T07:15:00Z' },
  { id: 'F005', name: 'Pêcheur #F005', phone: '+221 77 *** ** 05', language: 'Wolof', deviceId: 'MS-2026-005', location: { lat: 14.6800, lng: -17.4200 }, status: 'active' as const, boatName: 'Sopi', lastSeen: '2026-05-05T08:00:00Z' },
  { id: 'F006', name: 'Pêcheur #F006', phone: '+221 77 *** ** 06', language: 'Pulaar', deviceId: 'MS-2026-006', location: { lat: 14.8200, lng: -17.1500 }, status: 'active' as const, boatName: 'Bëggal', lastSeen: '2026-05-05T09:30:00Z' },
];

export const medicalProfiles = [
  { fishermanId: 'F001', bloodType: 'O+', allergies: ['Poisson — réaction modérée'], medication: 'Ventoline SOS', emergencyContact: { name: 'Contact #C001', phone: '+221 77 *** ** 01' }, medicalConditions: 'Asthme léger' },
  { fishermanId: 'F002', bloodType: 'A+', allergies: [], medication: 'Aucun', emergencyContact: { name: 'Contact #C002', phone: '+221 77 *** ** 02' }, medicalConditions: 'Aucun' },
  { fishermanId: 'F003', bloodType: 'B+', allergies: ['Shellfish'], medication: 'Anti-histaminique', emergencyContact: { name: 'Contact #C003', phone: '+221 77 *** ** 03' }, medicalConditions: 'Tension légère' },
];

export const alerts = [
  { id: 'ALT-001', fishermanId: 'F003', type: 'SOS_MANUAL' as const, location: { lat: 14.9000, lng: -17.2000 }, timestamp: '2026-05-05T09:00:00Z', status: 'pending' as const, severity: 'critical' as const, description: 'Alerte SOS manuelle — pirogue en détresse à 14.9°N, 17.2°W' },
  { id: 'ALT-002', fishermanId: 'F001', type: 'LOW_BATTERY' as const, location: { lat: 14.7167, lng: -17.4677 }, timestamp: '2026-05-04T18:45:00Z', status: 'resolved' as const, severity: 'warning' as const, description: 'Batterie bracelet < 20% — alerte résolue par rechargement' },
  { id: 'ALT-003', fishermanId: 'F005', type: 'DROWNING_AUTO' as const, location: { lat: 14.6800, lng: -17.4200 }, timestamp: '2026-05-04T16:05:00Z', status: 'resolved' as const, severity: 'critical' as const, description: 'Détection immersion 8 sec — alerte auto résolue, sauvetage effectué' },
  { id: 'ALT-004', fishermanId: 'F002', type: 'STORM_WARNING' as const, location: { lat: 14.8500, lng: -17.0333 }, timestamp: '2026-05-05T07:50:00Z', status: 'active' as const, severity: 'warning' as const, description: 'Zone à risque houle forte — rappel retour conseillé' },
  { id: 'ALT-005', fishermanId: 'F006', type: 'HEART_RATE_ALERT' as const, location: { lat: 14.8200, lng: -17.1500 }, timestamp: '2026-05-05T09:15:00Z', status: 'active' as const, severity: 'warning' as const, description: 'Fréquence cardiaque anormale > 120 bpm — monitoring' },
];

export const stats = {
  totalDevices: 1247,
  activeAlerts: 2,
  pendingAlerts: 1,
  rescuedThisMonth: 18,
  responseTimeAvg: 6.2,
  batteryAvg: 78,
  coveragePercent: 94,
  totalRescuesYTD: 47,
  meshNodesActive: 312,
};

export const riskZones = [
  { id: 'RZ-01', name: 'Pointe des Almadies', riskLevel: 'high' as const, lat: 14.7428, lng: -17.5106, reason: 'Courants forts et récifs — Prévision IA : 82% risque aujourd\'hui' },
  { id: 'RZ-02', name: 'Langue de Barbarie', riskLevel: 'high' as const, lat: 15.8500, lng: -16.5167, reason: 'Houle saisonnière extrême — Prévision IA : 91% risque' },
  { id: 'RZ-03', name: 'Casamance Sud', riskLevel: 'medium' as const, lat: 12.5500, lng: -16.7500, reason: 'Trafic maritime dense — Prévision IA : 45% risque' },
  { id: 'RZ-04', name: 'Cap-Vert', riskLevel: 'low' as const, lat: 14.7167, lng: -17.4677, reason: 'Conditions normales — Prévision IA : 12% risque' },
  { id: 'RZ-05', name: 'Mbour-Saly', riskLevel: 'medium' as const, lat: 14.3500, lng: -16.9500, reason: 'Vent fort en fin d\'après-midi — Prévision IA : 58% risque 14h-18h' },
];

export const roadmap = [
  { step: 1, phase: 'Prototypage Industriel', description: 'Signature du protocole avec le PTN de Diamniadio. Assemblage du prototype Mool-Safe et premières validations techniques.', status: 'in_progress' as const, date: '2026' },
  { step: 2, phase: 'Intégration Logicielle', description: "Couplage de Mool-Control avec les systèmes de la Marine Nationale. Développement de l'interface IA de prédiction des risques.", status: 'pending' as const, date: '2026 — 2027' },
  { step: 3, phase: 'Test Grandeur Nature', description: "Déploiement pilote à Saint-Louis et aux Almadies pendant la saison des fortes houles. Collecte de retours terrain.", status: 'pending' as const, date: '2027' },
  { step: 4, phase: 'Généralisation Nationale', description: "Déploiement national du bracelet Mool-Safe comme équipement obligatoire subventionné par le New Deal Technologique.", status: 'pending' as const, date: '2028+' },
];

export const partners = [
  { name: 'Primature — New Deal Technologique', role: "Maîtrise d'Ouvrage", icon: 'ri-government-line' },
  { name: 'SENUM SA — Cloud National', role: 'Infrastructure Cloud', icon: 'ri-cloud-line' },
  { name: 'Marine Nationale du Sénégal', role: 'Opérateur Maritime', icon: 'ri-ship-line' },
  { name: 'PTN Diamniadio', role: 'Assemblage & Industrialisation', icon: 'ri-building-2-line' },
  { name: 'DER/FJ', role: 'Financement & Entrepreneuriat', icon: 'ri-funds-line' },
  { name: 'Fonds Économie Bleue', role: 'Financement', icon: 'ri-water-flash-line' },
];

export const features = [
  {
    icon: 'ri-shield-check-line',
    title: 'Souveraineté des Données',
    description: "Données stockées exclusivement sur le Cloud National SENUM SA. Aucun transfert vers des serveurs étrangers. Maîtrise totale par l'État du Sénégal.",
    color: 'senegal-green',
  },
  {
    icon: 'ri-smartphone-line',
    title: 'Inclusion Technologique',
    description: "Interface 100% visuelle et vocale en Wolof, Pulaar et Serer. L'IoT maritime accessible à tous, même sans alphabétisation.",
    color: 'senegal-yellow',
  },
  {
    icon: 'ri-alarm-warning-line',
    title: 'Sécurité Publique Digitalisée',
    description: 'Commandement temps réel pour la Marine Nationale et la Gendarmerie Maritime. IA prédictive des zones à risque selon courants et historiques.',
    color: 'senegal-red',
  },
];

export const components = [
  {
    name: 'Mool-Safe',
    subtitle: 'Le Bracelet Connecté Maritime',
    specs: [
      { label: 'Assemblage', value: 'Made in Sénégal — PTN Diamniadio' },
      { label: 'Signal', value: 'Dual-Signal fréquences nationales sécurisées' },
      { label: 'Détection', value: 'Alerte SOS automatique après 5 sec immersion' },
      { label: 'Étanchéité', value: 'IP68 — immersion continue' },
      { label: 'Autonomie', value: '72h en mode actif' },
      { label: 'GPS', value: 'Précision < 3m en mer' },
    ],
    image: 'https://readdy.ai/api/search-image?query=A%20sleek%20modern%20maritime%20IoT%20wearable%20bracelet%20with%20a%20bright%20OLED%20screen%20showing%20GPS%20coordinates%20and%20an%20SOS%20button%2C%20floating%20above%20dark%20ocean%20water%20with%20glowing%20teal%20circuit%20patterns%2C%20dark%20navy%20silicone%20band%20with%20small%20Senegal%20flag%20details%2C%20futuristic%20tech%20aesthetic%20with%20cyan%20accent%20lights%2C%20simple%20dark%20gradient%20background%2C%20product%20photography%20style%2C%20high%20detail%2C%20studio%20lighting&width=600&height=500&seq=1&orientation=landscape',
  },
  {
    name: 'Mool-Control',
    subtitle: 'Plateforme de Commandement',
    specs: [
      { label: 'Dashboard', value: 'Tableau de bord temps réel Marine Nationale' },
      { label: 'IA Prédictive', value: 'Cartographie des zones à risque en temps réel' },
      { label: 'Mobile', value: 'App inclusive visuelle & vocale' },
      { label: 'Langues', value: 'Wolof, Pulaar, Serer + Français' },
      { label: 'Santé', value: 'Intégration dossier médical universel' },
      { label: 'Cloud', value: 'Hébergement 100% SENUM SA' },
    ],
    image: 'https://readdy.ai/api/search-image?query=A%20futuristic%20maritime%20command%20center%20dashboard%20displayed%20on%20multiple%20screens%20showing%20a%20real-time%20map%20of%20Senegal%20coastline%20with%20boat%20tracking%20dots%2C%20dark%20navy%20blue%20and%20teal%20color%20scheme%2C%20holographic%20interface%20elements%2C%20radar%20waves%2C%20clean%20minimal%20UI%20design%2C%20professional%20military-grade%20monitoring%20station%20aesthetic%2C%20glowing%20cyan%20data%20points%20on%20dark%20background%2C%20no%20text&width=600&height=500&seq=2&orientation=landscape',
  },
  {
    name: 'Voisin de Mer',
    subtitle: 'Protocole de Solidarité Maritime',
    specs: [
      { label: 'Alerte proximité', value: 'Signal vers pirogues environnantes < 10 min' },
      { label: 'Maillage', value: 'Réseau citoyen de solidarité en mer' },
      { label: 'Réactivité', value: 'Intervention citoyenne avant secours officiels' },
      { label: 'Couverture', value: 'Toute la zone économique exclusive' },
      { label: 'Confidentialité', value: 'Données anonymisées, sécurisées' },
      { label: 'Gratuité', value: 'Service communautaire sans abonnement' },
    ],
    image: 'https://readdy.ai/api/search-image?query=Traditional%20Senegalese%20wooden%20fishing%20pirogues%20on%20calm%20Atlantic%20ocean%20at%20golden%20hour%20with%20warm%20orange%20light%2C%20multiple%20colorful%20boats%20spread%20across%20the%20water%20forming%20a%20protective%20circle%20pattern%2C%20serene%20maritime%20scene%2C%20soft%20golden%20sky%20reflections%20on%20water%2C%20documentary%20photography%20style%2C%20no%20text%2C%20peaceful%20ocean%20atmosphere%20with%20African%20coastal%20village%20in%20distant%20background&width=600&height=500&seq=3&orientation=landscape',
  },
];

export const impactStats = [
  { value: '90%', label: 'Réduction des disparitions en mer', icon: 'ri-lifebuoy-line' },
  { value: '1,247', label: 'Bracelets déployés', icon: 'ri-time-line' },
  { value: '6.2 min', label: 'Temps de réponse moyen', icon: 'ri-timer-flash-line' },
  { value: '100%', label: 'Données hébergées au Sénégal', icon: 'ri-server-line' },
];

export const dashboardMenu = [
  { label: "Vue d'ensemble", icon: 'ri-dashboard-line', path: '/dashboard' },
  { label: 'Carte temps réel', icon: 'ri-map-2-line', path: '/dashboard/carte' },
  { label: 'Alertes', icon: 'ri-alarm-warning-line', path: '/dashboard/alertes' },
  { label: 'Pêcheurs', icon: 'ri-group-line', path: '/dashboard/pecheurs' },
  { label: 'Rapports', icon: 'ri-bar-chart-grouped-line', path: '/dashboard/rapports' },
  { label: 'Prédiction IA', icon: 'ri-brain-line', path: '/dashboard/prediction' },
  { label: 'Météo Marine', icon: 'ri-sun-cloudy-line', path: '/dashboard/meteo' },
];

export const appMobileMenu = [
  { label: 'Accueil', icon: 'ri-home-5-line', path: '/app-mobile' },
  { label: 'Ma carte', icon: 'ri-map-pin-2-line', path: '/app-mobile/carte' },
  { label: 'Alertes', icon: 'ri-notification-3-line', path: '/app-mobile/alertes' },
  { label: 'Voisin de Mer', icon: 'ri-ship-line', path: '/app-mobile/voisins' },
  { label: 'Météo', icon: 'ri-sun-cloudy-line', path: '/app-mobile/meteo' },
  { label: 'Mon profil', icon: 'ri-user-3-line', path: '/app-mobile/profil' },
];

// === METEO MARINE ===
export interface HourlyWeather {
  hour: string;
  go: boolean;
  temp: number;
  windSpeed: number;
  windDir: string;
  waveHeight: number;
  visibility: 'excellent' | 'good' | 'poor';
  dangerReason?: string;
  icon: string;
}

export const todayHourlyWeather: HourlyWeather[] = [
  { hour: '05:00', go: true, temp: 26, windSpeed: 8, windDir: 'NE', waveHeight: 0.5, visibility: 'excellent', icon: 'ri-moon-clear-line' },
  { hour: '06:00', go: true, temp: 27, windSpeed: 10, windDir: 'NE', waveHeight: 0.6, visibility: 'excellent', icon: 'ri-sun-line' },
  { hour: '07:00', go: true, temp: 29, windSpeed: 12, windDir: 'NE', waveHeight: 0.7, visibility: 'excellent', icon: 'ri-sun-line' },
  { hour: '08:00', go: true, temp: 31, windSpeed: 14, windDir: 'NNE', waveHeight: 0.8, visibility: 'excellent', icon: 'ri-sun-cloudy-line' },
  { hour: '09:00', go: true, temp: 32, windSpeed: 15, windDir: 'NNE', waveHeight: 0.9, visibility: 'good', icon: 'ri-sun-cloudy-line' },
  { hour: '10:00', go: true, temp: 33, windSpeed: 16, windDir: 'NNE', waveHeight: 1.0, visibility: 'good', icon: 'ri-sun-cloudy-line' },
  { hour: '11:00', go: true, temp: 34, windSpeed: 14, windDir: 'N', waveHeight: 0.9, visibility: 'excellent', icon: 'ri-sun-line' },
  { hour: '12:00', go: true, temp: 35, windSpeed: 12, windDir: 'N', waveHeight: 0.8, visibility: 'excellent', icon: 'ri-sun-line' },
  { hour: '13:00', go: true, temp: 34, windSpeed: 10, windDir: 'NNW', waveHeight: 0.7, visibility: 'excellent', icon: 'ri-sun-cloudy-line' },
  { hour: '14:00', go: true, temp: 33, windSpeed: 14, windDir: 'NW', waveHeight: 0.9, visibility: 'good', icon: 'ri-sun-cloudy-line' },
  { hour: '15:00', go: false, temp: 32, windSpeed: 22, windDir: 'NW', waveHeight: 1.8, visibility: 'poor', icon: 'ri-windy-line', dangerReason: 'Vent fort 22 kt — houle 1.8m' },
  { hour: '16:00', go: false, temp: 31, windSpeed: 24, windDir: 'NW', waveHeight: 2.1, visibility: 'poor', icon: 'ri-windy-line', dangerReason: 'Vent fort 24 kt — houle 2.1m' },
  { hour: '17:00', go: false, temp: 30, windSpeed: 26, windDir: 'NW', waveHeight: 2.3, visibility: 'poor', icon: 'ri-thunderstorms-line', dangerReason: 'Vent fort 26 kt — houle 2.3m — retour immédiat' },
  { hour: '18:00', go: false, temp: 29, windSpeed: 24, windDir: 'NW', waveHeight: 2.0, visibility: 'poor', icon: 'ri-windy-line', dangerReason: 'Vent fort 24 kt — houle 2.0m' },
  { hour: '19:00', go: false, temp: 28, windSpeed: 20, windDir: 'NW', waveHeight: 1.6, visibility: 'poor', icon: 'ri-cloudy-line', dangerReason: 'Vent 20 kt — houle 1.6m — prudence' },
  { hour: '20:00', go: true, temp: 27, windSpeed: 14, windDir: 'N', waveHeight: 0.9, visibility: 'good', icon: 'ri-moon-clear-line' },
];

export interface DailyForecast {
  day: string;
  date: string;
  go: boolean;
  maxTemp: number;
  minTemp: number;
  windMax: number;
  windDir: string;
  waveMax: number;
  condition: string;
  icon: string;
  dangerWindow?: string;
}

export const fiveDayForecast: DailyForecast[] = [
  { day: 'Aujourd\'hui', date: '5 mai', go: true, maxTemp: 35, minTemp: 26, windMax: 26, windDir: 'NW', waveMax: 2.3, condition: 'Soleil, vent fort PM', icon: 'ri-sun-cloudy-line', dangerWindow: '15h — 19h' },
  { day: 'Mercredi', date: '6 mai', go: false, maxTemp: 30, minTemp: 25, windMax: 32, windDir: 'W', waveMax: 3.1, condition: 'Tempête — MER FERMÉE', icon: 'ri-thunderstorms-line', dangerWindow: 'Toute la journée' },
  { day: 'Jeudi', date: '7 mai', go: false, maxTemp: 28, minTemp: 24, windMax: 28, windDir: 'W', waveMax: 2.8, condition: 'Houle forte persistante', icon: 'ri-windy-line', dangerWindow: 'Toute la journée' },
  { day: 'Vendredi', date: '8 mai', go: true, maxTemp: 32, minTemp: 25, windMax: 14, windDir: 'NE', waveMax: 0.9, condition: 'Calme — retour à la normale', icon: 'ri-sun-line', dangerWindow: undefined },
  { day: 'Samedi', date: '9 mai', go: true, maxTemp: 33, minTemp: 26, windMax: 12, windDir: 'NE', waveMax: 0.7, condition: 'Idéal pour la pêche', icon: 'ri-sun-line', dangerWindow: undefined },
];

// === TRAJETS ===
export interface Trip {
  id: string;
  fishermanId: string;
  date: string;
  startTime: string;
  endTime: string;
  startLocation: string;
  endLocation: string;
  distanceKm: number;
  avgSpeed: number;
  maxWave: number;
  status: 'completed' | 'aborted' | 'rescue';
  alerts: number;
}

export const recentTrips: Trip[] = [
  { id: 'T-2026-0428', fishermanId: 'F001', date: '2026-05-05', startTime: '06:00', endTime: '12:30', startLocation: 'Mole 1, Dakar', endLocation: 'Cap-Vert', distanceKm: 18.5, avgSpeed: 2.1, maxWave: 0.9, status: 'completed', alerts: 0 },
  { id: 'T-2026-0427', fishermanId: 'F002', date: '2026-05-04', startTime: '05:30', endTime: '14:00', startLocation: 'Saint-Louis', endLocation: 'Langue de Barbarie', distanceKm: 12.0, avgSpeed: 1.8, maxWave: 2.1, status: 'aborted', alerts: 1 },
  { id: 'T-2026-0426', fishermanId: 'F005', date: '2026-05-03', startTime: '07:00', endTime: '08:45', startLocation: 'Mbour', endLocation: 'Mbour (retour SOS)', distanceKm: 3.2, avgSpeed: 1.5, maxWave: 0.7, status: 'rescue', alerts: 2 },
  { id: 'T-2026-0425', fishermanId: 'F004', date: '2026-05-02', startTime: '06:15', endTime: '15:30', startLocation: 'Rufisque', endLocation: 'Almadies', distanceKm: 22.0, avgSpeed: 2.4, maxWave: 1.0, status: 'completed', alerts: 0 },
  { id: 'T-2026-0424', fishermanId: 'F006', date: '2026-05-01', startTime: '05:45', endTime: '13:00', startLocation: 'Joal-Fadiouth', endLocation: 'Zone pêche Sud', distanceKm: 15.5, avgSpeed: 2.0, maxWave: 0.8, status: 'completed', alerts: 1 },
];

// === MESH NETWORK ===
export const meshNodes = [
  { id: 'M-001', name: 'Nœud #M001', connected: true, signal: 98, lastRelay: '14s', rangeKm: 2.1, relayed: 3 },
  { id: 'M-002', name: 'Nœud #M002', connected: true, signal: 87, lastRelay: '28s', rangeKm: 1.5, relayed: 0 },
  { id: 'M-003', name: 'Nœud #M003', connected: true, signal: 42, lastRelay: '1min', rangeKm: 4.3, relayed: 12 },
  { id: 'M-004', name: 'Nœud #M004', connected: false, signal: 0, lastRelay: '15min', rangeKm: 0, relayed: 0 },
  { id: 'M-005', name: 'Nœud #M005', connected: true, signal: 95, lastRelay: '8s', rangeKm: 1.8, relayed: 1 },
];

export const meshStats = {
  activeNodes: 312,
  totalNodes: 1247,
  avgRangeKm: 3.2,
  relayedToday: 47,
  offlineZones: ['RZ-02 Langue de Barbarie', 'Casamance lointain'],
};

// === NOTIFICATIONS ===
export interface Notification {
  id: string;
  type: 'alert' | 'weather' | 'system' | 'mesh';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export const mockNotifications: Notification[] = [
  { id: 'N-001', type: 'weather', title: 'Alerte météo 15h', message: 'Vent NW 26 kt attendu à 15h00 — retour conseillé avant 14h30', timestamp: '2026-05-05T08:00:00Z', read: false },
  { id: 'N-002', type: 'alert', title: 'SOS Pêcheur #F003', message: 'Alerte SOS manuelle en cours — pirogue Kër gui en détresse', timestamp: '2026-05-05T09:00:00Z', read: false },
  { id: 'N-003', type: 'system', title: 'Mise à jour firmware', message: 'Mool-Safe v2.1.4 disponible — performance GPS améliorée', timestamp: '2026-05-04T22:00:00Z', read: true },
  { id: 'N-004', type: 'mesh', title: 'Voisin de Mer — 3 proches', message: '3 pirogues Mool-Safe à moins de 2.5 km — réseau actif', timestamp: '2026-05-05T07:30:00Z', read: true },
  { id: 'N-005', type: 'weather', title: 'MER FERMÉE demain', message: 'Tempête annoncée mercredi 6 mai — mer fermée toute la journée', timestamp: '2026-05-05T06:00:00Z', read: false },
];

// === WIREFRAME DATA ===
export const wireframeSections = [
  {
    name: 'Homepage / Landing',
    description: 'Page d\'accueil immersive avec hero, 3 piliers, composantes, stats, roadmap, partenaires',
    screens: ['Hero avec bracelet flottant', 'Section 3 piliers stratégiques', '3 composantes (alternées)', 'Chiffres d\'impact', 'Feuille de route', 'Écosystème partenaires', 'CTA final'],
    interactions: ['Scroll reveal animations', 'Hover sur cartes partenaires', 'Navigation fluide entre sections'],
  },
  {
    name: 'Simulation Bracelet',
    description: 'Interface interactive du bracelet Mool-Safe avec écran OLED, capteurs, SOS',
    screens: ['Écran bracelet OLED simulé', 'Panneau contrôles simulation', 'Journal événements temps réel', 'Fiche technique Mool-Safe'],
    interactions: ['Bouton SOS physique (5 sec countdown)', 'Simulateur noyade auto (immersion)', 'Batterie faible simulation', 'Réinitialisation', 'Valeurs capteurs en live'],
  },
  {
    name: 'Simulation App Mobile',
    description: 'Interface téléphone avec 6 onglets : Accueil, Carte, Alertes, Voisins, Météo, Profil',
    screens: ['Accueil — SOS + stats + alertes + météo', 'Carte Google Maps embarquée', 'Liste alertes temps réel', 'Protocole Voisin de Mer', 'Météo — GO/NO-GO + heures dangereuses', 'Profil + dossier médical'],
    interactions: ['Changement langue (Wolof/Pulaar/Serer)', 'Bouton SOS avec vibration simulée', 'Switch onglets bottom nav', 'Météo scrollable par heure', 'GO/NO-GO visuel instantané'],
  },
  {
    name: 'Dashboard Mool-Control',
    description: 'Tableau de bord professionnel pour la Marine Nationale',
    screens: ['Stats cards globaux', 'Carte temps réel Sénégal', 'Alertes en cours + actions', 'Zones à risque IA', 'Alertes résolues (table)', 'Météo marine dashboard', 'Historique trajets', 'Mode Mesh Network'],
    interactions: ['Clic alerte → détail + confirmer prise en charge', 'Carte interactive avec points', 'Tri tableau alertes', 'Prédiction IA hover', 'Toggle mode Mesh'],
  },
];