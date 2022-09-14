<script lang="ts">
  import { goto } from '$app/navigation';
  import { pageMetada } from '$stores/pageData';
  import StickyNoteContainer from '$cmps/stickynote/StickyNoteContainer.svelte';
  import Card from '$cmps/card/Card.svelte';
import type { Storie } from '$lib/types/types';
import { page } from '$app/stores';
import { system } from '$stores/systemsStore';

  export let data:Storie;

  $pageMetada.title = `Historia: ${data.id_custom}`;
  const newSystem = () => {
    alert('Not implemented');
  };
</script>

<svelte:head>
  <title>{$system?$system.name:'Error'}</title>
</svelte:head>

<article>
  <StickyNoteContainer color={data.color} rotate={false}>
    <Card storie={data}/>
  </StickyNoteContainer>
  <section />
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
