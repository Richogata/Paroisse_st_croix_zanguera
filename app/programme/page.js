import { programmeHebdomadaire, secretariat, paroisse } from '@/lib/data';
import WaveDivider from '@/components/WaveDivider';

export const metadata = {
  title: 'Programme hebdomadaire',
  description: 'Horaires des messes et célébrations de la semaine à la Paroisse Sainte Croix de Sanguera.',
};

export default function ProgrammePage() {
  return (
    <>
      <section className="bg-cream-dark">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6">
          <p className="font-display text-sm uppercase tracking-[0.25em] text-sunrise-red">
            {paroisse.archidiocese}
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-brown sm:text-4xl">
            Programme hebdomadaire
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-ink/70 sm:text-base">
            Voici les horaires habituels des célébrations à la paroisse. Les
            informations exceptionnelles (changements de dernière minute,
            messes spéciales) sont annoncées dans la rubrique{' '}
            <a href="/actualites" className="font-semibold text-sunrise-red hover:underline">
              Actualités
            </a>
            .
          </p>
        </div>
      </section>

      <WaveDivider />

      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {programmeHebdomadaire.map((jour) => (
              <div
                key={jour.jour}
                className="rounded-2xl border border-brown/10 bg-cream-dark/60 p-6"
              >
                <h2 className="font-display text-xl font-semibold text-brown">
                  {jour.jour}
                </h2>
                <ul className="mt-4 space-y-3">
                  {jour.celebrations.map((c) => (
                    <li key={c.heure + c.titre} className="flex items-baseline gap-3">
                      <span className="font-display text-lg font-semibold text-sunrise-red">
                        {c.heure}
                      </span>
                      <span className="text-sm text-ink/80">
                        {c.titre}
                        {c.detail && (
                          <span className="text-ink/50"> — {c.detail}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-brown/10 bg-brown p-6 text-cream sm:p-8">
            <h2 className="font-display text-xl font-semibold text-sunrise-gold">
              Secrétariat paroissial
            </h2>
            <p className="mt-2 text-sm font-semibold">{secretariat.jours}</p>
            <ul className="mt-1 space-y-1 text-sm text-cream/85">
              {secretariat.horaires.map((h) => (
                <li key={h.periode}>
                  {h.periode} : {h.heures}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs italic text-cream/60">{secretariat.note}</p>
          </div>

          <p className="mt-8 text-center text-sm text-ink/60">
            Pour les célébrations particulières (baptêmes, messes pour les
            malades…), consultez la page{' '}
            <a href="/celebrations" className="font-semibold text-sunrise-red hover:underline">
              Célébrations
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
