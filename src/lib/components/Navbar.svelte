<script lang="ts">
  import { page } from '$app/stores';
  import { supabase } from '$db/supabaseClient';
  import { pageMetada } from '$lib/stores/pageData';
  import { user } from '$stores/auth';
  const logOut = () => supabase.auth.signOut();
</script>

<header>
  <h1>{$pageMetada.title}</h1>
  {#if $user}
    <button on:click={logOut} style:z-index="10">Cerrar sesion</button>
  {/if}
</header>

<style>
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }
  header::before {
    content: '';
    position: fixed;
    align-self: center;
    justify-self: center;
    top: 0;
    left: -10vw;
    width: 110vw;
    height: var(--header-height);
    background-color: hsla(0, 0%, 95%, 0.75);
    backdrop-filter: blur(var(--layout-blur));
    box-shadow: inset 5px 0 10px 1px hsl(0, 0%, 80%);
  }
  header h1 {
    margin-top: 1.5rem;
    font-size: 2rem;
    z-index: 1;
  }
</style>
