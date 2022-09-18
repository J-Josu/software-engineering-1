<script lang="ts">
  import { goto } from '$app/navigation';
  import { deleteStorie, storie, system } from '$stores/systemStore';

  import Card from '$cmps/card/Card.svelte';
  import DeletePopUp from '$cmps/DeletePopUp.svelte';
  import SaveDelete from '$cmps/SaveDelete.svelte';

  let confirmDeletion = false;
  let side: 'front' | 'back' = 'front';

  const handleDeletion = async () => {
    const result = deleteStorie($storie!.id);
    if (!$storie) goto(`/sistemas/${$system?.slug}`);
  };
  const handleUpdate = async () => {
    alert('Implement sistem update');
  };
</script>

<svelte:head>
  <title>{$system?.name}</title>
</svelte:head>

<article>
  {#if $storie}
    <Card storie={$storie} {side} />
    <button
      class="change-side"
      on:click={() => (side = side === 'back' ? 'front' : 'back')}
      >Cambiar lado</button
    >
    <SaveDelete
      saveText="Guardar historia"
      deleteText="Eliminar historia"
      on:save={handleUpdate}
      on:delete={() => (confirmDeletion = true)}
    />
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
  }

  .change-side {
    margin-top: 1.25rem;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    font-size: 1.25rem;
  }
</style>
