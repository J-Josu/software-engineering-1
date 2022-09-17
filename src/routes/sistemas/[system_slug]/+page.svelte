<script lang="ts">
  import { user } from '$stores/auth';
  import { addStorie } from '$stores/systemStore';

  import { system } from '$stores/systemStore';
  import StickyNoteContainer from '$cmps/stickynote/StickyNoteContainer.svelte';
  import WhiteBoardContainer from '$cmps/whiteboard/WhiteBoardContainer.svelte';
  import PopUp from '$cmps/PopUp.svelte';
  import StorieForm from './StorieForm.svelte';


  const formData = {
    id_custom: '',
    title: '',
  };

  let showForm = false;
  const newStorie = async () => {
    if (!$user) return;
    const newStorie = await addStorie(
      formData.id_custom,
      formData.title,
      `hsl(${Math.round(Math.random() * 360)} 85% 78%)`,
      $user.id,
      $system!.id
    );
    if (!newStorie) return;
    $system!.stories = [...$system!.stories, newStorie];
    showForm = false;
  };
  let confirmDeletion = false;
  const handleSave = async () => {};
  const handleDeletion = async () => {};
</script>

<svelte:head>
  <title>{$system?.name}</title>
</svelte:head>

<article>
  {#if $system}
    <WhiteBoardContainer>
      <div class="summary">
        <h1>{$system.name}</h1>
        <p>{$system.description}</p>
      </div>
      <section>
        {#each $system.stories as { id, id_custom, description, color, slug } (id)}
          <StickyNoteContainer
            link={`/sistemas/${$system.slug}/${slug}`}
            {color}
          >
            <div class="historie">
              <h2>{id_custom}</h2>
              <p>
                {description.length < 64
                  ? description
                  : description.slice(0, 61) + '...'}
              </p>
            </div>
          </StickyNoteContainer>
        {/each}

        <div class="new-historie">
          {#if $system.stories.length === 0}
            <h2>No se agrego ninguna historia, comienze agregando una</h2>
          {/if}
          <button on:click={() => (showForm = true)}>
            <img src="/add-icon.svg" alt="Simbolo de agregar" />
          </button>
        </div>
      </section>
      <PopUp bind:isDisplayed={showForm}>
        <StorieForm
          bind:id_custom={formData.id_custom}
          bind:title={formData.title}
          on:close={() => (showForm = false)}
          on:submit={() => {
            newStorie();
            showForm = false;
          }}
        />
      </PopUp>
    </WhiteBoardContainer>
    <div class="manage-system">
      <button style:background-color="limegreen" on:click={handleSave}
        >Guardar sistema</button
      >
      <button
        style:background-color="red"
        on:click={() => (confirmDeletion = true)}
      >
        Eliminar sistema</button
      >
    </div>
    <PopUp bind:isDisplayed={confirmDeletion}>estas seguro</PopUp>
  {/if}
</article>

<style>
  article {
    display: flex;
    justify-content: center;
    width: 100%;
    padding-top: 0.5rem;
  }
  article:first-child {
    min-height: 70vh;
  }
  .summary {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(191px, 1fr));
    grid-auto-rows: minmax(207px, 1fr);
    justify-items: center;
    width: 90%;
    gap: 1rem;
    margin-top: 1rem;
    margin-inline: auto;
    margin-bottom: 1rem;
  }
  section > :global(*:hover:not(.new-historie)) {
    scale: 1.2;
    z-index: 1;
    transition: all 0.6s ease;
  }
  .historie {
    padding-top: 1.5rem;
  }

  .new-historie {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    border-radius: 2.5%;
    transition: border 2s ease;
    border: 1px solid transparent;
  }
  .new-historie:hover {
    border: 1px solid hsl(0, 0%, 75%);
  }
  .new-historie h2 {
    max-width: 24ch;
    font-size: 1.25rem;
    text-align: center;
  }
  button {
    width: 4rem;
    border: none;
  }
  button:hover {
    scale: 1.1;
    z-index: 1;
    transition: all 1s ease;
  }
  button img {
    width: 100%;
  }
  .manage-system {
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    right: 0;
    bottom: 0;
    padding: 1rem;
    gap: 1rem;
  }
  .manage-system button {
    font-size: 1rem;
    width: min-content;
    padding-block: 0.25rem;
    padding-inline: 0.5rem;
    border-radius: 5%;
  }
</style>
