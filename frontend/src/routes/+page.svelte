<script>
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { enhance } from '$app/forms';
  import { Label } from '$lib/components/ui/label';
  const { form: articleData } = $props();
  let isLoading = $state(false);
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<form
  method="POST"
  class="m-32 flex flex-col gap-3"
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
<div>{JSON.stringify(articleData)}</div>

<style></style>
