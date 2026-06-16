import { Fraunces, Source_Sans_3, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { paroisse } from '@/lib/data';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source',
  weight: ['400', '500', '600', '700'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

export const metadata = {
  title: {
    default: `${paroisse.nom} | ${paroisse.archidiocese}`,
    template: `%s | ${paroisse.nom}`,
  },
  description:
    "Site officiel de la Paroisse Sainte Croix de Sanguera (Archidiocèse de Lomé) : horaires des messes, célébrations, sacrements, actualités, textes et méditations du dimanche.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${fraunces.variable} ${sourceSans.variable} ${cormorant.variable} font-body antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <ScrollReveal />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
