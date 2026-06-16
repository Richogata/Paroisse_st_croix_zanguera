// Contenu statique — modifier ici + redéployer sur Vercel pour mettre à jour

export const paroisse = {
  nom: 'Paroisse Sainte Croix de Sanguera',
  archidiocese: 'Archidiocèse de Lomé',
  adresse: 'Sanguéra, Lomé - Togo (26 BP 76)',
  slogan: 'VICTOIRE TU REGNERAS, Ô CROIX TU NOUS SAUVERAS',
  telephones: ['(00228) 70 00 38 62', '97 64 31 39', '96 28 07 85'],
  emails: ['sangueraparoisse@gmail.com', 'paroissesanguera@gmail.com'],
  paiementMobile: [
    { nom: 'T-Money', numero: '+228 96 28 07 85' },
    { nom: 'Flooz', numero: '+228 71 64 09 10' },
  ],
};

export const programmeHebdomadaire = [
  {
    jour: 'Lundi à Samedi',
    celebrations: [{ heure: '5h30', titre: 'Messe matinale' }],
  },
  {
    jour: 'Jeudi',
    celebrations: [{ heure: '18h30', titre: 'Adoration eucharistique' }],
  },
  {
    jour: 'Vendredi',
    celebrations: [
      { heure: '12h15', titre: 'Messe' },
      { heure: '16h00', titre: 'Confession' },
    ],
  },
  {
    jour: 'Dimanche',
    celebrations: [
      { heure: '6h00', titre: '1ère Messe', detail: 'Langue Ewé' },
      { heure: '8h30', titre: '2ème Messe', detail: 'Langue Française' },
      { heure: '10h00', titre: '3ème Messe', detail: 'Français - Ewé' },
      { heure: '18h00', titre: '4ème Messe', detail: 'Langue Française' },
    ],
  },
];

export const secretariat = {
  jours: 'Du Lundi au Samedi',
  horaires: [
    { periode: 'Matin', heures: '6h30 à 12h00' },
    { periode: 'Soir', heures: '15h00 à 18h00' },
  ],
  note: 'Le secrétariat paroissial est fermé tous les dimanches.',
};

export const celebrationsParticulieres = [
  {
    titre: 'Baptême des enfants',
    frequence: 'Tous les 1ers samedis du mois',
    heure: '16h00',
    description: "Le sacrement du baptême pour les enfants est célébré le premier samedi de chaque mois. Inscription au secrétariat au moins un mois à l'avance.",
  },
  {
    titre: 'Messe pour les malades',
    frequence: 'Tous les 2èmes dimanches du mois',
    heure: '16h00',
    description: "Une messe est célébrée chaque deuxième dimanche du mois à l'intention des malades et de leurs familles.",
  },
  {
    titre: 'Adoration eucharistique',
    frequence: 'Tous les jeudis',
    heure: '18h30',
    description: "Temps de prière silencieuse devant le Saint-Sacrement, ouvert à tous les fidèles.",
  },
  {
    titre: 'Confessions',
    frequence: 'Tous les vendredis',
    heure: '16h00',
    description: "Le sacrement de réconciliation est proposé chaque vendredi après-midi.",
  },
];

export const sacrements = [
  { nom: 'Baptême', description: "Porte d'entrée dans la vie chrétienne.", pratique: "Enfants : 1er samedi du mois à 16h00. Inscription au secrétariat." },
  { nom: 'Eucharistie (1ère Communion)', description: "Sacrement central de la vie chrétienne.", pratique: "Préparation via la catéchèse paroissiale. Inscription au secrétariat." },
  { nom: 'Confirmation', description: "Perfectionne la grâce baptismale par le don de l'Esprit Saint.", pratique: "Via les groupes CCACJ, JEC, Scoutisme ou au secrétariat." },
  { nom: 'Réconciliation', description: "Sacrement du pardon par la miséricorde de Dieu.", pratique: "Chaque vendredi à 16h00, ou sur demande." },
  { nom: 'Onction des malades', description: "Réconfort et force pour les personnes malades.", pratique: "Messe des malades : 2ème dimanche du mois. Visite à domicile sur demande." },
  { nom: 'Mariage', description: "Alliance d'un homme et d'une femme devant Dieu et l'Église.", pratique: "Préparer le dossier plusieurs mois à l'avance. Contact : secrétariat." },
  { nom: 'Ordre (Sacerdoce)', description: "Consécration pour servir l'Église.", pratique: "Rapprochez-vous du Groupe Vocationnel ou des prêtres de la paroisse." },
];

