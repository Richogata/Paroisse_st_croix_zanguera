'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getAdminClient } from '@/lib/supabase';

function readFields(formData) {
  return {
    date_dimanche: (formData.get('date_dimanche') || '').toString(),
    titre: (formData.get('titre') || '').toString().trim(),
    premiere_lecture: (formData.get('premiere_lecture') || '').toString().trim(),
    psaume: (formData.get('psaume') || '').toString().trim(),
    deuxieme_lecture: (formData.get('deuxieme_lecture') || '').toString().trim(),
    evangile: (formData.get('evangile') || '').toString().trim(),
    partage: (formData.get('partage') || '').toString().trim(),
    published: formData.get('published') === 'on',
  };
}

function revalidateAll(id) {
  revalidatePath('/');
  revalidatePath('/textes-du-dimanche');
  if (id) revalidatePath(`/textes-du-dimanche/${id}`);
}

export async function createTexteDimanche(prevState, formData) {
  const supabase = getAdminClient();
  const fields = readFields(formData);

  if (!fields.date_dimanche || !fields.titre) {
    return { error: 'La date et le titre sont obligatoires.' };
  }

  const { error } = await supabase.from('textes_dimanche').insert(fields);

  if (error) {
    return { error: `Erreur lors de la création : ${error.message}` };
  }

  revalidateAll();
  redirect('/admin/textes');
}

export async function updateTexteDimanche(id, prevState, formData) {
  const supabase = getAdminClient();
  const fields = readFields(formData);

  if (!fields.date_dimanche || !fields.titre) {
    return { error: 'La date et le titre sont obligatoires.' };
  }

  const { error } = await supabase
    .from('textes_dimanche')
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    return { error: `Erreur lors de la mise à jour : ${error.message}` };
  }

  revalidateAll(id);
  redirect('/admin/textes');
}

export async function deleteTexteDimanche(id) {
  const supabase = getAdminClient();
  const { error } = await supabase.from('textes_dimanche').delete().eq('id', id);
  if (error) {
    throw new Error(`Erreur lors de la suppression : ${error.message}`);
  }
  revalidateAll(id);
  revalidatePath('/admin/textes');
}

export async function togglePublishTexteDimanche(id, published) {
  const supabase = getAdminClient();
  const { error } = await supabase
    .from('textes_dimanche')
    .update({ published: !published })
    .eq('id', id);
  if (error) {
    throw new Error(`Erreur : ${error.message}`);
  }
  revalidateAll(id);
  revalidatePath('/admin/textes');
}
