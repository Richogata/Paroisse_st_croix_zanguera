import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdminNav from '@/components/admin/AdminNav';
import PretreForm from '@/components/admin/PretreForm';
import { getAllEquipeAdmin } from '@/lib/admin-queries';
import { updatePretre } from '../actions';

export const metadata = { title: 'Modifier prêtre · Administration' };

export default async function ModifierPretrePage({ params }) {
  const equipe = await getAllEquipeAdmin().catch(() => []);
  const pretre = equipe.find(p => p.id === params.id);
  if (!pretre) notFound();
  const action = updatePretre.bind(null, params.id);
  return (
    <>
      <AdminNav />
      <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
        <Link href="/admin/equipe" className="text-sm font-semibold text-brown hover:text-sunrise-red">← Équipe pastorale</Link>
        <h1 className="mt-3 font-display text-2xl font-semibold text-brown">Modifier</h1>
        <div className="mt-6"><PretreForm action={action} pretre={pretre} /></div>
      </div>
    </>
  );
}
