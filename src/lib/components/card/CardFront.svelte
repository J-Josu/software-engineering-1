<script lang="ts">
import type { Storie } from '$lib/types/types';

import { user } from '$stores/sessionStore';
import { addRule } from '$stores/systemsStore';

  export let storie: Storie;

  let showFormulary:boolean= false;
  let newDescription:string='';

  const newRule = async () => {
    if (!$user) return;
    const newRule = await addRule($user.id, storie.id, newDescription);
    if (!newRule) return;
    storie.rules = [...storie.rules, newRule];
    showFormulary = false;
  };
</script>

<div class="container">
  <div class="card">
    <form action="">
      <div class="field">
        <label for="id">Id:</label>
        <input type="text" name="id" id="" bind:value={storie.id_custom} />
      </div>
      <div class="field">
        <label for="title">Titulo</label>
        <input type="text" name="title" id="" bind:value={storie.description} />
      </div>

      <h1>Reglas de negocio</h1>
      {#each storie.rules as rule, i}
        <div class="field">
          <label for="rule-{i}">Regla {i + 1}:</label>
          <input type="text" name="rule-{i}" id="" bind:value={rule.description} />
        </div>
      {:else}
        <p>Ningun escenario añadido</p>
      {/each}
      {#if showFormulary}
      <form on:submit|preventDefault={newRule}>
        <div class="field">
          <label for="new-rule">Nueva regla:</label>
          <input type="text" name="new-rule" id="" bind:value={newDescription} />
          <button type='submit'>Confirmar</button>
        </div>
      </form>
      {/if}
    </form>
    <button on:click={()=> showFormulary= true}>Añadir regla</button>
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
