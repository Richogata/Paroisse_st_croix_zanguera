import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdminNav from '@/components/admin/AdminNav';
import MeditationForm from '@/components/admin/MeditationForm';
import { getMeditationByIdAdmin } from '@/lib/admin-queries';
import { updateMeditation } from '../actions';

export const metadata = { title: 'Modifier méditation · Administration' };

export default async function ModifierMeditationPage({ params }) {
  let meditation;
  try { meditation = await getMeditationByIdAdmin(params.id); } catch { notFound(); }
  const action = updateMeditation.bind(null, params.id);
  return (
    <>
      <AdminNav />
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <Link href="/admin/meditations" className="text-sm font-semibold text-brown hover:text-sunrise-red">← Méditations</Link>
        <h1 className="mt-3 font-display text-2xl font-semibold text-brown">Modifier la méditation</h1>
        <div className="mt-6"><MeditationForm action={action} meditation={meditation} /></div>
      </div>
    </>
  );
}
