import { google } from '$lib/server/auth/oauth';
import {
	createSession,
	generateSessionToken,
	setSessionTokenCookie
} from '$lib/server/auth/sessions';
import { db } from '$lib/server/db';
import { usersTable } from '$lib/server/db/schemas/users';
import type { RequestEvent } from '@sveltejs/kit';
import { decodeIdToken, type OAuth2Tokens } from 'arctic';
import { eq } from 'drizzle-orm';

export async function GET(event: RequestEvent) {
	const stateCookie = event.cookies.get('google_oauth_state');
	const verifierCookie = event.cookies.get('google_code_verifier');
	const callbackCode = event.url.searchParams.get('code');
	const callbackState = event.url.searchParams.get('state');

	if (
		!stateCookie ||
		!verifierCookie ||
		!callbackCode ||
		!callbackState ||
		stateCookie !== callbackState
	) {
		return new Response('Error connecting with google. Data missing', {
			status: 400
		});
	}
	let tokens: OAuth2Tokens;
	try {
		tokens = await google.validateAuthorizationCode(callbackCode, verifierCookie);
	} catch (e) {
		return new Response('Error connecting with google. Could not validate', {
			status: 400
		});
	}
	const claims = decodeIdToken(tokens.idToken());
	console.log('claims', claims);
	const googleId = 'sub' in claims ? (claims.sub as string) : undefined;
	const email = 'email' in claims ? (claims.email as string) : undefined;
	if (!email || !googleId) {
		return new Response('Error connecting with google. No email or googleId', {
			status: 400
		});
	}

	const currentUser = (
		await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.googleId, googleId || ''))
			.limit(1)
	).at(0);

	const sessionToken = generateSessionToken();
	const user =
		currentUser ||
		(
			await db
				.insert(usersTable)
				.values({
					email,
					googleId
				})
				.returning()
		)[0];

	console.log('user', user);
	const session = await createSession(user.id, sessionToken);
	setSessionTokenCookie(event, session.expiresAt, sessionToken);
	return new Response(null, {
		status: 302,
		headers: {
			Location: '/'
		}
	});
}
