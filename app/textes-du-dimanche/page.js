import Link from 'next/link';
import WaveDivider from '@/components/WaveDivider';
import TexteDimancheView from '@/components/TexteDimancheView';
import { getLatestTextesDimanche, getArchiveTextesDimanche } from '@/lib/queries';
import { lienTextesQuotidiens, paroisse } from '@/lib/data';
import { formatDateShort } from '@/lib/format';

export const metadata = {
  title: 'Textes du dimanche',
  description:
    'Lectures et méditation du dimanche pour la Paroisse Sainte Croix de Sanguera.',
};

export default async function TextesDimanchePage() {
  const texte = await getLatestTextesDimanche();
  const archives = texte ? await getArchiveTextesDimanche(texte.id) : [];

  return (
    <>
      <section className="bg-cream-dark">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6">
          <p className="font-display text-sm uppercase tracking-[0.25em] text-sunrise-red">
            {paroisse.archidiocese}
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-brown sm:text-4xl">
            Textes &amp; méditation du dimanche
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-ink/70 sm:text-base">
            Chaque semaine, retrouvez ici les lectures du dimanche et une
            méditation proposée par la paroisse.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-ink/60">
            Pour les lectures de chaque jour de la semaine, consultez{' '}
            <a
              href={lienTextesQuotidiens}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sunrise-red hover:underline"
            >
              les textes du jour sur AELF
            </a>
            .
          </p>
        </div>
      </section>

      <WaveDivider />

      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          {texte ? (
            <TexteDimancheView texte={texte} />
          ) : (
            <div className="rounded-2xl border border-dashed border-brown/20 p-10 text-center text-ink/60">
              Les textes et la méditation du prochain dimanche seront publiés
              ici prochainement.
            </div>
          )}
        </div>
      </section>

      {archives.length > 0 && (
        <>
          <WaveDivider />
          <section className="bg-cream-dark">
            <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
              <h2 className="font-display text-2xl font-semibold text-brown">
                Dimanches précédents
              </h2>
              <ul className="mt-5 space-y-3">
                {archives.map((a) => (
                  <li key={a.id}>
                    <Link
                      href={`/textes-du-dimanche/${a.id}`}
                      className="flex items-center justify-between rounded-xl border border-brown/10 bg-cream px-5 py-4 transition-colors hover:border-sunrise-red"
                    >
                      <span className="font-display text-base font-semibold text-brown">
                        {a.titre}
                      </span>
                      <span className="text-sm text-ink/60">
                        {formatDateShort(a.date_dimanche)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      )}
    </>
  );
}
