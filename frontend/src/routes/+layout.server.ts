import { getTestFile } from '$lib/server/storage';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	return {
		tracks: [
			{
				title: 'Foo',
				url: 'google.com/foo',
				mediaUrl: await getTestFile(),
				id: '12345'
			},
			{
				title: 'The Fuzz',
				url: 'google.com/thefuzz',
				mediaUrl: 'https://www.google.com',
				id: '1234'
			}
		]
	};
};
