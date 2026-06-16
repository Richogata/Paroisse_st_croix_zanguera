import Link from 'next/link';
import AdminNav from '@/components/admin/AdminNav';
import {
  getAllActualitesAdmin,
  getAllTextesDimancheAdmin,
  getAllMeditationsAdmin,
  getAllEquipeAdmin,
} from '@/lib/admin-queries';

export const metadata = { title: 'Tableau de bord' };
export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  let actualites = [];
  let textes = [];
  let meditations = [];
  let equipe = [];
  let erreur = null;

  try {
    [actualites, textes, meditations, equipe] = await Promise.all([
      getAllActualitesAdmin(),
      getAllTextesDimancheAdmin(),
      getAllMeditationsAdmin(),
      getAllEquipeAdmin(),
    ]);
  } catch (e) {
    erreur = e.message;
  }

  const actualitesPubliees = actualites.filter((a) => a.published).length;
  const textesPublies = textes.filter((t) => t.published).length;
  const meditationsActives = meditations.filter((m) => m.published).length;
  const equipeActive = equipe.filter((p) => p.actif).length;

  const cartes = [
    {
      titre: 'Actualités',
      desc: `${actualites.length} au total · ${actualitesPubliees} publiée(s)`,
      gerer: '/admin/actualites',
      nouveau: '/admin/actualites/nouveau',
      labelNouveau: '+ Nouvelle actualité',
    },
    {
      titre: 'Textes du dimanche',
      desc: `${textes.length} au total · ${textesPublies} publié(s)`,
      gerer: '/admin/textes',
      nouveau: '/admin/textes/nouveau',
      labelNouveau: '+ Nouveau texte',
    },
    {
      titre: 'Méditations (jours ordinaires)',
      desc: `${meditations.length} au total · ${meditationsActives} active(s)`,
      gerer: '/admin/meditations',
      nouveau: '/admin/meditations/nouveau',
      labelNouveau: '+ Nouvelle méditation',
    },
    {
      titre: 'Équipe pastorale',
      desc: `${equipe.length} membre(s) · ${equipeActive} affiché(s) sur le site`,
      gerer: '/admin/equipe',
      nouveau: '/admin/equipe/nouveau',
      labelNouveau: '+ Ajouter un prêtre',
    },
  ];

  return (
    <>
      <AdminNav />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <h1 className="font-display text-2xl font-semibold text-brown">
          Tableau de bord
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          Gérez le contenu publié sur le site de la paroisse.
        </p>

        {erreur && (
          <div className="mt-6 rounded-xl border border-sunrise-red/30 bg-sunrise-red/5 p-4 text-sm text-sunrise-red">
            Impossible de charger les données : {erreur}. Vérifiez la
            configuration de Supabase dans les variables d&apos;environnement.
          </div>
        )}

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {cartes.map((c) => (
            <div
              key={c.titre}
              className="rounded-2xl border border-brown/10 bg-cream-dark/60 p-6"
            >
              <h2 className="font-display text-lg font-semibold text-brown">
                {c.titre}
              </h2>
              <p className="mt-1 text-sm text-ink/70">{c.desc}</p>
              <div className="mt-4 flex gap-3">
                <Link
                  href={c.gerer}
                  className="rounded-full border border-brown/20 px-4 py-2 text-sm font-semibold text-brown hover:border-sunrise-red hover:text-sunrise-red"
                >
                  Gérer
                </Link>
                <Link
                  href={c.nouveau}
                  className="rounded-full bg-brown px-4 py-2 text-sm font-semibold text-cream hover:bg-sunrise-red"
                >
                  {c.labelNouveau}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
