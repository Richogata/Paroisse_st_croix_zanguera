import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdminNav from '@/components/admin/AdminNav';
import TexteDimancheForm from '@/components/admin/TexteDimancheForm';
import { getTexteDimancheByIdAdmin } from '@/lib/admin-queries';
import { updateTexteDimanche } from '../actions';

export const metadata = { title: 'Modifier le texte du dimanche · Administration' };

export default async function ModifierTextePage({ params }) {
  let texte;
  try {
    texte = await getTexteDimancheByIdAdmin(params.id);
  } catch {
    notFound();
  }

  const action = updateTexteDimanche.bind(null, params.id);

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
          Modifier le texte du dimanche
        </h1>
        <div className="mt-6">
          <TexteDimancheForm action={action} texte={texte} />
        </div>
      </div>
    </>
  );
}
