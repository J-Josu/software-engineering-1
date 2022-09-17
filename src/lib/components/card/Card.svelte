<script lang="ts">
  import type { Storie } from '$lib/types/types';

  import CardBack from './CardBack.svelte';
  import CardFront from './CardFront.svelte';

  let side: 'front' | 'back' = 'front';
  export let storie: Storie;
  const toggleSide = () => {
    side = side == 'back' ? 'front' : 'back';
  };
</script>

<div class="container" style:background-color="var(--dev-background)">
  <div class="card">
    <form on:submit|preventDefault>
      <div class="field">
        <label for="id_custom">ID:</label>
        <input type="text" name="id_custom" bind:value={storie.id_custom} />
      </div>
      <div class="field">
        <label for="description">Titulo:</label>
        <textarea
          required
          name="description"
          rows="2"
          bind:value={storie.description}
        />
      </div>
      {#if side == 'front'}
        <CardFront rules={storie.rules.map((rule) => rule.description)} />
      {:else}
        <CardBack scenaries={storie.scenaries} />
      {/if}
    </form>
  </div>
  <button on:click={toggleSide}>Cambiar lado</button>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    outline: var(--dev-outline);
  }

  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: fit-content;
    padding: 2rem;
    border-radius: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .field {
    display: flex;
    gap: 0.5rem;
    background-color: cornflowerblue;
  }
  .field > * {
    font-family: inherit;
  }
  textarea {
    outline: none;
    resize: none;
    min-width: 32ch;
    padding: 0.125rem;
    background-color: transparent;
    border: none;
  }

  
  .container :global(h3) {
    padding-block: 0.5rem;
  }
  .container :global(ol *) {
    font-size: 1.125rem;
    font-family: inherit;
  }
  .container :global(li) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-inline: 0.5rem;
    padding-block: 0.25rem;
    background-color: hsl(0, 0%, 98%, 0.2);
  }
  .container :global(li + li) {
    border-top: 1px solid hsl(0, 0%, 98%, 0.2);
  }
  .container :global(li > label) {
    align-self: baseline;
    line-height: 1.5rem;
  }
  .container :global(textarea) {
    outline: none;
    resize: none;
    min-width: 32ch;
    padding: 0.125rem;
    background-color: transparent;
    border: none;
  }
  .container :global(button:not(.icon)) {
    border: none;
    background-color: hsl(0, 0%, 98%, 0.5);
    border-bottom: 1px solid hsl(0, 0%, 98%, 0.75);
    border-right: 1px solid hsl(0, 0%, 98%);
    margin-top: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
  }
</style>
