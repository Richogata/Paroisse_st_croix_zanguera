'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Image from 'next/image';
import { login } from './actions';
import { paroisse } from '@/lib/data';

const initialState = { error: null };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-brown px-6 py-3 font-body text-sm font-semibold text-cream shadow-sm transition-colors hover:bg-sunrise-red disabled:opacity-60"
    >
      {pending ? 'Connexion…' : 'Se connecter'}
    </button>
  );
}

export default function ConnexionPage() {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-cream-dark px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-brown/10 bg-cream p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/images/logo.png"
            alt={`Logo ${paroisse.nom}`}
            width={64}
            height={58}
            className="h-14 w-auto"
          />
          <h1 className="mt-4 font-display text-xl font-semibold text-brown">
            Espace administrateur
          </h1>
          <p className="mt-1 text-sm text-ink/60">{paroisse.nom}</p>
        </div>

        <form action={formAction} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-brown">
              Adresse e-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              className="mt-1 w-full rounded-lg border border-brown/20 bg-white px-3 py-2 text-sm text-ink focus:border-sunrise-red"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-brown">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1 w-full rounded-lg border border-brown/20 bg-white px-3 py-2 text-sm text-ink focus:border-sunrise-red"
            />
          </div>

          {state?.error && (
            <p className="rounded-lg bg-sunrise-red/10 px-3 py-2 text-sm text-sunrise-red">
              {state.error}
            </p>
          )}

          <SubmitButton />
        </form>
      </div>
    </section>
  );
}
