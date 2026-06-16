'use client';
import { useFormState, useFormStatus } from 'react-dom';

const initialState = { error: null };
const tc = 'w-full rounded-lg border border-brown/20 bg-white px-3 py-2 text-sm text-ink focus:border-sunrise-red';

function SubmitButton({ label }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-brown px-6 py-3 text-sm font-semibold text-cream hover:bg-sunrise-red disabled:opacity-60"
    >
      {pending ? 'Enregistrement…' : label}
    </button>
  );
}

export default function PretreForm({ action, pretre }) {
  const [state, formAction] = useFormState(action, initialState);
  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="nom" className="block text-sm font-semibold text-brown">
          Nom complet
        </label>
        <input
          id="nom"
          name="nom"
          type="text"
          required
          placeholder="Ex. RP. Jean DUPONT"
          defaultValue={pretre?.nom}
          className={`mt-1 ${tc}`}
        />
      </div>
      <div>
        <label htmlFor="role" className="block text-sm font-semibold text-brown">
          Rôle / fonction
        </label>
        <input
          id="role"
          name="role"
          type="text"
          required
          placeholder="Ex. Curé, Vicaire, Prêtre résident, Diacre..."
          defaultValue={pretre?.role}
          className={`mt-1 ${tc}`}
        />
      </div>
      <div>
        <label htmlFor="ordre" className="block text-sm font-semibold text-brown">
          Ordre d&apos;affichage
        </label>
        <p className="mt-1 text-xs text-ink/50">
          Un nombre plus petit s&apos;affiche en premier (ex. 1, 2, 3...).
        </p>
        <input
          id="ordre"
          name="ordre"
          type="number"
          defaultValue={pretre?.ordre ?? 0}
          className={`mt-1 ${tc}`}
        />
      </div>

      {pretre && (
        <div className="flex items-center gap-2">
          <input
            id="actif"
            name="actif"
            type="checkbox"
            defaultChecked={pretre?.actif}
            className="h-4 w-4 rounded border-brown/30"
          />
          <label htmlFor="actif" className="text-sm font-semibold text-brown">
            Afficher sur le site
          </label>
        </div>
      )}

      {state?.error && (
        <p className="rounded-lg bg-sunrise-red/10 px-3 py-2 text-sm text-sunrise-red">
          {state.error}
        </p>
      )}

      <SubmitButton label={pretre ? 'Enregistrer' : 'Ajouter'} />
    </form>
  );
}
