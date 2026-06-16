import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Client public (clé "anon").
 * Utilisé pour lire le contenu publié sur les pages du site.
 * Respecte les règles RLS (lecture des contenus "published" uniquement).
 */
export function getPublicClient() {
  if (!url || !anonKey) {
    throw new Error(
      "Configuration Supabase manquante : vérifiez NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }
  return createClient(url, anonKey, {
    auth: { persistSession: false },
  });
}

/**
 * Client admin (clé "service_role").
 * Utilisé UNIQUEMENT côté serveur (actions admin) pour créer, modifier,
 * supprimer du contenu et uploader des images. Ne jamais exposer cette
 * clé au navigateur.
 */
export function getAdminClient() {
  if (!url || !serviceKey) {
    throw new Error(
      "Configuration Supabase manquante : vérifiez NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY"
    );
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
