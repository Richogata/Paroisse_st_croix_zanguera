import { datesHistoriques, historiqueTexte, paroisse } from '@/lib/data';
import { getEquipePastorale } from '@/lib/queries';
import WaveDivider from '@/components/WaveDivider';

export const metadata = {
  title: 'Historique',
  description: 'Histoire de la Paroisse Sainte Croix de Sanguera, de 1922 à aujourd’hui.',
};

export default async function HistoriquePage() {
  const equipe = await getEquipePastorale();

  return (
    <>
      <section className="bg-cream-dark">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6">
          <p className="font-display text-sm uppercase tracking-[0.25em] text-sunrise-red">
            {paroisse.archidiocese}
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-brown sm:text-4xl">
            Notre histoire
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-ink/70 sm:text-base">
            De 1922 à aujourd&apos;hui, plus d&apos;un siècle de présence de
            l&apos;Église catholique à Sanguéra.
          </p>
        </div>
      </section>

      <WaveDivider />

      {/* FRISE CHRONOLOGIQUE */}
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <ol className="relative space-y-8 border-l-2 border-sunrise-gold/40 pl-6 sm:pl-8">
            {datesHistoriques.map((d) => (
              <li key={d.annee} className="relative">
                <span className="absolute -left-[34px] top-0 flex h-7 w-7 items-center justify-center rounded-full bg-sunrise-red sm:-left-[42px] sm:h-8 sm:w-8" />
                <p className="font-display text-xl font-semibold text-sunrise-red sm:text-2xl">
                  {d.annee}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink/75 sm:text-base">
                  {d.texte}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <WaveDivider />

      {/* TEXTE COMPLET */}
      <section className="bg-cream-dark">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <h2 className="font-display text-2xl font-semibold text-brown">
            Le récit complet
          </h2>
          <div className="prose-paroisse mt-4 font-scripture text-base leading-relaxed text-ink/85 sm:text-lg">
            {historiqueTexte.split('\n\n').map((paragraphe, i) => (
              <p key={i}>{paragraphe}</p>
            ))}
          </div>
          <p className="mt-6 text-right text-sm italic text-ink/50">
            — Récit recueilli le dimanche 30 octobre 2022
          </p>
        </div>
      </section>

      <WaveDivider />

      {/* EQUIPE PASTORALE (dynamique, gérée depuis l'admin) */}
      {equipe.length > 0 && (
        <section className="bg-cream">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
            <h2 className="text-center font-display text-2xl font-semibold text-brown">
              L&apos;équipe pastorale aujourd&apos;hui
            </h2>
            <div
              className={`mt-6 grid gap-4 ${
                equipe.length === 1
                  ? 'mx-auto max-w-xs'
                  : equipe.length === 2
                  ? 'mx-auto max-w-xl sm:grid-cols-2'
                  : 'sm:grid-cols-3'
              }`}
            >
              {equipe.map((p) => (
                <div
                  key={p.id}
                  className="card-3d rounded-2xl border border-brown/10 bg-cream-dark/60 p-5 text-center"
                >
                  <p className="font-display text-lg font-semibold text-brown">
                    {p.nom}
                  </p>
                  <p className="mt-1 text-sm uppercase tracking-wide text-sunrise-red">
                    {p.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
