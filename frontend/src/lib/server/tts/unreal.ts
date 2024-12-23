// Long endpoint: /synthesisTasks
// - Up to 500,000 characters
// - Asynchronous, takes ~1s per 800 chars
// - Returns a TaskId (use to check status)

import { env } from '$env/dynamic/private';

export const convertTextToSpeech = async (Text: string) => {
	const res = await fetch('https://api.v7.unrealspeech.com/synthesisTasks', {
		method: 'post',
		headers: {
			Authorization: `Bearer ${env.UNREAL_API_KEY}`,
			accept: 'application/json',
			'content-type': 'application/json'
		},
		body: JSON.stringify({
			Text, // Up to 500,000 characters
			VoiceId: 'Will', // Dan, Will, Scarlett, Liv, Amy
			Bitrate: '192k', // 320k, 256k, 192k, ...
			Speed: '0', // -1.0 to 1.0
			Pitch: '1', // -0.5 to 1.5
			TimestampType: 'sentence' // word or sentence
			//'CallbackUrl': '<URL>', // pinged when ready
		})
	});

	//OutputUri: 'https://unreal-expire-in-90-days.s3-us-west-2.amazonaws.com/3b3a977e-4570-4d1a-b9ed-cc4501df28a1-0.mp3',
	// TimestampsUri: 'https://unreal-expire-in-90-days.s3-us-west-2.amazonaws.com/3b3a977e-4570-4d1a-b9ed-cc4501df28a1-0.json',
	const responseJson = (await res.json()) as {
		SynthesisTask: {
			CreationTime: string;
			OutputUri: string;
			RequestCharacters: number;
			TaskId: string;
			TaskStatus: string;
			TimestampsUri: string;
			VoiceId: 'Will';
		};
	};
	console.log(responseJson);
	return responseJson;
};
