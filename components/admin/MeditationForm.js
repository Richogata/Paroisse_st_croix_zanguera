'use client';
import { useFormState, useFormStatus } from 'react-dom';

const initialState = { error: null };
const tc = 'w-full rounded-lg border border-brown/20 bg-white px-3 py-2 text-sm text-ink focus:border-sunrise-red';

function SubmitButton({ label }) {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending} className="rounded-full bg-brown px-6 py-3 text-sm font-semibold text-cream hover:bg-sunrise-red disabled:opacity-60">{pending ? 'Enregistrement…' : label}</button>;
}

export default function MeditationForm({ action, meditation }) {
  const [state, formAction] = useFormState(action, initialState);
  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="date_meditation" className="block text-sm font-semibold text-brown">Date</label>
          <input id="date_meditation" name="date_meditation" type="date" required defaultValue={meditation?.date_meditation} className={`mt-1 ${tc}`} />
        </div>
        <div>
          <label htmlFor="reference_biblique" className="block text-sm font-semibold text-brown">Référence biblique</label>
          <input id="reference_biblique" name="reference_biblique" type="text" placeholder="Ex. Jn 15,12" defaultValue={meditation?.reference_biblique} className={`mt-1 ${tc}`} />
        </div>
      </div>
      <div>
        <label htmlFor="titre" className="block text-sm font-semibold text-brown">Titre</label>
        <input id="titre" name="titre" type="text" required defaultValue={meditation?.titre} className={`mt-1 ${tc}`} />
      </div>
      <div>
        <label htmlFor="contenu" className="block text-sm font-semibold text-brown">Contenu de la méditation</label>
        <p className="mt-1 text-xs text-ink/50">Séparez les paragraphes par une ligne vide.</p>
        <textarea id="contenu" name="contenu" rows={8} required defaultValue={meditation?.contenu} className={`mt-1 ${tc}`} />
      </div>
      <div className="flex items-center gap-2">
        <input id="published" name="published" type="checkbox" defaultChecked={meditation?.published ?? true} className="h-4 w-4 rounded border-brown/30" />
        <label htmlFor="published" className="text-sm font-semibold text-brown">Activer (visible le jour J)</label>
      </div>
      {state?.error && <p className="rounded-lg bg-sunrise-red/10 px-3 py-2 text-sm text-sunrise-red">{state.error}</p>}
      <SubmitButton label={meditation ? 'Enregistrer' : 'Créer la méditation'} />
    </form>
  );
}
