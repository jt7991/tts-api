import dayjs from '$lib/dayjs';
import type { Article } from '$lib/server/db/schemas/articles';
class AudioStore {
	trackList = $state<Article[]>([]);
	#playingTrack = $state<Article | null>(null);
	get playingTrack() {
		return this.#playingTrack;
	}

	set playingTrack(value) {
		this.#playingTrack = value;
		if (this.#player) {
			this.#player.src = value?.audio_url || '';
		}
	}

	#playbackTime: number = $state(0);
	get playbackTime() {
		return this.#playbackTime;
	}

	durationString = $derived(this.secondsToTime(this.duration));
	playbackTimeString = $derived(this.secondsToTime(this.playbackTime));

	#player: HTMLAudioElement | null = $state(null);

	get player(): HTMLAudioElement | null {
		return this.#player;
	}

	set player(player: HTMLAudioElement) {
		if (!player) {
			return;
		}

		setInterval(() => {
			this.#playbackTime = player.currentTime;
		}, 16);

		this.#player = player;
		this.#player.onloadedmetadata = () => {
			this.#duration = this.#player?.duration || 0;
			return this.play();
		};
		this.#player.ondurationchange = () => {
			this.#duration = this.#player?.duration || 0;
		};
		this.#player.onplay = () => {
			this.isPaused = false;
		};
		this.#player.onpause = () => {
			this.isPaused = true;
		};
	}

	#duration: number = $state(0);
	get duration() {
		return this.#duration;
	}

	isPaused = $state(true);

	pause() {
		return this.#player?.pause();
	}

	play() {
		return this.#player?.play();
	}

	next() {
		const currentTrackIndex = this.trackList.findIndex((item) => item.id === this.playingTrack?.id);
		if (currentTrackIndex === undefined) {
			return;
		}
		this.playingTrack = this.trackList[currentTrackIndex + 1] || this.trackList.at(0) || null;
	}

	prev() {
		if (!this.player) {
			return;
		}

		const currentTrackIndex = this.trackList.findIndex((item) => item.id === this.playingTrack?.id);
		if (this.playbackTime < 3 || currentTrackIndex === 0) {
			this.player.currentTime = 0;
			return;
		}
		this.playingTrack = this.trackList.at(currentTrackIndex - 1) || null;
	}

	set currentTimePercentage(val: number) {
		if (!this.player) {
			return;
		}

		this.player.currentTime = val * 0.01 * this.duration;
	}

	private secondsToTime(seconds: number) {
		const dayjsDur = dayjs.duration(seconds, 'seconds');
		return `${dayjsDur.minutes().toString().padStart(2, '0')}:${dayjsDur.seconds().toString().padStart(2, '0')}`;
	}
}

export const audioStore = new AudioStore();
