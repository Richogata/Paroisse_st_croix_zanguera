import Link from 'next/link';
import AdminNav from '@/components/admin/AdminNav';
import MeditationForm from '@/components/admin/MeditationForm';
import { createMeditation } from '../actions';

export const metadata = { title: 'Nouvelle méditation · Administration' };

export default function NouveilleMeditationPage() {
  return (
    <>
      <AdminNav />
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <Link href="/admin/meditations" className="text-sm font-semibold text-brown hover:text-sunrise-red">← Méditations</Link>
        <h1 className="mt-3 font-display text-2xl font-semibold text-brown">Nouvelle méditation</h1>
        <div className="mt-6"><MeditationForm action={createMeditation} /></div>
      </div>
    </>
  );
}
