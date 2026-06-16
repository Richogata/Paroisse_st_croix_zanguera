import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import WaveDivider from '@/components/WaveDivider';
import { getActualiteBySlug } from '@/lib/queries';
import { formatDateLong } from '@/lib/format';

export async function generateMetadata({ params }) {
  const actualite = await getActualiteBySlug(params.slug);
  if (!actualite) return { title: 'Actualité introuvable' };
  return {
    title: actualite.titre,
    description: actualite.extrait || undefined,
  };
}

export default async function ActualiteDetailPage({ params }) {
  const actualite = await getActualiteBySlug(params.slug);

  if (!actualite) {
    notFound();
  }

  return (
    <>
      <section className="bg-cream-dark">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <Link
            href="/actualites"
            className="text-sm font-semibold text-brown hover:text-sunrise-red"
          >
            ← Toutes les actualités
          </Link>
          <p className="mt-4 text-xs uppercase tracking-wide text-sunrise-red">
            {formatDateLong(actualite.created_at)}
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-brown sm:text-4xl">
            {actualite.titre}
          </h1>
        </div>
      </section>

      {actualite.image_url && (
        <div className="relative mx-auto aspect-[16/9] w-full max-w-4xl overflow-hidden bg-brown/10 sm:rounded-2xl sm:px-6">
          <Image
            src={actualite.image_url}
            alt=""
            fill
            className="object-cover sm:rounded-2xl"
            priority
          />
        </div>
      )}

      <WaveDivider />

      <section className="bg-cream">
        <div className="prose-paroisse mx-auto max-w-3xl px-4 py-12 text-base leading-relaxed text-ink/85 sm:px-6 sm:text-lg">
          {actualite.contenu.split('\n\n').map((paragraphe, i) => (
            <p key={i}>{paragraphe}</p>
          ))}
        </div>
      </section>
    </>
  );
}
