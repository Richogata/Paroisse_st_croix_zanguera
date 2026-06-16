'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getAdminClient } from '@/lib/supabase';
import { slugify } from '@/lib/slugify';

const BUCKET = 'actualites';

async function uniqueSlug(supabase, base, ignoreId) {
  let slug = slugify(base) || 'actualite';
  let attempt = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const candidate = attempt === 0 ? slug : `${slug}-${attempt + 1}`;
    let query = supabase.from('actualites').select('id').eq('slug', candidate);
    if (ignoreId) query = query.neq('id', ignoreId);
    const { data, error } = await query.maybeSingle();
    if (error && error.code !== 'PGRST116') throw error;
    if (!data) return candidate;
    attempt += 1;
  }
}

async function uploadImage(supabase, file) {
  if (!file || typeof file === 'string' || file.size === 0) return null;

  const ext = (file.name?.split('.').pop() || 'jpg').toLowerCase();
  const path = `${crypto.randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage.from(BUCKET).upload(path, buffer, {
    contentType: file.type || 'image/jpeg',
    upsert: true,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

function readFields(formData) {
  return {
    titre: (formData.get('titre') || '').toString().trim(),
    extrait: (formData.get('extrait') || '').toString().trim(),
    contenu: (formData.get('contenu') || '').toString().trim(),
    published: formData.get('published') === 'on',
  };
}

export async function createActualite(prevState, formData) {
  const supabase = getAdminClient();
  const fields = readFields(formData);

  if (!fields.titre || !fields.contenu) {
    return { error: 'Le titre et le contenu sont obligatoires.' };
  }

  const slug = await uniqueSlug(supabase, fields.titre);
  const image_url = await uploadImage(supabase, formData.get('image'));

  const { error } = await supabase.from('actualites').insert({
    ...fields,
    slug,
    image_url,
  });

  if (error) {
    return { error: `Erreur lors de la création : ${error.message}` };
  }

  revalidatePath('/');
  revalidatePath('/actualites');
  redirect('/admin/actualites');
}

export async function updateActualite(id, prevState, formData) {
  const supabase = getAdminClient();
  const fields = readFields(formData);

  if (!fields.titre || !fields.contenu) {
    return { error: 'Le titre et le contenu sont obligatoires.' };
  }

  const current = await supabase
    .from('actualites')
    .select('slug, image_url')
    .eq('id', id)
    .single();

  if (current.error) {
    return { error: `Erreur : ${current.error.message}` };
  }

  let slug = current.data.slug;
  // Régénère le slug seulement si le titre a changé et donnerait un slug différent
  const proposedSlug = slugify(fields.titre);
  if (proposedSlug && proposedSlug !== slug.replace(/-\d+$/, '')) {
    slug = await uniqueSlug(supabase, fields.titre, id);
  }

  const newImage = await uploadImage(supabase, formData.get('image'));
  const image_url = newImage || current.data.image_url;

  const { error } = await supabase
    .from('actualites')
    .update({ ...fields, slug, image_url, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    return { error: `Erreur lors de la mise à jour : ${error.message}` };
  }

  revalidatePath('/');
  revalidatePath('/actualites');
  revalidatePath(`/actualites/${slug}`);
  redirect('/admin/actualites');
}

export async function deleteActualite(id) {
  const supabase = getAdminClient();
  const { error } = await supabase.from('actualites').delete().eq('id', id);
  if (error) {
    throw new Error(`Erreur lors de la suppression : ${error.message}`);
  }
  revalidatePath('/');
  revalidatePath('/actualites');
  revalidatePath('/admin/actualites');
}

export async function togglePublishActualite(id, published) {
  const supabase = getAdminClient();
  const { error } = await supabase
    .from('actualites')
    .update({ published: !published })
    .eq('id', id);
  if (error) {
    throw new Error(`Erreur : ${error.message}`);
  }
  revalidatePath('/');
  revalidatePath('/actualites');
  revalidatePath('/admin/actualites');
}
