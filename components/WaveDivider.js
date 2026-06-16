/**
 * Élément signature du site : trois lignes ondulées qui reprennent le motif
 * du bas du logo de la paroisse (l'horizon / les eaux vives). Utilisé comme
 * séparateur entre les sections plutôt qu'un simple trait droit.
 *
 * tone: "light"  -> ondes claires sur fond brun (pour transition vers une section sombre)
 *       "dark"   -> ondes brunes sur fond clair (par défaut)
 */
export default function WaveDivider({ tone = 'dark', className = '' }) {
  const colors =
    tone === 'light'
      ? ['#FBF6ED', '#F1E7D4', '#FCB72E']
      : ['#4A3527', '#6E5340', '#F2552C'];

  return (
    <div className={`w-full overflow-hidden leading-[0] ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="w-full h-[36px] sm:h-[48px]"
      >
        <path
          d="M0,38 C150,8 350,8 500,30 C650,52 800,52 950,30 C1050,16 1150,16 1200,30 L1200,60 L0,60 Z"
          fill={colors[0]}
          opacity="0.55"
        />
        <path
          d="M0,46 C180,18 360,18 540,38 C700,56 880,56 1060,36 C1120,30 1170,30 1200,36 L1200,60 L0,60 Z"
          fill={colors[1]}
          opacity="0.65"
        />
        <path
          d="M0,54 C220,32 420,32 600,48 C780,64 960,64 1140,46 C1170,43 1190,43 1200,45 L1200,60 L0,60 Z"
          fill={colors[2]}
        />
      </svg>
    </div>
  );
}
