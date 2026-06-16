import Link from 'next/link';
import AdminNav from '@/components/admin/AdminNav';
import { DeleteButton } from '@/components/admin/RowActions';
import { getAllEquipeAdmin } from '@/lib/admin-queries';
import { deletePretre } from './actions';

export const metadata = { title: 'Équipe pastorale · Administration' };
export const dynamic = 'force-dynamic';

export default async function AdminEquipePage() {
  let equipe = [];
  let erreur = null;
  try { equipe = await getAllEquipeAdmin(); } catch (e) { erreur = e.message; }

  return (
    <>
      <AdminNav />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-semibold text-brown">Équipe pastorale</h1>
            <p className="mt-1 text-sm text-ink/60">Ajoutez, modifiez ou supprimez des membres.</p>
          </div>
          <Link href="/admin/equipe/nouveau" className="rounded-full bg-brown px-4 py-2 text-sm font-semibold text-cream hover:bg-sunrise-red">
            + Ajouter un prêtre
          </Link>
        </div>
        {erreur && <div className="mt-6 rounded-xl bg-sunrise-red/5 p-4 text-sm text-sunrise-red">{erreur}</div>}
        <ul className="mt-6 space-y-3">
          {equipe.map(p => (
            <li key={p.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-brown/10 bg-cream-dark/50 p-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sunrise-red font-display font-bold text-cream">✝</div>
              <div className="min-w-0 flex-1">
                <p className="font-display font-semibold text-brown">{p.nom}</p>
                <p className="text-sm text-sunrise-red uppercase tracking-wide">{p.role}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${p.actif ? 'bg-green-100 text-green-700' : 'bg-brown/10 text-brown'}`}>
                {p.actif ? 'Actif' : 'Inactif'}
              </span>
              <div className="flex gap-2">
                <Link href={`/admin/equipe/${p.id}`} className="rounded-full border border-brown/20 px-3 py-1 text-xs font-semibold text-brown hover:border-sunrise-red hover:text-sunrise-red">
                  Modifier
                </Link>
                <DeleteButton id={p.id} action={deletePretre} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
