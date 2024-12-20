import { authenticateUser } from '$lib/server/auth/authenticateUser';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { session, user } = await authenticateUser(event);
	event.locals.session = session;
	event.locals.user = user;

	if (event.url.pathname.startsWith('/login')) {
		if (session) {
			throw redirect(303, '/');
		}
		return resolve(event);
	}

	if (!session) {
		throw redirect(303, '/login');
	}

	return resolve(event);
};
