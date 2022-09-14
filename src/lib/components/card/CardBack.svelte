<script lang="ts">
  import type { Storie } from '$lib/types/types';

  import { user } from '$stores/auth';
  import { addScenarie } from '$stores/systemStore';

  export let storie: Storie;

  let showFormulary: boolean = false;
  let formData = {
    title:'',
    context:'',
    event:'',
    response:''
  };

  const newScenarie = async () => {
    if (!$user) return;
    const newScenarie = await addScenarie($user.id, storie.id, formData.title, formData.context, formData.event, formData.response);
    if (!newScenarie) return;
    storie.scenaries = [...storie.scenaries, newScenarie];
    showFormulary = false;
  };
</script>

<div class="container">
  <div class="card">
    <h1>Criterios de Negocio</h1>
    {#each storie.scenaries as scenarie, i}
      <form action="">
        <div class="field">
          <label for="title">Escenario {i + 1}:</label>
          <input type="text" name="title" id="" bind:value={scenarie.title} />
        </div>
        <div class="field">
          <label for="context">Dado</label>
          <input
            type="text"
            name="context"
            id=""
            bind:value={scenarie.context}
          />
        </div>
        <div class="field">
          <label for="situation">Cuando</label>
          <input type="text" name="" id="" bind:value={scenarie.event} />
        </div>
        <div class="field">
          <label for="response">Entonces</label>
          <input
            type="text"
            name="response"
            id=""
            bind:value={scenarie.response}
          />
        </div>
      </form>
    {:else}
      <p>Ningun escenario añadido</p>
    {/each}
    {#if showFormulary}
    <form on:submit|preventDefault={newScenarie}>
      <div class="field">
        <label for="title">Nuevo escenario:</label>
        <input type="text" name="title" id="" bind:value={formData.title} />
      </div>
      <div class="field">
        <label for="context">Dado</label>
        <input
          type="text"
          name="context"
          id=""
          bind:value={formData.context}
        />
      </div>
      <div class="field">
        <label for="situation">Cuando</label>
        <input type="text" name="" id="" bind:value={formData.event} />
      </div>
      <div class="field">
        <label for="response">Entonces</label>
        <input
          type="text"
          name="response"
          id=""
          bind:value={formData.response}
        />
      </div>
      <button type="submit">Añadir escenario</button>
    </form>
    {/if}
  <button on:click={()=> showFormulary= true}>Añadir escenario</button>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
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
</style>
