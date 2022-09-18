<script lang="ts">
  import type { Rules } from '$lib/types/db';
  import { addRule, deleteRule } from '$stores/systemStore';

  export let id: string;
  export let title: string;
  export let rules: Rules[];
</script>

<div class="container">
  <div class="field">
    <label for="id_custom">ID:</label>
    <input type="text" name="id" bind:value={id} />
  </div>
  <div class="field">
    <label for="description">Titulo:</label>
    <textarea required name="description" rows="2" bind:value={title} />
  </div>
  <h3>Reglas de negocio ({rules.length})</h3>
  <ol>
    {#each rules as { description }, i}
      <li class="field">
        <label for="rule-{i}">{i + 1}:</label>
        <textarea
          required
          name="rule-{i}"
          placeholder="Definicion"
          rows="2"
          bind:value={description}
        />
        <button on:click={() => deleteRule(i)}>x</button>
      </li>
    {:else}
      <p>Ninguna regla añadida</p>
    {/each}
  </ol>
  <button class="add-button" on:click={addRule}
    >Añadir regla</button
  >
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    padding-bottom: 0;
    width: 100%;
  }
  .field {
    display: flex;
    align-items: center;
    padding-inline: 0.5rem;
    padding-block: 0.25rem;
    font-size: 1.25rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  .field > * {
    font-family: inherit;
    font-size: inherit;
    line-height: normal;
    outline: none;
  }
  .field > *:not(label) {
    padding-inline: 0.25rem;
    background-color: hsl(0, 0%, 95%, 0.5);
    border: 1px solid black;
  }
  .field label {
    padding-inline: 0.25rem;
    font-weight: 500;
  }
  .field textarea {
    resize: none;
    width: 100%;
    padding: 0.125rem;
  }

  h3 {
    margin-top: 0.5rem;
    padding-block: 0.5rem;
    font-size: 1.5rem;
  }
  ol {
    max-height: 50vh;
    max-width: 80vw;
    overflow-y: auto;
  }
  li.field {
    display: grid;
    grid-template-columns: 2.5rem 1fr 2.5rem;
    align-items: center;
    padding-inline: 0;
  }
  li.field label {
    justify-self: right;
  }
  li.field button {
    place-self: center;
    display: grid;
    border-radius: 25%;
    width: 1.5rem;
    height: 1.5rem;
    padding: 0;
    line-height: 100%;
  }

  .add-button {
    align-self: center;
    width: fit-content;
    margin-top: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: hsl(0, 0%, 98%, 0.5);
    border: 1px solid black;
    font-size: inherit;
  }
</style>
