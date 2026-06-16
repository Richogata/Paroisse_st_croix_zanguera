import NewsCard from '@/components/NewsCard';
import WaveDivider from '@/components/WaveDivider';
import { getAllActualites } from '@/lib/queries';
import { paroisse } from '@/lib/data';

export const metadata = {
  title: 'Actualités',
  description: 'Toutes les actualités de la Paroisse Sainte Croix de Sanguera.',
};

export default async function ActualitesPage() {
  const actualites = await getAllActualites();

  return (
    <>
      <section className="bg-cream-dark">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6">
          <p className="font-display text-sm uppercase tracking-[0.25em] text-sunrise-red">
            {paroisse.archidiocese}
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-brown sm:text-4xl">
            Actualités de la paroisse
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-ink/70 sm:text-base">
            Annonces, événements et vie des communautés de la paroisse.
          </p>
        </div>
      </section>

      <WaveDivider />

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          {actualites.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {actualites.map((a) => (
                <NewsCard key={a.id} actualite={a} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-brown/20 p-10 text-center text-ink/60">
              Aucune actualité publiée pour le moment. Revenez bientôt !
            </div>
          )}
        </div>
      </section>
    </>
  );
}
