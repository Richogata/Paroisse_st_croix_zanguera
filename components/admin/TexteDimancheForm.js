'use client';

import { useFormState, useFormStatus } from 'react-dom';

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

function Champ({ id, label, help, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-brown">
        {label}
      </label>
      {help && <p className="mt-1 text-xs text-ink/50">{help}</p>}
      <div className="mt-1">{children}</div>
    </div>
  );
}

const textareaClass =
  'w-full rounded-lg border border-brown/20 bg-white px-3 py-2 text-sm text-ink focus:border-sunrise-red';

export default function TexteDimancheForm({ action, texte }) {
  const [state, formAction] = useFormState(action, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Champ id="date_dimanche" label="Date du dimanche">
          <input
            id="date_dimanche"
            name="date_dimanche"
            type="date"
            required
            defaultValue={texte?.date_dimanche}
            className={textareaClass}
          />
        </Champ>
        <Champ id="titre" label="Titre / thème du dimanche">
          <input
            id="titre"
            name="titre"
            type="text"
            required
            placeholder="Ex. 15ème dimanche du temps ordinaire"
            defaultValue={texte?.titre}
            className={textareaClass}
          />
        </Champ>
      </div>

      <Champ
        id="premiere_lecture"
        label="Première lecture"
        help="Référence et texte. Séparez les paragraphes par une ligne vide."
      >
        <textarea
          id="premiere_lecture"
          name="premiere_lecture"
          rows={4}
          defaultValue={texte?.premiere_lecture}
          className={textareaClass}
        />
      </Champ>

      <Champ id="psaume" label="Psaume">
        <textarea
          id="psaume"
          name="psaume"
          rows={3}
          defaultValue={texte?.psaume}
          className={textareaClass}
        />
      </Champ>

      <Champ id="deuxieme_lecture" label="Deuxième lecture">
        <textarea
          id="deuxieme_lecture"
          name="deuxieme_lecture"
          rows={4}
          defaultValue={texte?.deuxieme_lecture}
          className={textareaClass}
        />
      </Champ>

      <Champ id="evangile" label="Évangile">
        <textarea
          id="evangile"
          name="evangile"
          rows={4}
          defaultValue={texte?.evangile}
          className={textareaClass}
        />
      </Champ>

      <Champ id="partage" label="Partage / méditation">
        <textarea
          id="partage"
          name="partage"
          rows={6}
          defaultValue={texte?.partage}
          className={textareaClass}
        />
      </Champ>

      <div className="flex items-center gap-2">
        <input
          id="published"
          name="published"
          type="checkbox"
          defaultChecked={texte?.published}
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

      <SubmitButton label={texte ? 'Enregistrer les modifications' : 'Créer'} />
    </form>
  );
}
