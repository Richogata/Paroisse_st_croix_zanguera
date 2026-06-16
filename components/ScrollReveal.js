'use client';

import { useEffect } from 'react';

/**
 * Active les animations de révélation au défilement pour tous les
 * éléments marqués de la classe "reveal", sur toutes les pages.
 * Composant invisible, monté une fois dans le layout racine.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    // Léger délai pour laisser le DOM se peindre après navigation
    const id = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
        observer.observe(el);
      });
    }, 50);

    return () => {
      clearTimeout(id);
      observer.disconnect();
    };
  }, []);

  return null;
}
