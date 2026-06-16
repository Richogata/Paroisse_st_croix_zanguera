import Link from 'next/link';
import Image from 'next/image';
import { formatDateShort } from '@/lib/format';

export default function NewsCard({ actualite }) {
  return (
    <Link
      href={`/actualites/${actualite.slug}`}
      className="group card-3d flex flex-col overflow-hidden rounded-2xl border border-brown/10 bg-white/60 shadow-sm"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-brown/10">
        {actualite.image_url ? (
          <Image
            src={actualite.image_url}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-sunrise-gold/30 via-sunrise-orange/20 to-sunrise-red/20">
            <span className="font-display text-3xl text-brown/30">+</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-xs uppercase tracking-wide text-sunrise-red">
          {formatDateShort(actualite.created_at)}
        </p>
        <h3 className="font-display text-lg font-semibold leading-snug text-brown group-hover:text-sunrise-red">
          {actualite.titre}
        </h3>
        {actualite.extrait && (
          <p className="line-clamp-3 text-sm text-ink/70">{actualite.extrait}</p>
        )}
        <span className="mt-auto pt-2 text-sm font-semibold text-sunrise-red">
          Lire la suite →
        </span>
      </div>
    </Link>
  );
}
