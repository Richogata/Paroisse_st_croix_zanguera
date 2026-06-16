'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/app/admin/connexion/actions';

const links = [
  { href: '/admin', label: 'Tableau de bord' },
  { href: '/admin/actualites', label: 'Actualités' },
  { href: '/admin/textes', label: 'Textes du dimanche' },
  { href: '/admin/meditations', label: 'Méditations' },
  { href: '/admin/equipe', label: 'Équipe pastorale' },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="border-b border-brown/10 bg-cream-dark">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <nav>
          <ul className="flex flex-wrap gap-2">
            {links.map((link) => {
              const active =
                link.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                      active ? 'bg-brown text-cream' : 'text-brown hover:bg-brown/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-full border border-brown/20 px-4 py-1.5 text-sm font-semibold text-brown transition-colors hover:border-sunrise-red hover:text-sunrise-red"
          >
            Se déconnecter
          </button>
        </form>
      </div>
    </div>
  );
}
