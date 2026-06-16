import Link from 'next/link';
import Image from 'next/image';
import WaveDivider from '@/components/WaveDivider';
import { paroisse, secretariat } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden bg-brown text-cream">
      <WaveDivider tone="light" />

      {/* Slogan band */}
      <div className="relative border-b border-cream/10 bg-brown-dark/40">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 text-center sm:px-6">
          <Image
            src="/images/logo.png"
            alt={`Logo ${paroisse.nom}`}
            width={64}
            height={58}
            className="logo-glow h-14 w-auto opacity-90"
          />
          <p className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-sunrise-gold sm:text-base">
            ✝ {paroisse.slogan} ✝
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <h2 className="font-display text-lg font-semibold text-sunrise-gold">
            {paroisse.nom}
          </h2>
          <p className="mt-2 text-sm text-cream/80">{paroisse.archidiocese}</p>
          <p className="mt-1 text-sm text-cream/80">{paroisse.adresse}</p>
        </div>

        <div>
          <h3 className="font-display text-base font-semibold text-sunrise-gold">
            Contact &amp; secrétariat
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-cream/80">
            {paroisse.telephones.map((tel) => (
              <li key={tel}>Tél. {tel}</li>
            ))}
            {paroisse.emails.map((email) => (
              <li key={email}>{email}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-cream/80">
            <span className="font-semibold text-cream">{secretariat.jours}</span>
            <br />
            {secretariat.horaires.map((h) => `${h.periode} : ${h.heures}`).join(' · ')}
          </p>
          <p className="mt-1 text-xs italic text-cream/60">{secretariat.note}</p>
        </div>

        <div>
          <h3 className="font-display text-base font-semibold text-sunrise-gold">
            Soutenir la paroisse
          </h3>
          <p className="mt-2 text-sm text-cream/80">
            Vous pouvez soutenir les œuvres de la paroisse par Mobile Money :
          </p>
          <ul className="mt-2 space-y-1 text-sm text-cream/80">
            {paroisse.paiementMobile.map((m) => (
              <li key={m.nom}>
                <span className="font-semibold text-cream">{m.nom}</span> : {m.numero}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-cream/60 sm:flex-row sm:px-6">
          <p>
            © {new Date().getFullYear()} {paroisse.nom}. Tous droits réservés.
          </p>
          <Link href="/admin" className="hover:text-cream">
            Espace administrateur
          </Link>
        </div>
      </div>
    </footer>
  );
}
