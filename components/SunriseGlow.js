/**
 * Lueur d'aube en arrière-plan, inspirée du soleil levant du logo de la
 * paroisse. A poser en position absolue dans un conteneur "relative".
 */
export default function SunriseGlow({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className="absolute left-1/2 top-[55%] h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-2xl sm:opacity-30"
        style={{
          background:
            'radial-gradient(circle, #FCB72E 0%, #F2552C 40%, #C1392B 65%, transparent 75%)',
        }}
      />
    </div>
  );
}
