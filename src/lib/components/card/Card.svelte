<script lang="ts">
  import StickyNoteContainer from '$cmps/stickynote/StickyNoteContainer.svelte';
  import type { Storie } from '$lib/types/types';

  import CardBack from './CardBack.svelte';
  import CardFront from './CardFront.svelte';

  export let side: 'front' | 'back' = 'front';
  export let storie: Storie;
</script>

<StickyNoteContainer color={storie.color} rotate={false}>
  <div class="container">
    {#if side == 'front'}
      <CardFront
        bind:id={storie.id_custom}
        bind:title={storie.description}
        rules={storie.rules}
      />
    {:else}
      <CardBack scenaries={storie.scenaries} />
    {/if}
  </div>
</StickyNoteContainer>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
    background-color: hsl(0, 100%, 50%, 0.1);
  }

  .container :global(.card) {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    padding-bottom: 0;
    width: 100%;
  }
  .container :global(.field) {
    display: flex;
    align-items: center;
    padding-inline: 0.5rem;
    padding-block: 0.25rem;
    font-size: 1.25rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  .container :global(.field > *) {
    font-family: inherit;
    font-size: inherit;
    line-height: normal;
    outline: none;
  }
  .container :global(.field > *:not(label)) {
    padding-inline: 0.25rem;
    background-color: hsl(0, 0%, 95%, 0.5);
    border: 1px solid black;
  }
  .container :global(.field label) {
    padding-inline: 0.25rem;
    font-weight: 500;
  }
  .container :global(.field textarea) {
    resize: none;
    width: 100%;
    padding: 0.125rem;
  }

  .container :global(h3) {
    margin-top: 0.5rem;
    padding-block: 0.5rem;
    font-size: 1.5rem;
  }
  .container :global(ol) {
    max-height: 50vh;
    max-width: 80vw;
    overflow-y: auto;
  }

  .container :global(.manage-button) {
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
