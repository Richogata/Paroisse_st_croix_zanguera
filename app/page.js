import Link from 'next/link';
import WaveDivider from '@/components/WaveDivider';
import NewsCard from '@/components/NewsCard';
import HeroSection from '@/components/HeroSection';
import { programmeHebdomadaire, secretariat } from '@/lib/data';
import { getLatestActualites, getLatestTextesDimanche, getMeditationDuJour, getEquipePastorale } from '@/lib/queries';
import { formatDateLong } from '@/lib/format';

export default async function HomePage() {
  const [actualites, texteDimanche, meditationJour, equipe] = await Promise.all([
    getLatestActualites(3),
    getLatestTextesDimanche(),
    getMeditationDuJour(),
    getEquipePastorale(),
  ]);

  const messesDimanche = programmeHebdomadaire.find(p => p.jour === 'Dimanche');
  const messesSemaine = programmeHebdomadaire.find(p => p.jour === 'Lundi à Samedi');

  return (
    <>
      <HeroSection />

      {/* INFOS RAPIDES */}
      <section className="bg-cream-dark">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:px-6 md:grid-cols-3">
          {[
            {
              titre: 'Messes en semaine',
              contenu: <><p className="text-3xl font-display font-semibold text-sunrise-red">{messesSemaine?.celebrations[0].heure}</p><p className="mt-1 text-sm text-ink/70">Messe matinale, du lundi au samedi.</p></>,
            },
            {
              titre: 'Messes du dimanche',
              contenu: <ul className="mt-1 space-y-1 text-sm text-ink/80">{messesDimanche?.celebrations.map(c => (<li key={c.heure}><span className="font-semibold text-brown">{c.heure}</span> — {c.titre}{c.detail ? ` (${c.detail})` : ''}</li>))}</ul>,
            },
            {
              titre: 'Secrétariat',
              contenu: <><p className="text-sm font-semibold text-brown">{secretariat.jours}</p><ul className="mt-1 space-y-1 text-sm text-ink/80">{secretariat.horaires.map(h => (<li key={h.periode}>{h.periode} : {h.heures}</li>))}</ul><p className="mt-2 text-xs italic text-ink/60">{secretariat.note}</p></>,
            },
          ].map(({ titre, contenu }) => (
            <div key={titre} className="card-3d reveal rounded-2xl border border-brown/10 bg-cream p-6 shadow-sm">
              <h2 className="font-display text-lg font-semibold text-brown">{titre}</h2>
              <div className="mt-3">{contenu}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MÉDITATION DU JOUR (automatique si saisie) */}
      {meditationJour && (
        <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #33241A 0%, #4A3527 100%)' }}>
          <div className="pointer-events-none absolute inset-0 opacity-10" aria-hidden="true"
            style={{ background: 'radial-gradient(circle at 30% 50%, #FCB72E, transparent 60%)' }} />
          <div className="relative mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
            <div className="mb-4 flex items-center justify-center gap-2">
              <span className="candle-flame text-2xl">🕯️</span>
              <p className="font-display text-xs uppercase tracking-[0.25em] text-sunrise-gold">
                Méditation du jour
              </p>
              <span className="candle-flame text-2xl">🕯️</span>
            </div>
            <h2 className="font-display text-2xl font-semibold text-cream sm:text-3xl">{meditationJour.titre}</h2>
            {meditationJour.reference_biblique && (
              <p className="mt-2 text-sm text-sunrise-gold/80 italic">{meditationJour.reference_biblique}</p>
            )}
            <p className="mx-auto mt-5 max-w-2xl font-scripture text-lg italic text-cream/85">
              {meditationJour.contenu.length > 320 ? meditationJour.contenu.slice(0, 320) + '…' : meditationJour.contenu}
            </p>
          </div>
        </section>
      )}

      {/* TEXTE DU DIMANCHE */}
      {texteDimanche && (
        <section className="relative overflow-hidden bg-brown text-cream">
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 opacity-10" aria-hidden="true"
            style={{ background: 'radial-gradient(circle, #FCB72E, transparent 70%)' }} />
          <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6">
            <p className="font-display text-sm uppercase tracking-[0.25em] text-sunrise-gold">
              ✝ Parole de Dieu — {formatDateLong(texteDimanche.date_dimanche)}
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">{texteDimanche.titre}</h2>
            {texteDimanche.partage && (
              <p className="mx-auto mt-5 max-w-2xl font-scripture text-lg italic text-cream/90 sm:text-xl">
                {texteDimanche.partage.length > 280 ? `${texteDimanche.partage.slice(0, 280)}…` : texteDimanche.partage}
              </p>
            )}
            <div className="mt-7">
              <Link href="/textes-du-dimanche" className="rounded-full bg-sunrise-gold px-7 py-3 font-body text-sm font-bold text-brown-dark transition-colors hover:bg-cream">
                Lire les textes et la méditation complète
              </Link>
            </div>
          </div>
        </section>
      )}

      <WaveDivider />

      {/* ACTUALITÉS */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="reveal">
              <p className="font-display text-sm uppercase tracking-[0.25em] text-sunrise-red">Vie de la paroisse</p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-brown sm:text-3xl">Actualités</h2>
            </div>
            <Link href="/actualites" className="text-sm font-semibold text-brown hover:text-sunrise-red">Toutes les actualités →</Link>
          </div>
          {actualites.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {actualites.map(a => <NewsCard key={a.id} actualite={a} />)}
            </div>
          ) : (
            (() => {
              const sample = [
                { id: 'sample-1', titre: 'Bienvenue à la Paroisse Sainte Croix', extrait: 'Retrouvez ici les horaires, les événements et les ressources spirituelles de notre paroisse.', slug: '#', image_url: '/images/logo.png', created_at: new Date().toISOString() },
                { id: 'sample-2', titre: 'Culte dominical spécial', extrait: 'Rejoignez-nous dimanche pour un culte familial avec bénédiction des enfants.', slug: '#', image_url: '/images/logo.png', created_at: new Date().toISOString() },
                { id: 'sample-3', titre: "Programme de la semaine sainte", extrait: "Célébrations et temps de prière pour accompagner la Semaine Sainte.", slug: '#', image_url: '/images/logo.png', created_at: new Date().toISOString() },
              ];
              return (
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {sample.map(a => <NewsCard key={a.id} actualite={a} />)}
                </div>
              );
            })()
          )}
        </div>
      </section>

      <WaveDivider />

      {/* ÉQUIPE PASTORALE */}
      {equipe.length > 0 && (
        <section className="bg-cream-dark">
          <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
            <div className="reveal text-center">
              <p className="font-display text-sm uppercase tracking-[0.25em] text-sunrise-red">Notre équipe</p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-brown sm:text-3xl">L&apos;équipe pastorale</h2>
            </div>
            <div className={`mt-8 grid gap-6 ${equipe.length === 1 ? 'max-w-xs mx-auto' : equipe.length === 2 ? 'sm:grid-cols-2 max-w-xl mx-auto' : 'sm:grid-cols-3'}`}>
              {equipe.map((p, i) => (
                <div key={p.id} className={`card-3d reveal rounded-2xl border border-brown/10 bg-cream p-6 text-center shadow-sm`} style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sunrise-gold to-sunrise-red shadow-md">
                    <span className="font-display text-2xl text-white">✝</span>
                  </div>
                  <p className="font-display text-lg font-semibold text-brown">{p.nom}</p>
                  <p className="mt-1 text-sm uppercase tracking-wide text-sunrise-red">{p.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HISTOIRE */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2B1F17 0%, #4A3527 100%)' }}>
        <div className="pointer-events-none absolute inset-0 opacity-10" aria-hidden="true"
          style={{ background: 'radial-gradient(circle at 70% 50%, #FCB72E, transparent 60%)' }} />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center text-cream sm:px-6">
          <p className="font-display text-sm uppercase tracking-[0.25em] text-sunrise-gold">Depuis 1922</p>
          <h2 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">Plus de 100 ans d&apos;évangélisation</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-cream/70 sm:text-base">
            De la petite chapelle de la Sainte Famille à l&apos;église Sainte Croix consacrée en 1974,
            érigée en paroisse en 2013, découvrez le chemin de notre communauté.
          </p>
          <Link href="/historique" className="mt-6 inline-block rounded-full border border-sunrise-gold/50 px-6 py-3 font-body text-sm font-bold text-cream transition-colors hover:bg-sunrise-gold/10">
            Découvrir notre histoire
          </Link>
        </div>
      </section>
    </>
  );
}
