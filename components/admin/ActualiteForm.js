'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Image from 'next/image';

const initialState = { error: null };

function SubmitButton({ label }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-brown px-6 py-3 font-body text-sm font-semibold text-cream shadow-sm transition-colors hover:bg-sunrise-red disabled:opacity-60"
    >
      {pending ? 'Enregistrement…' : label}
    </button>
  );
}

export default function ActualiteForm({ action, actualite }) {
  const [state, formAction] = useFormState(action, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="titre" className="block text-sm font-semibold text-brown">
          Titre
        </label>
        <input
          id="titre"
          name="titre"
          type="text"
          required
          defaultValue={actualite?.titre}
          className="mt-1 w-full rounded-lg border border-brown/20 bg-white px-3 py-2 text-sm text-ink focus:border-sunrise-red"
        />
      </div>

      <div>
        <label htmlFor="extrait" className="block text-sm font-semibold text-brown">
          Extrait <span className="text-ink/40">(résumé court affiché dans les listes)</span>
        </label>
        <textarea
          id="extrait"
          name="extrait"
          rows={2}
          defaultValue={actualite?.extrait}
          className="mt-1 w-full rounded-lg border border-brown/20 bg-white px-3 py-2 text-sm text-ink focus:border-sunrise-red"
        />
      </div>

      <div>
        <label htmlFor="contenu" className="block text-sm font-semibold text-brown">
          Contenu
        </label>
        <p className="mt-1 text-xs text-ink/50">
          Séparez les paragraphes par une ligne vide.
        </p>
        <textarea
          id="contenu"
          name="contenu"
          rows={10}
          required
          defaultValue={actualite?.contenu}
          className="mt-1 w-full rounded-lg border border-brown/20 bg-white px-3 py-2 text-sm text-ink focus:border-sunrise-red"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-semibold text-brown">
          Image {actualite ? '(laisser vide pour ne pas changer)' : '(optionnelle)'}
        </label>
        {actualite?.image_url && (
          <div className="relative mt-2 h-32 w-48 overflow-hidden rounded-lg bg-brown/10">
            <Image src={actualite.image_url} alt="" fill className="object-cover" />
          </div>
        )}
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          className="mt-2 block w-full text-sm text-ink/70"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="published"
          name="published"
          type="checkbox"
          defaultChecked={actualite?.published}
          className="h-4 w-4 rounded border-brown/30 text-sunrise-red focus:ring-sunrise-red"
        />
        <label htmlFor="published" className="text-sm font-semibold text-brown">
          Publier sur le site
        </label>
      </div>

      {state?.error && (
        <p className="rounded-lg bg-sunrise-red/10 px-3 py-2 text-sm text-sunrise-red">
          {state.error}
        </p>
      )}

      <SubmitButton label={actualite ? 'Enregistrer les modifications' : 'Créer l’actualité'} />
    </form>
  );
}
