<script lang="ts">
	import { Title } from './ui/card';

	const {
		data
	}: {
		data: { title: string }[];
	} = $props();
</script>

<li>
	{#each data as item}
		<Title>{item.title}</Title>
	{/each}
</li>
