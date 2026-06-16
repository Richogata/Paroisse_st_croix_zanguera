import { sacrements, paroisse } from '@/lib/data';
import WaveDivider from '@/components/WaveDivider';

export const metadata = {
  title: 'Sacrements',
  description:
    'Les sept sacrements de l’Église et les démarches pratiques à la Paroisse Sainte Croix de Sanguera.',
};

export default function SacrementsPage() {
  return (
    <>
      <section className="bg-cream-dark">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6">
          <p className="font-display text-sm uppercase tracking-[0.25em] text-sunrise-red">
            {paroisse.archidiocese}
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-brown sm:text-4xl">
            Les sacrements
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-ink/70 sm:text-base">
            Les sacrements sont des signes efficaces de la grâce de Dieu,
            confiés à l&apos;Église pour accompagner les fidèles à chaque
            étape de leur vie. Voici comment vivre chacun d&apos;eux dans
            notre paroisse.
          </p>
        </div>
      </section>

      <WaveDivider />

      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <div className="space-y-6">
            {sacrements.map((s) => (
              <div
                key={s.nom}
                className="rounded-2xl border border-brown/10 bg-cream-dark/60 p-6"
              >
                <h2 className="font-display text-xl font-semibold text-brown">
                  {s.nom}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">
                  {s.description}
                </p>
                <p className="mt-3 rounded-xl bg-cream px-4 py-3 text-sm leading-relaxed text-ink/80">
                  <span className="font-semibold text-sunrise-red">
                    À la paroisse :{' '}
                  </span>
                  {s.pratique}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-ink/60">
            Une question sur l&apos;un de ces sacrements ? Le secrétariat
            paroissial reste à votre disposition aux heures d&apos;ouverture.
          </p>
        </div>
      </section>
    </>
  );
}
