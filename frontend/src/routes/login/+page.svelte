<script>
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardTitle } from '$lib/components/ui/card';
</script>

<div class="flex h-full w-full items-center justify-center">
	<Card class="h-96 w-80 items-center justify-center">
		<CardTitle class="p-6 text-center text-3xl font-bold">Login</CardTitle>
		<CardContent class="flex items-center justify-center">
			<Button href="/login/google">Connect with Google</Button>
		</CardContent>
	</Card>
</div>
