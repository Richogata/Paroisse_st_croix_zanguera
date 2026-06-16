'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

export function PublishToggleButton({ id, published, action }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await action(id, published);
          router.refresh();
        })
      }
      className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
        published
          ? 'bg-green-100 text-green-700 hover:bg-green-200'
          : 'bg-brown/10 text-brown hover:bg-brown/20'
      } disabled:opacity-50`}
    >
      {published ? 'Publié' : 'Brouillon'}
    </button>
  );
}

export function DeleteButton({ id, action, label = 'Supprimer' }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!window.confirm('Confirmer la suppression définitive ?')) return;
        startTransition(async () => {
          await action(id);
          router.refresh();
        });
      }}
      className="rounded-full border border-sunrise-red/30 px-3 py-1 text-xs font-semibold text-sunrise-red transition-colors hover:bg-sunrise-red/10 disabled:opacity-50"
    >
      {pending ? '…' : label}
    </button>
  );
}
