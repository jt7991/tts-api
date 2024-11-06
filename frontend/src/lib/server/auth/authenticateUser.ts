import type { RequestEvent } from '@sveltejs/kit';
import { setSessionTokenCookie, validateSession } from './sessions';

export const authenticateUser = async (event: RequestEvent) => {
	const token = event.cookies.get('session');

	if (!token) {
		return { user: null, session: null };
	}

	const { session, user } = await validateSession(token);

	if (!session) {
		event.cookies.set('session', '', {
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 0,
			path: '/'
		});
		return { session, user };
	}

	setSessionTokenCookie(event, session.expiresAt, token);
	return { session, user };
};
