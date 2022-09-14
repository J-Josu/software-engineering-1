<script lang="ts">
  import { user } from '$stores/auth';
</script>

<main>
  {#if !$user}
    <h1>Recuerde que para utilizar las funcionalidades debe iniciar sesion</h1>
  {/if}
  <slot />
</main>

<style>
  h1 {
    font-size: 2rem;
    margin-top: 2rem;
    text-align: center;
    max-width: 32ch;
    margin-inline: auto;
  }
  main {
    margin-inline: auto;
    width: 100%;
    max-width: 95%;
    overflow-y: scroll;
    grid-column: 1/ -1;
    grid-row: 1 / -1;
    height: 100%;
  }
  main::-webkit-scrollbar {
    display: none;
  }
  @media screen and (min-width: 688px) {
    main {
      max-width: 90%;
    }
  }
  @media screen and (min-width: 992px) {
    main {
      max-width: 80%;
    }
  }
  @media screen and (min-width: 1312px) {
    main {
      max-width: 70%;
    }
  }
</style>
