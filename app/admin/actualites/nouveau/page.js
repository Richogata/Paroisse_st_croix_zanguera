import Link from 'next/link';
import AdminNav from '@/components/admin/AdminNav';
import ActualiteForm from '@/components/admin/ActualiteForm';
import { createActualite } from '../actions';

export const metadata = { title: 'Nouvelle actualité · Administration' };

export default function NouvelleActualitePage() {
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
          Nouvelle actualité
        </h1>
        <div className="mt-6">
          <ActualiteForm action={createActualite} />
        </div>
      </div>
    </>
  );
}
