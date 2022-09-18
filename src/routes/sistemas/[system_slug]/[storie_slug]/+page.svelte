<script lang="ts">
  import { deleteStorie, storie, system } from '$stores/systemStore';

  import Card from '$cmps/card/Card.svelte';
  import StickyNoteContainer from '$cmps/stickynote/StickyNoteContainer.svelte';
  import DeletePopUp from '$cmps/DeletePopUp.svelte';
    import { goto } from '$app/navigation';

  let confirmDeletion = true;
  const handleDeletion = async () => {
    await deleteStorie($storie!.id);
    if (!$system) goto('/sistemas');
  };
</script>

<svelte:head>
  <title>{$system?.name}</title>
</svelte:head>

<article>
  {#if $storie}
    <StickyNoteContainer color={$storie.color} rotate={false}>
      <Card storie={$storie} />
    </StickyNoteContainer>
    <div class="manage-storie">
      <button on:click={() => (confirmDeletion = true)}>
        Eliminar sistema</button
      >
    </div>
    <DeletePopUp
      bind:isDisplayed={confirmDeletion}
      warningMessage={`Esta seguro que quiere eliminar la historia '${$storie.id_custom}'`}
      on:deletion={handleDeletion}
    />
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
  .manage-storie {
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    right: 0;
    bottom: 0;
    padding: 1rem;
    gap: 1rem;
  }
  button {
    width: min-content;
    padding-block: 0.25rem;
    padding-inline: 0.5rem;
    background-color: hsl(0, 100%, 55%);
    border: none;
    border-radius: 5%;
    font-size: 1rem;
    opacity: 0.75;
    transition: opacity 0.5s;
  }
  button:hover {
    opacity: 0.9;
  }
</style>
