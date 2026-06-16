import { celebrationsParticulieres, paroisse } from '@/lib/data';
import WaveDivider from '@/components/WaveDivider';

export const metadata = {
  title: 'Célébrations',
  description:
    'Célébrations particulières de la Paroisse Sainte Croix de Sanguera : baptêmes, messe des malades, adoration, confessions.',
};

export default function CelebrationsPage() {
  return (
    <>
      <section className="bg-cream-dark">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6">
          <p className="font-display text-sm uppercase tracking-[0.25em] text-sunrise-red">
            {paroisse.archidiocese}
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-brown sm:text-4xl">
            Célébrations
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-ink/70 sm:text-base">
            En plus des messes quotidiennes et dominicales, la paroisse propose
            des célébrations particulières tout au long du mois.
          </p>
        </div>
      </section>

      <WaveDivider />

      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <div className="space-y-6">
            {celebrationsParticulieres.map((c) => (
              <div
                key={c.titre}
                className="rounded-2xl border border-brown/10 bg-cream-dark/60 p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-display text-xl font-semibold text-brown">
                    {c.titre}
                  </h2>
                  <span className="rounded-full bg-sunrise-red/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sunrise-red">
                    {c.heure}
                  </span>
                </div>
                <p className="mt-1 text-sm font-semibold text-sunrise-orange">
                  {c.frequence}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">
                  {c.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-ink/60">
            Pour le mariage, la confirmation ou tout autre accompagnement
            sacramentel, consultez la page{' '}
            <a href="/sacrements" className="font-semibold text-sunrise-red hover:underline">
              Sacrements
            </a>{' '}
            ou contactez le secrétariat.
          </p>
        </div>
      </section>
    </>
  );
}
