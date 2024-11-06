<script>
  import Header from './Header.svelte';
  import '../app.css';
</script>

<Header></Header>

<main class="h-full w-full">
  <slot></slot>
</main>
