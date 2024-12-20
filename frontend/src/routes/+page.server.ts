import { TTS_SERVICE_URL } from '$env/static/private';

// @ts-expect-error library has no types
import Parser from '@postlight/parser';
import type { Actions } from '@sveltejs/kit';
export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const url = data.get('url')?.valueOf() as string;
		const { content } = await Parser.parse(url, { contentType: 'text' });
		const formData = new FormData();
		formData.set('text', content);
		const response = await fetch(TTS_SERVICE_URL, { method: 'POST', body: formData });

		return response.json();
	}
};
