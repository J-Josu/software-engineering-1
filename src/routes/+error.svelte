<script lang="ts">
  import { page } from '$app/stores';
</script>

<main>
  <h1>{$page.status}</h1>
  <p>{$page.error?.message}</p>
  
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>
