<script>
	import { Button } from '$lib/components/ui/button';
	import { audioStore } from '$lib/stores/audioStore.svelte';
	import { PlayIcon, PauseIcon, SkipBackIcon, SkipForwardIcon } from 'lucide-svelte';

	let isManuallySeeking = $state(false);
	let sliderValue = $state(0);
	const progressPercent = $derived((audioStore.playbackTime / audioStore.duration) * 100);
	$effect(() => {
		if (!isManuallySeeking) {
			sliderValue = progressPercent;
		}
	});
</script>

<div class="flex min-h-fit w-full flex-col gap-2 border-2 bg-white px-8 py-4 shadow-md">
	<div class="flex flex-row items-center justify-center gap-4">
		<Button variant="ghost" class="rounded-full p-2" onclick={() => audioStore.prev()}>
			<SkipBackIcon size={26} strokeWidth={1.5} class="fill-slate-800" />
		</Button>
		{#if audioStore.isPaused}
			<Button variant="ghost" class="rounded-lg p-2" onclick={() => audioStore.play()}>
				<PlayIcon size={30} strokeWidth={1.5} class="fill-slate-800" />
			</Button>
		{:else}
			<Button variant="ghost" class="rounded-lg p-2" onclick={() => audioStore.pause()}>
				<PauseIcon size={30} strokeWidth={1.5} class="fill-slate-800" />
			</Button>
		{/if}

		<Button variant="ghost" class="rounded-full p-2" onclick={() => audioStore.next()}>
			<SkipForwardIcon size={26} strokeWidth={1.5} class="fill-slate-800" />
		</Button>
	</div>
	<div class="flex w-full flex-row items-center justify-between gap-4">
		<p class="w-11 min-w-11 text-center">{audioStore.playbackTimeString}</p>
		<input
			id="default-range"
			type="range"
			bind:value={sliderValue}
			class="h-2 w-full cursor-pointer appearance-none rounded-lg"
			style={`background: linear-gradient(to right, #3b82f6 ${sliderValue}%, #e5e7eb ${sliderValue}%)`}
			step=".01"
			ontouchstart={() => {
				isManuallySeeking = true;
			}}
			ontouchend={() => {
				audioStore.currentTimePercentage = sliderValue;
				isManuallySeeking = false;
			}}
			onmousedown={() => {
				isManuallySeeking = true;
			}}
			onmouseup={() => {
				audioStore.currentTimePercentage = sliderValue;
				isManuallySeeking = false;
			}}
		/>
		<p class="w-11 min-w-11 text-center">{audioStore.durationString}</p>
	</div>
</div>
