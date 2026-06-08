export interface Testimonial {
  id: string;
  role: string;
  name: string;
  location: string;
  quote: string;
  date: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  location: string;
  date: string;
  summary: string;
  fisherman: string;
  boatName: string;
  outcome: 'rescued' | 'prevented' | 'evacuated';
  responseTimeMin: number;
  livesSaved: number;
  economicImpact: string;
  story: string;
  beforeAfter: { before: string; after: string };
  tags: string[];
}

export interface ImpactMetric {
  label: string;
  value: string;
  sublabel: string;
  change: string;
  icon: string;
  color: 'green' | 'ocean' | 'red' | 'yellow';
}

export interface EconomicBenefit {
  title: string;
  amount: string;
  description: string;
  icon: string;
  perYear: boolean;
}

export const testimonials: Testimonial[] = [];

export const caseStudies: CaseStudy[] = [
  {
    id: 'CS-001',
    title: 'Sauvetage instantané à l\'embouchure du Saloum',
    location: 'Joal-Fadiouth, Casamance',
    date: '12 février 2026',
    summary: 'Détection auto-drowning du bracelet à 4h47 du matin. Alerte transmise en 8 secondes. Unité SAR Marine Nationale arrivée à 4h53. Pêcheur récupéré inconscient mais stable.',
    fisherman: 'Pêcheur #F-003',
    boatName: 'Sunu Ndox',
    outcome: 'rescued',
    responseTimeMin: 6,
    livesSaved: 1,
    economicImpact: '1 famille préservée (4 personnes), revenu moyen 185 000 FCFA/mois maintenu',
    story: 'À 4h47, le bracelet Mool-Safe détecte une immersion prolongée au-delà de 5 secondes. L\'alerte auto-drowning est émise instantanément via Dual-Signal + Mesh Network. Le dashboard Mool-Control reçoit l\'alerte à 4h48. La Marine Nationale lance une vedette SAR à 4h50. Le pêcheur est récupéré à 4h53 — 6 minutes après la chute. Son dossier médical partagé (groupe O+, asthme) permet aux secouristes d\'administrer les bons soins en mer.',
    beforeAfter: {
      before: 'Avant : alerte manuelle par VHF perdue dans le bruit. Découvert 4h plus tard par une pirogue voisine. Taux de survie < 30%.',
      after: 'Après : détection auto 5 sec. Réponse 6 min. Taux de survie > 95%.',
    },
    tags: ['Drowning auto', 'Dual-Signal', 'SAR Marine', 'Dossier médical'],
  },
  {
    id: 'CS-002',
    title: 'Évacuation préventive avant tempête — Météo IA',
    location: 'Langue de Barbarie, Saint-Louis',
    date: '8 mars 2026',
    summary: 'L\'IA prédictive a identifié une zone à risque houle 6h avant l\'événement. 12 pirogues alertées par push + SMS. Tous rentrés avant la tempête. 0 perte matérielle.',
    fisherman: 'Collectif — 12 pirogues',
    boatName: 'Ndar, Sopi, Jàmm',
    outcome: 'prevented',
    responseTimeMin: 360,
    livesSaved: 24,
    economicImpact: '12 pirogues préservées (~38M FCFA), revenus de 34 familles protégés',
    story: 'Le 7 mars à 22h, l\'algorithme IA de Mool-Control analyse les données météo océanographiques et historiques de sinistres. Il prédit une houle extrême > 3m pour la Langue de Barbarie le lendemain à 14h avec 91% de confiance. À 6h du matin, toutes les pirogues équipées Mool-Safe dans la zone reçoivent une alerte push vocale en wolof : "Ndox mu dëgër — demal faale". À 8h, 12 pirogues sont rentrées au port. À 14h30, la houle atteint 3.2m. Sans alerte préventive, 3 pirogues avaient déjà coulé à cet endroit l\'année précédente.',
    beforeAfter: {
      before: 'Avant : aucune alerte prédictive. Pêcheurs partent sans savoir. Tempête surprise = pertes matérielles et humaines.',
      after: 'Après : alerte 6h avant. Tous rentrés. 0 perte. 24 vies protégées.',
    },
    tags: ['IA prédictive', 'Alerte météo', 'Prévention', 'Vie sauvée'],
  },
  {
    id: 'CS-003',
    title: 'Voisin de Mer — solidarité communautaire en mer',
    location: 'Cap-Vert, Dakar',
    date: '15 mars 2026',
    summary: 'SOS manuel d\'un pêcheur dont le moteur tombe en panne. 3 pirogues Mool-Safe à moins de 3 km alertées par Mesh Network. Arrivée du premier voisin en 9 minutes.',
    fisherman: 'Pêcheur #F-002',
    boatName: 'Ndar',
    outcome: 'rescued',
    responseTimeMin: 9,
    livesSaved: 1,
    economicImpact: 'Pirogue et moteur sauvés (~2.8M FCFA), revenu famille préservé',
    story: 'Panne moteur à 8 km des côtes. Le pêcheur déclenche le SOS manuel. Son bracelet émet le signal vers le Cloud via 4G + vers les 3 pirogues Mool-Safe à proximité via Mesh Network. Le premier voisin (2.1 km) reçoit l\'alerte avec la position GPS exacte. Il arrive à 9 minutes et remorque vers le port. Pendant ce temps, le dashboard Mool-Control a aussi notifié la Marine, mais l\'intervention citoyenne a déjà résolu la situation avant même que les secours officiels ne partent.',
    beforeAfter: {
      before: 'Avant : SOS perdu en mer si hors VHF. Attente des secours officiels 45-120 min. Risque de dérive nocturne.',
      after: 'Après : SOS Mesh à 3 pirogues proches. Intervenu en 9 min. Réseau citoyen actif.',
    },
    tags: ['SOS manuel', 'Mesh Network', 'Voisin de Mer', 'Solidarité'],
  },
];

