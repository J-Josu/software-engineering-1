<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { supabase } from '$db/supabaseClient';
  import { pageMetada } from '$lib/stores/pageData';
  import { user } from '$stores/auth';
  import PathNavigation from './PathNavigation.svelte';

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) return console.log(error);

    goto('/login');
  };

  $: title = $pageMetada.title ? $pageMetada.title : '';
</script>

<header>
  <div class="background">
    <a href="/">Inicio</a>
    <h1>{title}</h1>
    {#if $user}
      <button on:click={logOut}>Cerrar sesion</button>
    {:else if $page.url.pathname !== '/login'}
      <a href="/login">Iniciar Sesion</a>
    {:else}
      <span>Holi</span>
    {/if}
  </div>
  <PathNavigation />
</header>

<style>
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--header-height);
  }
  .background {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: hsla(0, 0%, 95%, 0.75);
    backdrop-filter: blur(var(--layout-blur));
    box-shadow: inset 5px 0 10px 1px hsl(0, 0%, 80%);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-items: center;
  }
  /* header::before {
    content: '';
    position: fixed;
    align-self: center;
    justify-self: center;
    top: 0;
    left: -10vw;
    width: 110vw;
    height: var(--header-height);
  } */
  h1 {
    font-size: 1.5rem;
    /* z-index: 1; */
  }
  button {
    border: none;
  }
</style>
