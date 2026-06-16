import Link from 'next/link';
import AdminNav from '@/components/admin/AdminNav';
import { DeleteButton } from '@/components/admin/RowActions';
import { getAllMeditationsAdmin } from '@/lib/admin-queries';
import { deleteMeditation } from './actions';
import { formatDateShort } from '@/lib/format';

export const metadata = { title: 'Méditations · Administration' };
export const dynamic = 'force-dynamic';

export default async function AdminMeditationsPage() {
  let meditations = [];
  let erreur = null;
  try { meditations = await getAllMeditationsAdmin(); } catch (e) { erreur = e.message; }

  return (
    <>
      <AdminNav />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-semibold text-brown">Méditations automatiques</h1>
            <p className="mt-1 text-sm text-ink/60">Affichées automatiquement sur la page d'accueil le jour correspondant.</p>
          </div>
          <Link href="/admin/meditations/nouveau" className="rounded-full bg-brown px-4 py-2 text-sm font-semibold text-cream hover:bg-sunrise-red">
            + Nouvelle méditation
          </Link>
        </div>
        {erreur && <div className="mt-6 rounded-xl bg-sunrise-red/5 p-4 text-sm text-sunrise-red">{erreur}</div>}
        {!erreur && meditations.length === 0 && (
          <p className="mt-8 text-sm text-ink/60">Aucune méditation. Les méditations sont affichées automatiquement à la date choisie.</p>
        )}
        <ul className="mt-6 space-y-3">
          {meditations.map(m => (
            <li key={m.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-brown/10 bg-cream-dark/50 p-4">
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-base font-semibold text-brown">{m.titre}</p>
                <p className="text-xs text-ink/50">{formatDateShort(m.date_meditation)} {m.reference_biblique ? `· ${m.reference_biblique}` : ''}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${m.published ? 'bg-green-100 text-green-700' : 'bg-brown/10 text-brown'}`}>
                {m.published ? 'Active' : 'Désactivée'}
              </span>
              <div className="flex gap-2">
                <Link href={`/admin/meditations/${m.id}`} className="rounded-full border border-brown/20 px-3 py-1 text-xs font-semibold text-brown hover:border-sunrise-red hover:text-sunrise-red">
                  Modifier
                </Link>
                <DeleteButton id={m.id} action={deleteMeditation} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
