import { getPublicClient } from '@/lib/supabase';

export async function getLatestActualites(limit = 3) {
  try {
    const supabase = getPublicClient();
    const { data, error } = await supabase
      .from('actualites')
      .select('id, titre, slug, extrait, image_url, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  } catch { return []; }
}

export async function getAllActualites() {
  try {
    const supabase = getPublicClient();
    const { data, error } = await supabase
      .from('actualites')
      .select('id, titre, slug, extrait, image_url, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch { return []; }
}

export async function getActualiteBySlug(slug) {
  try {
    const supabase = getPublicClient();
    const { data, error } = await supabase
      .from('actualites')
      .select('*')
      .eq('published', true)
      .eq('slug', slug)
      .single();
    if (error) throw error;
    return data;
  } catch { return null; }
}

export async function getLatestTextesDimanche() {
  try {
    const supabase = getPublicClient();
    const { data, error } = await supabase
      .from('textes_dimanche')
      .select('*')
      .eq('published', true)
      .order('date_dimanche', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    return data || null;
  } catch { return null; }
}

export async function getArchiveTextesDimanche(excludeId) {
  try {
    const supabase = getPublicClient();
    let query = supabase
      .from('textes_dimanche')
      .select('id, titre, date_dimanche')
      .eq('published', true)
      .order('date_dimanche', { ascending: false })
      .limit(9);
    if (excludeId) query = query.neq('id', excludeId);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch { return []; }
}

export async function getTexteDimancheById(id) {
  try {
    const supabase = getPublicClient();
    const { data, error } = await supabase
      .from('textes_dimanche')
      .select('*')
      .eq('published', true)
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  } catch { return null; }
}

export async function getMeditationDuJour() {
  try {
    const supabase = getPublicClient();
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('meditations_auto')
      .select('*')
      .eq('date_meditation', today)
      .eq('published', true)
      .maybeSingle();
    if (error) throw error;
    return data || null;
  } catch { return null; }
}

export async function getEquipePastorale() {
  try {
    const supabase = getPublicClient();
    const { data, error } = await supabase
      .from('equipe_pastorale')
      .select('*')
      .eq('actif', true)
      .order('ordre', { ascending: true });
    if (error) throw error;
    return data || [];
  } catch { return []; }
}
