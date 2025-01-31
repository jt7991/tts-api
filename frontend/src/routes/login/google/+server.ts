import { google } from '$lib/server/auth/oauth';
import { generateCodeVerifier, generateState } from 'arctic';
import type { RequestEvent } from './$types';

export function GET(event: RequestEvent) {
	const state = generateState();
	const codeVerifier = generateCodeVerifier();

	const url = google.createAuthorizationURL(state, codeVerifier, ['openid', 'email']);
	event.cookies.set('google_oauth_state', state, {
		httpOnly: true,
		maxAge: 60 * 10,
		secure: import.meta.env.PROD,
		path: '/',
		sameSite: 'lax'
	});
	event.cookies.set('google_code_verifier', codeVerifier, {
		httpOnly: true,
		maxAge: 60 * 10,
		secure: import.meta.env.PROD,
		path: '/',
		sameSite: 'lax'
	});

	return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString()
		}
	});
}
