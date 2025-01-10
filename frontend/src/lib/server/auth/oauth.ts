import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';
import { Google } from 'arctic';

export const google = new Google(
	env.GOOGLE_CLIENT_ID || '',
	env.GOOGLE_CLIENT_SECRET || '',
	dev
		? 'http://localhost:6969/login/google/callback'
		: 'http://tts-new.jakeystikiroom.com/login/google/callback'
);
