import { db } from '$lib/server/db';
import { articleTable } from '$lib/server/db/schemas/articles';
import { convertTextToSpeech } from '$lib/server/tts/unreal';
import Parser from '@postlight/parser';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async (event) => {
		const userId = event.locals.user?.id;
		if (!userId) {
			console.error('User not logged in');
			return;
		}
		const data = await event.request.formData();
		const url = data.get('url')?.valueOf() as string;
		const { content, title, lead_image_url, author } = await Parser.parse(url, {
			contentType: 'text'
		});
		const res = await convertTextToSpeech(content);
		await db.insert(articleTable).values({
			lead_image_url: lead_image_url || null,
			audio_url: res.SynthesisTask.OutputUri,
			author: author || null,
			web_url: url,
			timestamp_url: res.SynthesisTask.TimestampsUri,
			userId,
			title
		});
		return res;
	}
};
