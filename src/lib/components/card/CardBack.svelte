<script lang="ts">
  import type { Scenaries } from '$lib/types/db';
  import { generateScenarie } from '$stores/systemStore';

  export let scenaries: Scenaries[];
  let currentScenarie = 0;
  let scenarie: Scenaries | null = null;

  $: if (scenaries.length > 0) scenarie = scenaries[currentScenarie];

  let formData = {
    title: '',
    context: '',
    event: '',
    response: '',
  };

  const addScenarie = async () => {
    const scenarie = generateScenarie(
      formData.title,
      formData.context,
      formData.event,
      formData.response
    );
    if (!scenarie) return console.log('No se pudo crear el scenario');

    scenaries = [...scenaries, scenarie];
    currentScenarie = scenaries.length - 1;
  };
</script>

<div class="container">
  <h3>Criterios de Negocio</h3>
  {#if scenarie}
    <ol action="">
      <li class="field">
        <label for="title">Escenario {currentScenarie + 1}:</label>
        <textarea
          required
          name="title"
          placeholder="Definicion"
          rows="2"
          bind:value={scenarie.title}
        />
      </li>
      <li class="field">
        <label for="context">Dado:</label>
        <textarea
          required
          name="context"
          placeholder="Definicion"
          rows="2"
          bind:value={scenarie.context}
        />
      </li>
      <li class="field">
        <label for="event">Cuando:</label>
        <textarea
          required
          name="event"
          placeholder="Definicion"
          rows="2"
          bind:value={scenarie.event}
        />
      </li>
      <li class="field">
        <label for="response">Entonces:</label>
        <textarea
          required
          name="response"
          placeholder="Definicion"
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
      class="change-button"
      on:click={() =>
        (currentScenarie =
          currentScenarie === 0 ? scenaries.length - 1 : currentScenarie - 1)}
      >Anterior</button
    >
    <button type="button" class="add-button" on:click={addScenarie}
      >Añadir escenario</button
    >
    <button
      class="change-button"
      on:click={() =>
        (currentScenarie =
          currentScenarie === scenaries.length - 1 ? 0 : currentScenarie + 1)}
      >Siguiente</button
    >
  </div>
</div>

<style>
  .container {
    padding: 1rem;
    background-color: rgb(182, 86, 86);
    outline: var(--dev-outline);
  }
</style>
