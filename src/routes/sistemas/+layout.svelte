<script lang="ts">
  import '../app.css';

  import Navbar from '$cmps/Navbar.svelte';
</script>

<Navbar />

<main>
  <slot />
</main>

<footer>
  <a href="https://github.com/Lucas-Andres-GF/user-history">Build for fun</a>
</footer>

<!-- :global(*, *::after, *::before) {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:global(body) {
  height: 100vh;
}

:global(body > div) {
  width: 100%;
  height: 100%;
}
main {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
} -->

<style>
  main {
    padding-top: var(--header-height);
    margin-inline: auto;
    width: 100%;
    max-width: 95%;
    overflow-y: scroll;
    grid-column: 1/ -1;
    grid-row: 1 / -1;
    padding-bottom: 2rem;
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

  footer {
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    box-shadow: inset 5px 0 10px 1px hsl(0, 0%, 80%);
    background-color: hsla(0, 0%, 95%, 0.4);
    backdrop-filter: blur(2px);
  }
  a {
    width: fit-content;
    font-size: 0.75rem;
    margin: 0.25rem;
    font-style: italic;
  }
</style>
