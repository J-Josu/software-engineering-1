<script lang="ts">
  import { goto } from '$app/navigation';
  import { supabase } from '$db/supabaseClient';
  import { user } from '$stores/auth';
  import PathNavigation from './PathNavigation.svelte';

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) return console.log(error);

    goto('/login');
  };
</script>

<header>
  <PathNavigation>
    {#if $user}
      <button on:click={logOut}>Cerrar Sesion</button>
    {:else}
      <a href="/login">Iniciar Sesion</a>
    {/if}
  </PathNavigation>
</header>

<style>
  header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: var(--header-height);
  }
  button {
    border: none;
  }
</style>
