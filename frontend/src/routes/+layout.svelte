<script>
	import Header from './Header.svelte';
	import '../app.css';
	import AudioPlayer from '$lib/components/AudioPlayer.svelte';
	import { audioStore } from '$lib/stores/audioStore.svelte';
	import { onMount } from 'svelte';

	const { data } = $props();
	onMount(() => {
		audioStore.trackList = data.tracks;
	});
</script>

<Header></Header>

<main class="h-full w-full">
	<AudioPlayer />
	<slot></slot>
</main>
