export const fishermen = [
  { id: 'F001', name: 'Pêcheur #F001', phone: '+221 77 *** ** 01', language: 'Wolof', deviceId: 'MS-2026-001', location: { lat: 14.7167, lng: -17.4677 }, status: 'active' as const, boatName: 'Jàmm baax', lastSeen: '2026-05-04T09:30:00Z' },
  { id: 'F002', name: 'Pêcheur #F002', phone: '+221 77 *** ** 02', language: 'Pulaar', deviceId: 'MS-2026-002', location: { lat: 14.8500, lng: -17.0333 }, status: 'active' as const, boatName: 'Ndar', lastSeen: '2026-05-04T09:45:00Z' },
  { id: 'F003', name: 'Pêcheur #F003', phone: '+221 77 *** ** 03', language: 'Serer', deviceId: 'MS-2026-003', location: { lat: 14.9000, lng: -17.2000 }, status: 'alert' as const, boatName: 'Kër gui', lastSeen: '2026-05-04T10:00:00Z' },
  { id: 'F004', name: 'Pêcheur #F004', phone: '+221 77 *** ** 04', language: 'Wolof', deviceId: 'MS-2026-004', location: { lat: 14.7500, lng: -17.3500 }, status: 'active' as const, boatName: 'Sunu rekk', lastSeen: '2026-05-04T08:15:00Z' },
  { id: 'F005', name: 'Pêcheur #F005', phone: '+221 77 *** ** 05', language: 'Wolof', deviceId: 'MS-2026-005', location: { lat: 14.6800, lng: -17.4200 }, status: 'active' as const, boatName: 'Sopi', lastSeen: '2026-05-04T09:00:00Z' },
  { id: 'F006', name: 'Pêcheur #F006', phone: '+221 77 *** ** 06', language: 'Pulaar', deviceId: 'MS-2026-006', location: { lat: 14.8200, lng: -17.1500 }, status: 'active' as const, boatName: 'Bëggal', lastSeen: '2026-05-04T10:30:00Z' },
];

export const alerts = [
  { id: 'ALT-001', fishermanId: 'F003', type: 'SOS_MANUAL' as const, location: { lat: 14.9000, lng: -17.2000 }, timestamp: '2026-05-04T10:00:00Z', status: 'pending' as const, severity: 'critical' as const, description: 'Alerte SOS manuelle déclenchée — pirogue en détresse (Pêcheur #F003)' },
  { id: 'ALT-002', fishermanId: 'F001', type: 'LOW_BATTERY' as const, location: { lat: 14.7167, lng: -17.4677 }, timestamp: '2026-05-04T08:45:00Z', status: 'resolved' as const, severity: 'warning' as const, description: 'Batterie bracelet < 20% — recharge conseillée (Pêcheur #F001)' },
  { id: 'ALT-003', fishermanId: 'F005', type: 'DROWNING_AUTO' as const, location: { lat: 14.6800, lng: -17.4200 }, timestamp: '2026-05-04T09:05:00Z', status: 'resolved' as const, severity: 'critical' as const, description: 'Détection automatique immersion prolongée — 8 sec (Pêcheur #F005)' },
  { id: 'ALT-004', fishermanId: 'F002', type: 'STORM_WARNING' as const, location: { lat: 14.8500, lng: -17.0333 }, timestamp: '2026-05-04T09:50:00Z', status: 'active' as const, severity: 'warning' as const, description: 'Zone à risque houle forte — retour conseillé (Pêcheur #F002)' },
];

export const stats = {
  totalDevices: 1247,
  activeAlerts: 3,
  rescuedThisMonth: 18,
  responseTimeAvg: 6.2,
  batteryAvg: 78,
  coveragePercent: 94,
};

export const riskZones = [
  { id: 'RZ-01', name: 'Pointe des Almadies', riskLevel: 'high' as const, lat: 14.7428, lng: -17.5106, reason: 'Courants forts et récifs' },
  { id: 'RZ-02', name: 'Langue de Barbarie', riskLevel: 'high' as const, lat: 15.8500, lng: -16.5167, reason: 'Houle saisonnière extrême' },
  { id: 'RZ-03', name: 'Casamance Sud', riskLevel: 'medium' as const, lat: 12.5500, lng: -16.7500, reason: 'Trafic maritime dense' },
  { id: 'RZ-04', name: 'Cap-Vert', riskLevel: 'low' as const, lat: 14.7167, lng: -17.4677, reason: 'Conditions normales' },
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
    image: 'https://readdy.ai/api/search-image?query=A%20sleek%20modern%20maritime%20IoT%20wearable%20bracelet%20with%20a%20bright%20OLED%20screen%20showing%20GPS%20coordinates%20and%20an%20SOS%20button%2C%20floating%20above%20dark%20ocean%20water%20with%20glowing%20teal%20circuit%20patterns%2C%20dark%20navy%20blue%20silicone%20band%20with%20small%20Senegal%20flag%20details%2C%20futuristic%20tech%20aesthetic%20with%20cyan%20accent%20lights%2C%20simple%20dark%20gradient%20background%2C%20product%20photography%20style%2C%20high%20detail%2C%20studio%20lighting&width=600&height=500&seq=1&orientation=landscape',
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
];

export const appMobileMenu = [
  { label: 'Accueil', icon: 'ri-home-5-line', path: '/app-mobile' },
  { label: 'Ma carte', icon: 'ri-map-pin-2-line', path: '/app-mobile/carte' },
  { label: 'Alertes', icon: 'ri-notification-3-line', path: '/app-mobile/alertes' },
  { label: 'Voisin de Mer', icon: 'ri-ship-line', path: '/app-mobile/voisins' },
  { label: 'Mon profil', icon: 'ri-user-3-line', path: '/app-mobile/profil' },
];