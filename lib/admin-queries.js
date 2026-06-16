import { getAdminClient } from '@/lib/supabase';

export async function getAllActualitesAdmin() {
  const supabase = getAdminClient();
  const { data, error } = await supabase.from('actualites').select('id, titre, slug, image_url, published, created_at').order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function getActualiteByIdAdmin(id) {
  const supabase = getAdminClient();
  const { data, error } = await supabase.from('actualites').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function getAllTextesDimancheAdmin() {
  const supabase = getAdminClient();
  const { data, error } = await supabase.from('textes_dimanche').select('id, titre, date_dimanche, published, created_at').order('date_dimanche', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function getTexteDimancheByIdAdmin(id) {
  const supabase = getAdminClient();
  const { data, error } = await supabase.from('textes_dimanche').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function getAllMeditationsAdmin() {
  const supabase = getAdminClient();
  const { data, error } = await supabase.from('meditations_auto').select('*').order('date_meditation', { ascending: false }).limit(30);
  if (error) throw error;
  return data || [];
}

export async function getMeditationByIdAdmin(id) {
  const supabase = getAdminClient();
  const { data, error } = await supabase.from('meditations_auto').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function getAllEquipeAdmin() {
  const supabase = getAdminClient();
  const { data, error } = await supabase.from('equipe_pastorale').select('*').order('ordre', { ascending: true });
  if (error) throw error;
  return data || [];
}
