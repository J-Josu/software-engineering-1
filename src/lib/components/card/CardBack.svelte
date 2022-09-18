<script lang="ts">
  import type { Scenaries } from '$lib/types/db';
  import { deleteScenarie, addScenarie } from '$stores/systemStore';

  export let scenaries: Scenaries[];

  let currentScenarie = 0;
  let scenarie: Scenaries | null = null;

  $: {
    if (scenaries.length > 0) scenarie = scenaries[currentScenarie];
    else scenarie = null;
  }
</script>

<div class="card">
  <h3>Criterios de aceptacion ({scenaries.length})</h3>
  {#if scenarie}
    <ol>
      <li class="field">
        <label for="title">Escenario {currentScenarie + 1}:</label>
        <textarea
          required
          name="title"
          placeholder="<título del criterio>"
          rows="2"
          bind:value={scenarie.title}
        />
      </li>
      <li class="field">
        <label for="context">Dado:</label>
        <textarea
          required
          name="context"
          placeholder="<un contexto inicial>"
          rows="2"
          bind:value={scenarie.context}
        />
      </li>
      <li class="field">
        <label for="event">Cuando:</label>
        <textarea
          required
          name="event"
          placeholder="<ocurre un evento>"
          rows="2"
          bind:value={scenarie.event}
        />
      </li>
      <li class="field">
        <label for="response">Entonces:</label>
        <textarea
          required
          name="response"
          placeholder="<garantiza uno o mas resultados>"
          rows="2"
          bind:value={scenarie.response}
        />
      </li>
    </ol>
  {:else}
    <p>Ningun escenario añadido</p>
  {/if}
  <div>
    <button
      class="manage-button"
      on:click={() =>
        (currentScenarie =
          currentScenarie === 0 ? scenaries.length - 1 : currentScenarie - 1)}
      >Anterior</button
    >
    <button
      class="manage-button"
      on:click={() => {
        deleteScenarie(currentScenarie);
        currentScenarie = 0;
      }}>Eliminar escenario</button
    >
    <button
      class="manage-button"
      on:click={() => {
        let currentCount = scenaries.length - 1;
        addScenarie();
        currentScenarie = currentCount + 1;
      }}>Añadir escenario</button
    >
    <button
      class="manage-button"
      on:click={() =>
        (currentScenarie =
          currentScenarie === scenaries.length - 1 ? 0 : currentScenarie + 1)}
      >Siguiente</button
    >
  </div>
</div>

<style>
  li.field {
    display: grid;
    grid-template-columns: 1rem 1fr;
  }
  li label {
    grid-column: 1 / -1;
    justify-self: left;
  }
  li textarea {
    grid-column: 2 / -1;
  }
</style>
