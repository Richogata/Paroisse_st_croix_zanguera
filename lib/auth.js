import { SignJWT, jwtVerify } from 'jose';

export const SESSION_COOKIE = 'paroisse_admin_session';
const SESSION_DURATION = '12h';

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "SESSION_SECRET manquant ou trop court. Définissez une chaîne aléatoire d'au moins 32 caractères."
    );
  }
  return new TextEncoder().encode(secret);
}

/**
 * Crée un jeton de session signé pour l'administrateur.
 */
export async function createSessionToken(email) {
  return await new SignJWT({ email, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(getSecretKey());
}

/**
 * Vérifie un jeton de session. Retourne le contenu si valide, sinon null.
 */
export async function verifySessionToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload;
  } catch {
    return null;
  }
}
