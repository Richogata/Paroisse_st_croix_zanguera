import Link from 'next/link';
import AdminNav from '@/components/admin/AdminNav';
import { PublishToggleButton, DeleteButton } from '@/components/admin/RowActions';
import { getAllTextesDimancheAdmin } from '@/lib/admin-queries';
import { togglePublishTexteDimanche, deleteTexteDimanche } from './actions';
import { formatDateLong } from '@/lib/format';

export const metadata = { title: 'Textes du dimanche · Administration' };
export const dynamic = 'force-dynamic';

export default async function AdminTextesPage() {
  let textes = [];
  let erreur = null;
  try {
    textes = await getAllTextesDimancheAdmin();
  } catch (e) {
    erreur = e.message;
  }

  return (
    <>
      <AdminNav />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-2xl font-semibold text-brown">
            Textes &amp; méditation du dimanche
          </h1>
          <Link
            href="/admin/textes/nouveau"
            className="rounded-full bg-brown px-4 py-2 text-sm font-semibold text-cream hover:bg-sunrise-red"
          >
            + Nouveau texte
          </Link>
        </div>

        {erreur && (
          <div className="mt-6 rounded-xl border border-sunrise-red/30 bg-sunrise-red/5 p-4 text-sm text-sunrise-red">
            Impossible de charger les textes : {erreur}
          </div>
        )}

        {!erreur && textes.length === 0 && (
          <p className="mt-8 text-sm text-ink/60">
            Aucun texte enregistré. Cliquez sur « Nouveau texte » pour
            préparer les lectures et la méditation du prochain dimanche.
          </p>
        )}

        <ul className="mt-6 space-y-3">
          {textes.map((t) => (
            <li
              key={t.id}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-brown/10 bg-cream-dark/50 p-4"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-base font-semibold text-brown">
                  {t.titre}
                </p>
                <p className="text-xs capitalize text-ink/50">
                  {formatDateLong(t.date_dimanche)}
                </p>
              </div>
              <PublishToggleButton
                id={t.id}
                published={t.published}
                action={togglePublishTexteDimanche}
              />
              <div className="flex gap-2">
                <Link
                  href={`/admin/textes/${t.id}`}
                  className="rounded-full border border-brown/20 px-3 py-1 text-xs font-semibold text-brown hover:border-sunrise-red hover:text-sunrise-red"
                >
                  Modifier
                </Link>
                <DeleteButton id={t.id} action={deleteTexteDimanche} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
