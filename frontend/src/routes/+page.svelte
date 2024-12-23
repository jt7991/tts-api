<script lang="ts">
	import MediaControlBar from '$lib/components/MediaControlBar.svelte';
	import { Button } from '$lib/components/ui/button';
	import UrlForm from '$lib/components/urlForm.svelte';
	import { audioStore } from '$lib/stores/audioStore.svelte';
	import classNames from 'classnames';
	import { PlusIcon } from 'lucide-svelte';

	let isAddModalShown = $state(false);
</script>

<div class="flex h-full flex-col">
	<div
		class="flex h-12 w-full items-center justify-between border bg-white p-2 text-center shadow-black"
	>
		<p>Fizzy shit app</p>
		<Button variant="ghost" class="p-2" onclick={() => (isAddModalShown = true)}>
			<PlusIcon />
		</Button>
	</div>
	<div class="h-full w-full flex-col justify-between overflow-auto bg-neutral-50">
		<ul>
			{#each audioStore.trackList as item}
				<li class="w-full">
					<button
						class={classNames(
							'w-full cursor-pointer flex-col gap-0 p-4 text-left hover:bg-neutral-200',
							{
								'bg-neutral-200': item?.id === audioStore.playingTrack?.id
							}
						)}
						onclick={() => {
							audioStore.playingTrack = item;
						}}
					>
						<h3 class="bold text-sm">{item.title}</h3>
						<h4 class="text-xs">{item.web_url}</h4>
					</button>
				</li>
			{/each}
		</ul>
	</div>
	{#if audioStore.playingTrack}
		<MediaControlBar />
	{/if}
</div>
{#if isAddModalShown}
	<UrlForm onClose={() => (isAddModalShown = false)} />
{/if}
