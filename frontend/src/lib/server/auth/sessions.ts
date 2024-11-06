import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import type { RequestEvent } from '@sveltejs/kit';
import dayjs from 'dayjs';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { sessionTable, usersTable } from '../db/schemas/users';

export function generateSessionToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	return encodeBase32LowerCaseNoPadding(bytes);
}

function getEncodedToken(token: string) {
	return encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
}

export async function createSession(userId: string, token: string) {
	const session = {
		id: getEncodedToken(token),
		userId,
		// 30 days
		expiresAt: dayjs().add(30, 'days').toDate()
	};
	await db.insert(sessionTable).values(session);
	return session;
}

export async function validateSession(token: string) {
	const sessionId = getEncodedToken(token);
	const dbEntry = await db
		.select({ user: usersTable, session: sessionTable })
		.from(sessionTable)
		.innerJoin(usersTable, eq(sessionTable.userId, usersTable.id))
		.where(eq(sessionTable.id, sessionId));
	if (!dbEntry[0]) {
		return { user: null, session: null };
	}
	const { session, user } = dbEntry[0];

	// Refresh token if it is close to expiring
	if (dayjs().isAfter(dayjs(session.expiresAt).add(15, 'days'))) {
		session.expiresAt = dayjs().add(15, 'days').toDate();
		await db.insert(sessionTable).values(session);
	}
	return { session, user };
}

export async function invalidateSession(sessionId: string) {
	return db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
}

export async function setSessionTokenCookie(event: RequestEvent, expiresAt: Date, token: string) {
	event.cookies.set('session', token, {
		httpOnly: true,
		sameSite: 'lax',
		expires: expiresAt,
		path: '/'
	});
}