export const listeCCCB = [
  { numero: 1, nom: 'Sainte Monique', quartiers: ['Anyigbé', "Au niveau de l'Assemblée de Dieu", 'Haute Tension'] },
  { numero: 2, nom: 'Christ-Roi', quartiers: ['Dzanyi-Kopé', 'Klikan-Kopé', 'Atidjin'] },
  { numero: 3, nom: 'Sainte Trinité', quartiers: ['Vogomé', 'Vogomé Djigbé', 'UCAO', 'Haute Tension', 'Aképédo', 'COA', 'Adjatotoa'] },
  { numero: 4, nom: 'Sainte Joséphine Bakhita', quartiers: ['Kopégan', 'Agbléliko'] },
  { numero: 5, nom: 'Notre Dame Sous la Croix', quartiers: ['Fia-Kopé', 'Dékpo', 'École Lumière', 'Mairie'] },
  { numero: 6, nom: 'Cœur des Archanges', quartiers: ['Djabèkpota', 'Koba-Kopé', 'Gaba-Kopé', 'Gbigan'] },
  { numero: 7, nom: 'La Victoire', quartiers: ['Adjidronkpo', 'Akpaka-Kopé', 'Groupe C'] },
  { numero: 8, nom: 'Sainte Croix', quartiers: ['Elavanyon', 'Au niveau de MACO', 'Zone de Madone'] },
  { numero: 9, nom: 'Saint Michel Archange', quartiers: ['Totsoanyi', 'Sébléconta', 'Wonou-Kopé', 'Avékponou'] },
  { numero: 10, nom: 'Saint Joseph', quartiers: ['EPP Agboli', 'Agbassa-Kopé', 'Fiowonou-Kopé', 'Amédomé-Kopé', 'Sémanyon-Kopé', 'Dansomon-Kopé'] },
];

export const datesHistoriques = [
  { annee: '1922', texte: "Arrivée du frère missionnaire Friedman. Un terrain est donné par Sieur Christophe GADA. Première église dédiée à la Sainte Famille." },
  { annee: '1964', texte: "Arrivée des missionnaires comboniens et création de la paroisse Christ-Roi de Kodjoviakopé." },
  { annee: '1968', texte: "Acquisition du site actuel par le RP. Giovanni Battista GOBBI." },
  { annee: '1974', texte: "Inauguration et consécration de l'église Sainte Croix le 15 août par Mgr DOSSEH-ANYRON." },
  { annee: '1989', texte: "Passage sous l'administration de la paroisse Marie Mère du Rédempteur d'Adidogomé." },
  { annee: '2000', texte: "Résolution du litige foncier avec la collectivité GADA par arrêté de la justice togolaise." },
  { annee: '2013', texte: "Érection canonique en paroisse (17 septembre). RP. Luc HODJI, curé fondateur, installé le 13 octobre." },
  { annee: '2023', texte: "Célébration des 100 ans d'évangélisation et 10 ans d'érection canonique." },
  { annee: '2024', texte: "Jubilé d'or de la consécration de l'église (15 août 1974 – 15 août 2024)." },
];

export const historiqueTexte = `Grâce à l'action du Saint Esprit et selon la recommandation de Jésus-Christ dans Matthieu 28, 19-20, l'Église universelle bâtie sur Pierre (Cf. Mt 16, 18) grandit, se répand et est arrivée chez nous aussi à Sanguéra.

En effet, en 1922, où l'Église au Togo était encore un vicariat apostolique, un frère missionnaire du nom de Friedman arriva à Sanguéra et demanda au chef du village d'alors, Togbui William HOUNKPETOR II, de lui trouver un terrain pour y implanter l'Église Catholique. Ceci fut fait et la communauté naquit. D'après nos sources, le terrain a été donné par Sieur Christophe GADA. Une église dédiée à la Sainte Famille y était construite et administrée par la cathédrale « Sacré-Cœur de Jésus » de Lomé, de 1922 à 1964.

Avec l'arrivée des missionnaires comboniens du Sacré-Cœur de Jésus le 19 janvier 1964 et la création de la Paroisse Christ-Roi de Kodjoviakopé la même année, cette nouvelle paroisse prit l'administration de la « Sainte Famille ». Vers 1966, la chapelle devint trop exiguë. Les prêtres comboniens acquirent un nouveau site en 1968, par le biais du feu RP. Giovanni Battista GOBBI et de quelques membres de la communauté dont feu Cléophas Kofi DOGBÉ. C'est le site actuel.

Cette église fut construite, dédiée à la « Sainte Croix », inaugurée et consacrée le 15 août 1974, en la solennité de l'Assomption de la Très Sainte Vierge Marie, par Mgr Robert Casimir Tonyui DOSSEH-ANYRON.

Nous passâmes sous l'administration de la paroisse Marie Mère du Rédempteur d'Adidogomé dès sa création en 1989. Pendant 24 ans, nous avons bénéficié des missionnaires qui nous ont amenés à ouvrir d'autres stations secondaires.

Les décrets du 17 septembre 2013 firent de nous une paroisse avec pour curé fondateur le RP. Luc HODJI. La Paroisse a célébré 100 ans d'évangélisation couplés des 10 ans d'érection canonique en 2023.

Nous supplions le Cœur Sacré de Jésus de combler notre curé RP. Justin AGBANOUVI des grâces de l'Esprit Saint. Amen, Alléluia !`;

export const lienTextesQuotidiens = 'https://www.aelf.org/';
