<script lang="ts">
	import { audioStore } from '$lib/stores/audioStore.svelte';

	$effect(() => {
		$inspect(audioStore.playingTrack);
	});
</script>

<audio bind:paused={audioStore.isPaused} bind:this={audioStore.player}></audio>
