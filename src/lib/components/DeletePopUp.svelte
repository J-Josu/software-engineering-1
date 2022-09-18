<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import PopUp from './PopUp.svelte';
  export let isDisplayed = true;
  export let warningMessage: string;
  export let cancelMessage = 'Cancelar';
  export let deleteMessage = 'Borrar';

  const dispatch = createEventDispatcher();
</script>

<PopUp bind:isDisplayed>
  <div class="container">
    <h1>{warningMessage}</h1>
    <div>
      <button on:click={() => (isDisplayed = false)}>{cancelMessage}</button>
      <button on:click={() => dispatch('deletion')}>{deleteMessage}</button>
    </div>
  </div>
</PopUp>

<style>
  .container {
    max-width: max(50%, 320px);
    padding: 2rem;
    border-radius: 1rem;
    background-color: hsl(0, 0%, 95%);
    box-shadow: 6px 9px 1px rgba(0, 0, 0, 0.1);
  }
  h1 {
    text-align: center;
  }
  .container > div {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
  }
  button {
    padding: 0.5rem;
    font-size: 1.25rem;
    background-color: hsl(0, 0%, 98%, 0.75);
    border-radius: 0.5rem;
    border-left: 1px solid hsl(0, 0%, 50%);
    border-top: 1px solid hsl(0, 0%, 50%);
    border-right: 1px solid hsl(0, 0%, 10%);
    border-bottom: 1px solid hsl(0, 0%, 10%);
  }
  button:hover {
    scale: 1.1;
  }
</style>
