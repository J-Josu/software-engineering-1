<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';

  export let id_custom: string;
  export let title: string;

  const dispatch = createEventDispatcher();

  onMount(() => {
    id_custom = '';
    title = '';
  });
</script>

<section>
  <h2>Nueva Historia</h2>
  <form on:submit|preventDefault={() => dispatch('submit')}>
    <div class="input-group">
      <label for="name">ID</label>
      <input
        required
        type="text"
        name="name"
        placeholder="<verbo> <sustantivo>"
        pattern="\w+ \w+"
        bind:value={id_custom}
      />
    </div>
    <div class="input-group">
      <label for="title">Titulo</label>
      <textarea
        required
        name="title"
        placeholder="Como <rol> quiero <algo> para <beneficio>"
        rows="4"
        bind:value={title}
      />
    </div>
    <div class="button-group">
      <button type="button" on:click={() => dispatch('close')}>Cerrar</button>
      <button>Crear</button>
    </div>
  </form>
</section>

<style>
  section {
    padding: 2rem;
    border-radius: 5%;
    background-color: hsl(0, 0%, 95%);
    box-shadow: 6px 9px 1px rgba(0, 0, 0, 0.1);
  }
  h2 {
    font-size: 1.75rem;
    text-align: center;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding-inline: 0.25rem;
    padding-top: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid lightgray;
    --input-font-size: 1rem;
  }
  .input-group label {
    font-size: 1.25rem;
  }
  .input-group *:not(label) {
    min-width: 32ch;
    margin-left: 0.25rem;
    padding-inline: 0.25rem;
    padding-block: 0.125rem;
    background-color: transparent;
    outline: none;
    border: none;
    font-size: var(--input-font-size);
    font-family: inherit;
  }
  .input-group textarea {
    resize:none;
  }
  
  .button-group {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 1rem;
  }
  .button-group button {
    padding: 0.25rem;
    border-radius: 10%;
    border-width: 1px;
    font-size: 1.25rem;
    background-color: transparent;
  }
</style>
