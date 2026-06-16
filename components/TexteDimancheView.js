import { formatDateLong } from '@/lib/format';

function Lecture({ label, contenu }) {
  if (!contenu) return null;
  return (
    <div className="rounded-2xl border border-brown/10 bg-cream-dark/60 p-5">
      <p className="font-display text-sm font-semibold uppercase tracking-wide text-sunrise-red">
        {label}
      </p>
      <div className="prose-paroisse mt-2 font-scripture text-base leading-relaxed text-ink/85 sm:text-lg">
        {contenu.split('\n\n').map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
}

export default function TexteDimancheView({ texte }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="font-display text-sm uppercase tracking-[0.25em] text-sunrise-red">
          {formatDateLong(texte.date_dimanche)}
        </p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-brown sm:text-4xl">
          {texte.titre}
        </h1>
      </div>

      <Lecture label="Première lecture" contenu={texte.premiere_lecture} />
      <Lecture label="Psaume" contenu={texte.psaume} />
      <Lecture label="Deuxième lecture" contenu={texte.deuxieme_lecture} />
      <Lecture label="Évangile" contenu={texte.evangile} />

      {texte.partage && (
        <div className="rounded-2xl border border-sunrise-gold/30 bg-brown p-6 text-cream sm:p-8">
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-sunrise-gold">
            Partage &amp; méditation
          </p>
          <div className="prose-paroisse mt-3 text-base leading-relaxed text-cream/90 sm:text-lg">
            {texte.partage.split('\n\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
