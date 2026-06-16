import { listeCCCB, paroisse } from '@/lib/data';
import WaveDivider from '@/components/WaveDivider';

export const metadata = {
  title: 'Les CCCB',
  description:
    'Liste des Communautés Chrétiennes de Catégorie de Base (CCCB) de la Paroisse Sainte Croix de Sanguera et des quartiers qu’elles couvrent.',
};

export default function CCCBPage() {
  return (
    <>
      <section className="bg-cream-dark">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6">
          <p className="font-display text-sm uppercase tracking-[0.25em] text-sunrise-red">
            {paroisse.archidiocese}
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-brown sm:text-4xl">
            Les CCCB
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-ink/70 sm:text-base">
            La paroisse est organisée en dix Communautés Chrétiennes de
            Catégorie de Base (CCCB), chacune regroupant les fidèles de
            plusieurs quartiers. Retrouvez ci-dessous la communauté qui couvre
            votre quartier.
          </p>
        </div>
      </section>

      <WaveDivider />

      <section className="bg-cream">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-2">
            {listeCCCB.map((c) => (
              <div
                key={c.numero}
                className="flex gap-4 rounded-2xl border border-brown/10 bg-cream-dark/60 p-5"
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-sunrise-red font-display text-lg font-semibold text-cream">
                  {String(c.numero).padStart(2, '0')}
                </div>
                <div>
                  <h2 className="font-display text-lg font-semibold text-brown">
                    {c.nom}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">
                    {c.quartiers.join(' · ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
