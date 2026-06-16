'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { paroisse } from '@/lib/data';

function Particles() {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const items = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 6,
      color: i % 3 === 0 ? 'rgba(252,183,46,0.5)' : i % 3 === 1 ? 'rgba(242,85,44,0.4)' : 'rgba(255,255,255,0.5)',
    }));
    setParticles(items);
  }, []);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map(p => (
        <div key={p.id} className="particle" style={{
          left: p.left, width: p.size, height: p.size,
          background: p.color,
          animationDuration: `${p.duration}s`,
          animationDelay: `${p.delay}s`,
        }} />
      ))}
    </div>
  );
}

function SunRays() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
      <div className="rays absolute opacity-10" style={{ width: '140%', height: '140%' }}>
        <svg viewBox="0 0 400 400" className="w-full h-full">
          {Array.from({ length: 16 }, (_, i) => {
            const angle = (i * 22.5) * Math.PI / 180;
            const x2 = 200 + Math.cos(angle) * 200;
            const y2 = 200 + Math.sin(angle) * 200;
            return <line key={i} x1="200" y1="200" x2={x2} y2={y2} stroke="#FCB72E" strokeWidth={i % 2 === 0 ? 2 : 1} />;
          })}
        </svg>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // (Le scroll-reveal global est géré par le composant ScrollReveal dans le layout)

  const parallaxY = scrollY * 0.35;

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #2B1F17 0%, #4A3527 35%, #1a0f08 100%)', minHeight: '100vh' }}
    >
      <SunRays />
      <Particles />

      {/* Sunset radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 70%, rgba(252,183,46,0.22) 0%, rgba(242,85,44,0.15) 40%, transparent 70%)',
          transform: `translateY(${parallaxY * 0.4}px)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-20 text-center sm:px-6 sm:py-28" style={{ minHeight: '100vh' }}>

        {/* Logo with 3D glow */}
        <div className="cross-3d mb-8" style={{ transform: `translateY(${-parallaxY * 0.2}px)` }}>
          <div className="logo-glow inline-block">
            <Image
              src="/images/logo.png"
              alt="Logo Paroisse Sainte Croix de Sanguera"
              width={160}
              height={146}
              className="h-32 w-auto sm:h-40 md:h-48"
              priority
            />
          </div>
        </div>

        {/* Archidiocèse */}
        <p className="font-display text-xs uppercase tracking-[0.3em] text-sunrise-gold sm:text-sm">
          {paroisse.archidiocese}
        </p>

        {/* Title */}
        <h1 className="mt-3 font-display font-black text-cream" style={{ fontSize: 'clamp(2rem, 7vw, 4.5rem)', lineHeight: 1.1, textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>
          Paroisse Sainte Croix
          <br />
          <span style={{ color: '#FCB72E' }}>de Sanguera</span>
        </h1>

        {/* Slogan 3D shimmer */}
        <div className="mt-6 px-2">
          <p
            className="slogan-shimmer font-display font-semibold"
            style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1.25rem)', letterSpacing: '0.08em' }}
          >
            ✝ {paroisse.slogan} ✝
          </p>
        </div>

        {/* Divider cross */}
        <div className="my-8 flex items-center gap-4" aria-hidden="true">
          <div className="h-px flex-1 opacity-30" style={{ background: 'linear-gradient(to right, transparent, #FCB72E)' }} />
          <span className="text-2xl text-sunrise-gold opacity-80">✝</span>
          <div className="h-px flex-1 opacity-30" style={{ background: 'linear-gradient(to left, transparent, #FCB72E)' }} />
        </div>

        {/* Subtitle */}
        <p className="max-w-lg font-body text-base text-cream/70 sm:text-lg">
          Une communauté chrétienne vivante à Sanguéra, depuis 1922.
          Bienvenue pour prier, célébrer et grandir ensemble dans la foi.
        </p>

        {/* CTA buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/programme" className="card-3d rounded-full px-7 py-3 font-body text-sm font-bold text-brown shadow-lg" style={{ background: 'linear-gradient(135deg, #FCB72E, #F2552C)' }}>
            Horaires des messes
          </Link>
          <Link href="/textes-du-dimanche" className="card-3d rounded-full border border-sunrise-gold/50 px-7 py-3 font-body text-sm font-bold text-cream transition-colors hover:bg-sunrise-gold/10">
            Textes &amp; méditation
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50" aria-hidden="true">
          <span className="font-body text-xs uppercase tracking-widest text-cream">Découvrir</span>
          <div className="h-8 w-px" style={{ background: 'linear-gradient(to bottom, #FCB72E, transparent)' }} />
        </div>
      </div>
    </section>
  );
}
