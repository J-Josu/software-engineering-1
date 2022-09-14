<script lang="ts">
  import '../app.css';

  import Navbar from '$cmps/Navbar.svelte';
</script>

<Navbar />

<slot />

<footer>
  <a href="https://github.com/Lucas-Andres-GF/user-history">Build for fun</a>
</footer>

<style>
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
