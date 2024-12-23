<script>
	import Header from './Header.svelte';
	import '../app.css';
	import AudioPlayer from '$lib/components/AudioPlayer.svelte';
	import { audioStore } from '$lib/stores/audioStore.svelte';

	const { data, children } = $props();
	$effect(() => {
		audioStore.trackList = data.articles;
	});
</script>

<Header></Header>

<main class="h-full w-full">
	<AudioPlayer />
	{@render children()}
</main>
