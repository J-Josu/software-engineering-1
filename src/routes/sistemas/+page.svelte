<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { pageMetada } from '$stores/pageData';
  import { addSystem, loadSystems, systems } from '$stores/systemsStore';
  import { user } from '$stores/sessionStore';
  
  import StickyNoteContainer from '$cmps/stickynote/StickyNoteContainer.svelte';
  import WhiteBoardContainer from '$cmps/whiteboard/WhiteBoardContainer.svelte';
  
  $pageMetada.title = 'Sistemas Elicitados';

  const formData = {
    name: '',
    description: ''
  }

  const newSystem = () => {
    if (!$user) return;
    addSystem(formData.name, formData.description, $user.id);
    showFormulary = false;
  };

  let showFormulary = false;

  onMount(() => {
    if ($systems.length === 0) loadSystems();
  })
</script>

<svelte:head>
  <title>Practica 2</title>
</svelte:head>

<article>
  <section>
    {#each $systems as { id, name, stories, slug } (id)}
      {@const systemUrl = `/sistemas/${slug}`}
      <WhiteBoardContainer onClick={() => goto(systemUrl)}>
        <div class="system">
          <h2>{name}</h2>
          <div class="system-histories">
            {#each stories as {color, slug }}
              <StickyNoteContainer {color} link={`${systemUrl}/${slug}`} />
            {/each}
          </div>
          {#if stories.length === 0}
            <p>Ninguna historia a sido agregada</p>
          {/if}
        </div>
      </WhiteBoardContainer>
    {/each}

    <div class="new-system">
      {#if $systems.length === 0}
        <h2>No se agrego ningun sistema, comienze agregando uno</h2>
      {/if}
      <button on:click={() => showFormulary = true}>
        <img src="/add-icon.svg" alt="Simbolo de agregar" />
      </button>
    </div>
  </section>
  {#if showFormulary}
    <form on:submit|preventDefault={newSystem}>
      <label for="name">id</label>
      <input type="text" required name="name" bind:value={formData.name}/>
      <label for="description">description</label>
      <input type="text" name="description" bind:value={formData.description}/>
      <button type="submit">Crear</button>
      <button on:click={() => showFormulary = false}>Cerrar</button>
    </form>
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
  .system {
    height: 100%;
  }
  .system-histories {
    display: grid;
    grid-template-columns: repeat(auto-fit, 3.5rem);
    grid-auto-rows: 3.5rem;
    place-items: center;
    width: 100%;
    margin-top: 0.5rem;
  }
  .system-histories > :global(*:hover) {
    scale: 1.2;
    z-index: 1;
    transition: all 0.6s ease;
  }
  .system p {
    margin-left: 1rem;
    margin-top: 0.5rem;
    font-size: 1.1rem;
  }

  .new-system {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    border-radius: 2.5%;
    transition: border 2s ease;
    border: 1px solid transparent;
  }
  .new-system:hover {
    border: 1px solid hsl(0, 0%, 75%);
  }
  .new-system h2 {
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
</style>
