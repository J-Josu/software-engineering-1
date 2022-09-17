<script lang="ts">
  import { storie, system } from '$stores/systemStore';

  import Card from '$cmps/card/Card.svelte';
  import StickyNoteContainer from '$cmps/stickynote/StickyNoteContainer.svelte';

  const handleDeletion = async () => {};
</script>

<svelte:head>
  <title>{$system?.name}</title>
</svelte:head>

<article>
  {#if $storie}
    <StickyNoteContainer color={$storie.color} rotate={false}>
      <Card storie={$storie} />
    </StickyNoteContainer>
  {/if}
</article>

<style>
  article {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    overflow-y: visible;
  }
  section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(255px, 1fr));
    grid-auto-rows: minmax(255px, 1fr);
    justify-items: center;
    width: 100%;
    gap: 2rem;
    margin-top: 1rem;
    padding: 1rem;
    overflow-y: auto;
  }
</style>
