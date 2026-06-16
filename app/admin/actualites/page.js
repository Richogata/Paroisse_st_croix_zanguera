import Link from 'next/link';
import Image from 'next/image';
import AdminNav from '@/components/admin/AdminNav';
import { PublishToggleButton, DeleteButton } from '@/components/admin/RowActions';
import { getAllActualitesAdmin } from '@/lib/admin-queries';
import { togglePublishActualite, deleteActualite } from './actions';
import { formatDateShort } from '@/lib/format';

export const metadata = { title: 'Actualités · Administration' };
export const dynamic = 'force-dynamic';

export default async function AdminActualitesPage() {
  let actualites = [];
  let erreur = null;
  try {
    actualites = await getAllActualitesAdmin();
  } catch (e) {
    erreur = e.message;
  }

  return (
    <>
      <AdminNav />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-2xl font-semibold text-brown">
            Actualités
          </h1>
          <Link
            href="/admin/actualites/nouveau"
            className="rounded-full bg-brown px-4 py-2 text-sm font-semibold text-cream hover:bg-sunrise-red"
          >
            + Nouvelle actualité
          </Link>
        </div>

        {erreur && (
          <div className="mt-6 rounded-xl border border-sunrise-red/30 bg-sunrise-red/5 p-4 text-sm text-sunrise-red">
            Impossible de charger les actualités : {erreur}
          </div>
        )}

        {!erreur && actualites.length === 0 && (
          <p className="mt-8 text-sm text-ink/60">
            Aucune actualité pour le moment. Cliquez sur « Nouvelle actualité »
            pour publier la première.
          </p>
        )}

        <ul className="mt-6 space-y-3">
          {actualites.map((a) => (
            <li
              key={a.id}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-brown/10 bg-cream-dark/50 p-4"
            >
              <div className="relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-brown/10">
                {a.image_url && (
                  <Image src={a.image_url} alt="" fill className="object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-base font-semibold text-brown">
                  {a.titre}
                </p>
                <p className="text-xs text-ink/50">{formatDateShort(a.created_at)}</p>
              </div>
              <PublishToggleButton
                id={a.id}
                published={a.published}
                action={togglePublishActualite}
              />
              <div className="flex gap-2">
                <Link
                  href={`/admin/actualites/${a.id}`}
                  className="rounded-full border border-brown/20 px-3 py-1 text-xs font-semibold text-brown hover:border-sunrise-red hover:text-sunrise-red"
                >
                  Modifier
                </Link>
                <DeleteButton id={a.id} action={deleteActualite} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
