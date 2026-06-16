'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { paroisse } from '@/lib/data';

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/programme', label: 'Programme' },
  { href: '/celebrations', label: 'Célébrations' },
  { href: '/sacrements', label: 'Sacrements' },
  { href: '/actualites', label: 'Actualités' },
  { href: '/textes-du-dimanche', label: 'Textes du dimanche' },
  { href: '/cccb', label: 'CCCB' },
  { href: '/historique', label: 'Historique' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-brown/10 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-cream shadow-sm ring-2 ring-sunrise-gold/40 transition-shadow group-hover:ring-sunrise-gold sm:h-14 sm:w-14">
            <Image
              src="/images/logo.png"
              alt="Logo de la Paroisse Sainte Croix de Sanguera"
              width={52}
              height={48}
              className="h-9 w-10 object-contain sm:h-11 sm:w-12"
              priority
            />
          </span>
          <span className="font-display leading-tight">
            <span className="block text-[11px] uppercase tracking-[0.18em] text-sunrise-red sm:text-xs">
              {paroisse.archidiocese}
            </span>
            <span className="block text-base font-semibold text-brown sm:text-lg">
              Sainte Croix de Sanguera
            </span>
          </span>
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 font-body text-sm text-brown">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-sunrise-red"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-brown/20 text-brown lg:hidden"
        >
          <span className="sr-only">Ouvrir le menu</span>
          {open ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6l-12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <nav id="menu-mobile" className="border-t border-brown/10 bg-cream lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 font-body text-sm text-brown sm:px-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-2 transition-colors hover:bg-brown/5 hover:text-sunrise-red"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
