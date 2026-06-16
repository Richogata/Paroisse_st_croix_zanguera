import Link from 'next/link';
import AdminNav from '@/components/admin/AdminNav';
import PretreForm from '@/components/admin/PretreForm';
import { createPretre } from '../actions';

export const metadata = { title: 'Ajouter un prêtre · Administration' };

export default function NouveauPretrePage() {
  return (
    <>
      <AdminNav />
      <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
        <Link href="/admin/equipe" className="text-sm font-semibold text-brown hover:text-sunrise-red">← Équipe pastorale</Link>
        <h1 className="mt-3 font-display text-2xl font-semibold text-brown">Ajouter un prêtre</h1>
        <div className="mt-6"><PretreForm action={createPretre} /></div>
      </div>
    </>
  );
}
