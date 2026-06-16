'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSessionToken, SESSION_COOKIE } from '@/lib/auth';

export async function login(prevState, formData) {
  const email = (formData.get('email') || '').toString().trim();
  const password = (formData.get('password') || '').toString();

  const expectedEmail = process.env.ADMIN_EMAIL;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedEmail || !expectedPassword) {
    return { error: "Le compte administrateur n'est pas configuré (variables d'environnement manquantes)." };
  }

  if (email !== expectedEmail || password !== expectedPassword) {
    return { error: 'Identifiants incorrects. Veuillez réessayer.' };
  }

  const token = await createSessionToken(email);

  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12,
  });

  redirect('/admin');
}

export async function logout() {
  cookies().delete(SESSION_COOKIE);
  redirect('/admin/connexion');
}