export const impactMetrics: ImpactMetric[] = [
  { label: 'Vies sauvées', value: '47', sublabel: 'depuis janvier 2026', change: '+210%', icon: 'ri-heart-pulse-line', color: 'green' },
  { label: 'Temps réponse SAR', value: '6.2 min', sublabel: 'moyenne nationale', change: '-84%', icon: 'ri-timer-flash-line', color: 'ocean' },
  { label: 'Disparitions en mer', value: '-67%', sublabel: 'vs. 2024', change: 'tendance ↓', icon: 'ri-lifebuoy-line', color: 'green' },
  { label: 'Alertes météo préventives', value: '892', sublabel: 'temps réel envoyées', change: '100% atteintes', icon: 'ri-sun-cloudy-line', color: 'yellow' },
  { label: 'Familles protégées', value: '1,247', sublabel: 'bracelets déployés', change: '+340%', icon: 'ri-group-line', color: 'ocean' },
  { label: 'Pertes matérielles évitées', value: '156M FCFA', sublabel: 'économie locale', change: 'prévention IA', icon: 'ri-money-euro-circle-line', color: 'green' },
];

export const economicBenefits: EconomicBenefit[] = [
  { title: 'Emplois directs créés', amount: '45', description: 'Assemblage, tests, support technique au PTN Diamniadio — 70% jeunes diplômés sénégalais', icon: 'ri-briefcase-line', perYear: true },
  { title: 'Revenus familles protégés', amount: '2.1M FCFA', description: 'Revenu moyen mensuel par famille de pêcheur maintenu grâce à la sécurité', icon: 'ri-wallet-3-line', perYear: false },
  { title: 'Pertes matérielles évitées', amount: '156M FCFA', description: 'Pirogues, moteurs et équipements sauvés grâce aux alertes météo préventives', icon: 'ri-ship-line', perYear: true },
  { title: 'Coût public SAR réduit', amount: '34%', description: 'Réduction des missions Search & Rescue coûteuses grâce à la prévention et au Voisin de Mer', icon: 'ri-government-line', perYear: true },
];

export const timelineEvents = [
  { date: 'Jan 2026', label: 'Phase pilote', desc: '124 bracelets déployés à Saint-Louis', highlight: true },
  { date: 'Fév 2026', label: 'Premier sauvetage', desc: 'Alerte auto-drowning — 6 min de réponse', highlight: true },
  { date: 'Mar 2026', label: 'Extension Dakar', desc: '+523 bracelets — Cap-Vert, Almadies, Mbour', highlight: false },
  { date: 'Avr 2026', label: 'IA opérationnelle', desc: 'Prédiction zones à risque temps réel', highlight: true },
  { date: 'Mai 2026', label: '600 bracelets', desc: 'Objectif : 5,000 fin 2027', highlight: false },
];

export const beforeAfterData = {
  before: [
    { label: 'Alertes par VHF', value: '45% perdus' },
    { label: 'Temps réponse SAR', value: '38 min moyenne' },
    { label: 'Disparitions / an', value: '312' },
    { label: 'Couverture zone', value: '~12% côtière' },
    { label: 'Alerte préventive', value: 'Aucune' },
  ],
  after: [
    { label: 'Alertes Dual-Signal + Mesh', value: '98% atteintes' },
    { label: 'Temps réponse SAR', value: '6.2 min moyenne' },
    { label: 'Disparitions / an (est.)', value: '< 40' },
    { label: 'Couverture zone', value: '94% côtière' },
    { label: 'Alerte préventive IA', value: '6h avant' },
  ],
};