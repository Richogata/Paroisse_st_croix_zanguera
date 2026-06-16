'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getAdminClient } from '@/lib/supabase';

export async function createPretre(prevState, formData) {
  const supabase = getAdminClient();
  const nom = (formData.get('nom') || '').toString().trim();
  const role = (formData.get('role') || '').toString().trim();
  const ordre = parseInt(formData.get('ordre') || '0');
  if (!nom || !role) return { error: 'Le nom et le rôle sont obligatoires.' };
  const { error } = await supabase.from('equipe_pastorale').insert({ nom, role, ordre, actif: true });
  if (error) return { error: `Erreur : ${error.message}` };
  revalidatePath('/');
  revalidatePath('/historique');
  redirect('/admin/equipe');
}

export async function updatePretre(id, prevState, formData) {
  const supabase = getAdminClient();
  const nom = (formData.get('nom') || '').toString().trim();
  const role = (formData.get('role') || '').toString().trim();
  const ordre = parseInt(formData.get('ordre') || '0');
  const actif = formData.get('actif') === 'on';
  if (!nom || !role) return { error: 'Le nom et le rôle sont obligatoires.' };
  const { error } = await supabase.from('equipe_pastorale').update({ nom, role, ordre, actif }).eq('id', id);
  if (error) return { error: `Erreur : ${error.message}` };
  revalidatePath('/');
  revalidatePath('/historique');
  redirect('/admin/equipe');
}

export async function deletePretre(id) {
  const supabase = getAdminClient();
  const { error } = await supabase.from('equipe_pastorale').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin/equipe');
}
