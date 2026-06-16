'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getAdminClient } from '@/lib/supabase';

function readFields(formData) {
  return {
    date_meditation: (formData.get('date_meditation') || '').toString(),
    titre: (formData.get('titre') || '').toString().trim(),
    contenu: (formData.get('contenu') || '').toString().trim(),
    reference_biblique: (formData.get('reference_biblique') || '').toString().trim(),
    published: formData.get('published') === 'on',
  };
}

export async function createMeditation(prevState, formData) {
  const supabase = getAdminClient();
  const fields = readFields(formData);
  if (!fields.date_meditation || !fields.titre || !fields.contenu) {
    return { error: 'La date, le titre et le contenu sont obligatoires.' };
  }
  const { error } = await supabase.from('meditations_auto').insert(fields);
  if (error) return { error: `Erreur : ${error.message}` };
  revalidatePath('/');
  redirect('/admin/meditations');
}

export async function updateMeditation(id, prevState, formData) {
  const supabase = getAdminClient();
  const fields = readFields(formData);
  if (!fields.date_meditation || !fields.titre || !fields.contenu) {
    return { error: 'La date, le titre et le contenu sont obligatoires.' };
  }
  const { error } = await supabase.from('meditations_auto').update(fields).eq('id', id);
  if (error) return { error: `Erreur : ${error.message}` };
  revalidatePath('/');
  redirect('/admin/meditations');
}

export async function deleteMeditation(id) {
  const supabase = getAdminClient();
  const { error } = await supabase.from('meditations_auto').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin/meditations');
}
