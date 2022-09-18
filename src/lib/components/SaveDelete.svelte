<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let saveText: string;
  export let deleteText: string;
  const dispatch = createEventDispatcher();
</script>

<div>
  <button class="save" on:click={() => dispatch('save')}> {saveText}</button>
  <button class="delete" on:click={() => dispatch('delete')}>
    {deleteText}</button
  >
</div>

<style>
  div {
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    right: 0;
    bottom: 0;
    padding: 1rem;
    gap: 1rem;
  }
  div button {
    width: min-content;
    padding-block: 0.25rem;
    padding-inline: 0.5rem;
    border: none;
    border-radius: 5%;
    font-size: 1rem;
    opacity: 0.7;
    transition: opacity 0.5s;
  }
  div button:hover {
    opacity: 0.95;
    outline: 1px solid hsl(0, 0%, 25%);
  }
  .save {
    background-color: hsl(105, 100%, 55%);
  }
  .delete {
    background-color: hsl(0, 100%, 55%);
  }
</style>
