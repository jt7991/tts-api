import * as Minio from 'minio';
import { env } from '$env/dynamic/private';

const minioClient = new Minio.Client({
	endPoint: env.MINIO_ENDPOINT,
	useSSL: true,
	accessKey: env.MINIO_ACCESS_KEY,
	secretKey: env.MINIO_SECRET_KEY
});

export const getTestFile = () => {
	return minioClient.presignedGetObject(
		'tts',
		'1e5e9138-459d-49e3-b72f-e41962116261.wav',
		24 * 60 * 60
	);
};
