# SEN-MOOL PROTECT 2.0 — Prototype Web Fonctionnel

## 1. Description du Projet
Prototype web complet du système SEN-MOOL PROTECT 2.0, un bracelet connecté maritime de souveraineté numérique sénégalaise. Le prototype démontre les 3 composantes du projet :
- **Mool-Safe** : bracelet IoT avec détection de noyade, GPS, SOS
- **App Mobile** : interface inclusive (visuelle/vocale, langues nationales) pour les pêcheurs
- **Mool-Control Dashboard** : tableau de bord temps réel pour la Marine Nationale avec IA de prédiction des risques
- **Météo Marine GO/NO-GO** : conditions en temps réel avec fenêtres dangereuses et prévisions 5 jours
- **Réseau Mesh (Voisin de Mer)** : communication p2p entre bracelets hors-ligne
- **Wireframes** : schémas blueprint d'architecture et de parcours utilisateur
- **Maquettes** : documentation technique détaillée du design final
- **Impact Socio-Économique** : études de cas et témoignages simulés

**Objectif** : Maximiser les chances au concours New Deal Technologique 2026 via un prototype web fonctionnel, visuellement pro et immersif.

**Public cible** : jury du concours, décideurs gouvernementaux, partenaires potentiels

## 2. Structure des Pages
- `/` — **Accueil / Landing Page** : présentation du projet, hero avec le bracelet, les 3 piliers, feuille de route, partenaires
- `/bracelet` — **Simulation Mool-Safe** : interface du bracelet en temps réel (GPS, capteurs, SOS, batterie, mode Mesh)
- `/app-mobile` — **Simulation App Mobile** : interface responsive simulant l'app pêcheur (alertes, profil, carte, voisin de mer, météo GO/NO-GO)
- `/dashboard` — **Mool-Control Dashboard** : tableau de bord Marine Nationale (carte temps réel, alertes, statistiques, prédiction IA, météo, trajets, Mesh)
- `/wireframes` — **Wireframes Blueprint** : schémas schématiques monochrome des interfaces, flux utilisateur, parcours d'alerte
- `/maquettes` — **Maquettes Fonctionnelles** : documentation technique, architecture 5 couches, comparatif interfaces, responsive design
- `/impact` — **Impact Socio-Économique** : études de cas de sauvetages simulés, témoignages familles/marine, infographie chiffrée
- `/presentation` — **Mode Présentation** : slideshow auto-navigant avec diapositives, progress bar, contrôles clavier (accessible via URL directe, non dans la nav principale)

## 3. Fonctionnalités Principales
- [x] Landing page immersive avec hero animé
- [x] Simulation du bracelet Mool-Safe (données GPS, vitesse, cap, batterie, SOS, mode Mesh)
- [x] Simulation de l'app mobile pêcheur (interface simplifiée, alertes, carte, profil, météo GO/NO-GO)
- [x] Dashboard Mool-Control avec carte, alertes temps réel, statistiques, météo marine, historique trajets
- [x] Système d'alertes SOS simulées avec notifications toast
- [x] Protocole "Voisin de Mer" simulé (Mesh Network)
- [x] Météo marine GO/NO-GO avec heures dangereuses et prévisions 5 jours
- [x] Notification badge temps réel sur le dashboard
- [x] Dossier médical partagé en cas de SOS
- [x] Navigation fluide entre les interfaces
- [x] Données mock réalistes (positions Sénégal, Saint-Louis, Almadies, conditions météo)
- [x] Animations et transitions pro pour l'impact visuel
- [x] Wireframes blueprint schématiques
- [x] Maquettes & documentation architecture
- [x] Page Impact socio-économique avec études de cas
- [x] Transitions fluides entre pages (fade + slide)
- [x] SEO optimisé (mots-clés : souveraineté numérique, économie bleue, sécurité maritime)

## 4. Modèle de Données
Pas de base de données nécessaire pour le prototype. Toutes les données sont en mock (src/mocks/). Si besoin d'intégration Supabase plus tard :
- Table `devices` : id, serial, status, last_position, battery, owner_name
- Table `alerts` : id, device_id, type, location, timestamp, status, responder
- Table `fishermen` : id, name, phone, language, medical_profile, device_id
- Table `trips` : id, fisherman_id, start_time, end_time, distance_km, status
- Table `weather` : id, location, hour, go_status, wind_speed, wave_height

## 5. Intégrations Backend
- **Supabase** : non connecté actuellement. Optionnel pour future authentification dashboard.
- **Shopify** : non applicable.
- **Stripe** : non applicable.
- Pour le prototype : mock data uniquement, pas de backend nécessaire.

## 6. Plan de Développement par Phases

### Phase 1 : Landing Page + Structure Globale ✅
- **Objectif** : Créer la page d'accueil professionnelle et la navigation
- **Livrables** : Hero avec image bracelet, section 3 piliers, section feuille de route, footer, navbar responsive

### Phase 2 : Simulation Bracelet Mool-Safe ✅
- **Objectif** : Créer la page simulation du bracelet connecté
- **Livrables** : Interface bracelet avec écran simulé, GPS, SOS, données temps réel mockées, mode Mesh Network

### Phase 3 : Simulation App Mobile ✅
- **Objectif** : Créer la page simulant l'application mobile pêcheur
- **Livrables** : Interface mobile-style, alertes, carte, profil, voisin de mer, météo GO/NO-GO, prévisions 5j, dossier médical

### Phase 4 : Dashboard Mool-Control ✅
- **Objectif** : Créer le tableau de bord pour la Marine Nationale
- **Livrables** : Carte avec positions, alertes temps réel, statistiques, prédiction IA, météo marine, historique trajets, mode Mesh, notification badge

### Phase 5 : Wireframes, Maquettes & Documentation ✅
- **Objectif** : Créer les pages de wireframes schématiques et maquettes finales
- **Livrables** : Wireframes blueprint (monochrome, schématique), Maquettes détaillées (architecture 5 couches, flux de données, comparatif)

### Phase 6 : Impact Socio-Économique ✅
- **Objectif** : Créer la page impact
- **Livrables** : Page impact avec études de cas, témoignages simulés, infographie chiffrée

### Phase 7 : Transitions + Polish Final ✅
- **Objectif** : Finaliser les animations de transition entre pages et le polish visuel
- **Livrables** : Composant PageTransition, animations fade/slide sur toutes les routes, révision responsive
