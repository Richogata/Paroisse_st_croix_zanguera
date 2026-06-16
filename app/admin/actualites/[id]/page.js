import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdminNav from '@/components/admin/AdminNav';
import ActualiteForm from '@/components/admin/ActualiteForm';
import { getActualiteByIdAdmin } from '@/lib/admin-queries';
import { updateActualite } from '../actions';

export const metadata = { title: 'Modifier l’actualité · Administration' };

export default async function ModifierActualitePage({ params }) {
  let actualite;
  try {
    actualite = await getActualiteByIdAdmin(params.id);
  } catch {
    notFound();
  }

  const action = updateActualite.bind(null, params.id);

  return (
    <>
      <AdminNav />
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <Link
          href="/admin/actualites"
          className="text-sm font-semibold text-brown hover:text-sunrise-red"
        >
          ← Actualités
        </Link>
        <h1 className="mt-3 font-display text-2xl font-semibold text-brown">
          Modifier l&apos;actualité
        </h1>
        <div className="mt-6">
          <ActualiteForm action={action} actualite={actualite} />
        </div>
      </div>
    </>
  );
}
