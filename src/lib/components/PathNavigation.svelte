<script lang="ts">
  import { page } from '$app/stores';
  import { user, userData } from '$stores/auth';

  $: paths = $page.url.pathname.split('/').filter((path) => path !== '');
</script>

<nav>
  <ol>
    {#if $userData}
      <li><a href="/perfil">{$userData.name}</a></li>
    {:else}
      <li><a href="/login">anonimo</a></li>
    {/if}
    <li><a href="/">:/</a></li>
    {#each paths as path, i}
      <li>
        <a href={'/' + paths.slice(0, i + 1).join('/')}
          >{path}{i < paths.length - 1 ? '/' : ''}</a
        >
      </li>
    {/each}
    <li style:position="absolute" style:right="0"><slot /></li>
  </ol>
</nav>

<style>
  nav {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding-inline: 1rem;
    border-bottom: 1px solid hsl(0, 0%, 85%);
    background-color: hsla(0, 0%, 95%, 0.9);
    backdrop-filter: blur(var(--layout-blur));
    /* box-shadow: inset 5px 0 10px 1px hsl(0, 0%, 80%); */
  }
  ol {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    max-width: 1280px;
  }
  li > :global(*) {
    display: inline;
    padding: 0.125rem;
    font-size: 1.125rem;
    font-family: consolas;
    background-color: transparent;
  }
  li > :global(*):hover {
    background-color: aquamarine;
  }
</style>
