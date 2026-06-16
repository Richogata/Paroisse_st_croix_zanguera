import Link from 'next/link';
import AdminNav from '@/components/admin/AdminNav';
import TexteDimancheForm from '@/components/admin/TexteDimancheForm';
import { createTexteDimanche } from '../actions';

export const metadata = { title: 'Nouveau texte du dimanche · Administration' };

export default function NouveauTextePage() {
  return (
    <>
      <AdminNav />
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <Link
          href="/admin/textes"
          className="text-sm font-semibold text-brown hover:text-sunrise-red"
        >
          ← Textes du dimanche
        </Link>
        <h1 className="mt-3 font-display text-2xl font-semibold text-brown">
          Nouveau texte du dimanche
        </h1>
        <div className="mt-6">
          <TexteDimancheForm action={createTexteDimanche} />
        </div>
      </div>
    </>
  );
}
