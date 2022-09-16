<script lang="ts">
  import { page } from '$app/stores';
  import { user, userData } from '$stores/auth';
  $: paths = $page.url.pathname.split('/').filter((path) => path !== '');
</script>

<nav>
  <ol>
    {#if $userData}
      <li><a href="/perfil">{$userData.name}</a>:</li>
    {:else}
      <li><a href="/login">anonimo</a>:</li>
    {/if}
    <li><a href="/">/</a></li>
    {#each paths as path, i}
      <li>
        <a href={'/' + paths.slice(0, i + 1).join('/')}
          >{path}{i < paths.length - 1 ? '/' : ''}</a
        >
      </li>
    {/each}
  </ol>
</nav>

<style>
  nav {
    padding-left: 1rem;
    border-bottom: 1px solid hsl(0, 0%, 85%);
    font-family: consolas;
  }
  ol {
    display: flex;
  }
  li {
    font-size: 1.125rem;
  }
  a {
    padding: 0.125rem;
  }
  a:hover {
    background-color: aquamarine;
  }
</style>
