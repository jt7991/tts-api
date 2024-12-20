<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { enhance } from '$app/forms';
	import { Label } from '$lib/components/ui/label';
	import { XIcon } from 'lucide-svelte';
	let isLoading = $state(false);
	let { onClose }: { onClose: () => void } = $props();
</script>

<div class={`absolute left-0 top-0 h-screen w-screen translate-y-0 bg-white`}>
	<div class={`flex w-full flex-row items-end justify-end p-2 `}>
		<Button variant="ghost" onclick={onClose} class="p-2">
			<XIcon />
		</Button>
	</div>
	<form
		method="POST"
		class="flex flex-col gap-3 px-4 pt-4"
		use:enhance={async () => {
			isLoading = true;
			return ({ update }) => {
				update().finally(() => (isLoading = false));
			};
		}}
	>
		<div class="flex flex-col gap-1">
			<Label for="url">Enter a url</Label>
			<Input title="url" id="url" name="url" />
		</div>
		<Button type="submit" class="grow-0 self-end" disabled={isLoading}>Submit</Button>
	</form>
</div>
