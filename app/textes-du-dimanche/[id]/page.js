import Link from 'next/link';
import { notFound } from 'next/navigation';
import WaveDivider from '@/components/WaveDivider';
import TexteDimancheView from '@/components/TexteDimancheView';
import { getTexteDimancheById } from '@/lib/queries';

export async function generateMetadata({ params }) {
  const texte = await getTexteDimancheById(params.id);
  if (!texte) return { title: 'Texte introuvable' };
  return { title: texte.titre };
}

export default async function ArchiveTexteDimanchePage({ params }) {
  const texte = await getTexteDimancheById(params.id);

  if (!texte) {
    notFound();
  }

  return (
    <>
      <section className="bg-cream-dark">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          <Link
            href="/textes-du-dimanche"
            className="text-sm font-semibold text-brown hover:text-sunrise-red"
          >
            ← Textes du dimanche
          </Link>
        </div>
      </section>

      <WaveDivider />

      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <TexteDimancheView texte={texte} />
        </div>
      </section>
    </>
  );
}
