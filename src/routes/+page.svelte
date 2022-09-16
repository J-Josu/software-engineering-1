<script lang="ts">
  import PracticePreview from '$cmps/PracticePreview.svelte';
</script>

<svelte:head>
  <title>Asistente IS 1</title>
</svelte:head>

<main>
  <article>
    <div>
      <h1>Asistente para las Practicas</h1>
      <ul>
        <li>
          <PracticePreview
            link="/sistemas"
            title="2 - Historias de Usuario"
            description="Una historia de usuario es una descripción corta y simple de un requerimiento de un sistema, que se escribe en lenguaje común del usuario y desde su perspectiva."
          />
        </li>
        <li>
          <PracticePreview
            link="/undefined"
            title="3 - Place holder"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda sequi, nemo ipsum impedit, error ipsam adipisci non voluptatibus necessitatibus quidem velit perferendis! Et placeat, aperiam quasi harum tempora asperiores iste."
          />
        </li>
        <li>
          <PracticePreview
            link="/undefined"
            title="4 - Another place holder"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda sequi, nemo ipsum impedit, error ipsam adipisci non voluptatibus necessitatibus quidem velit perferendis! Et placeat, aperiam quasi harum tempora asperiores iste."
          />
        </li>
      </ul>
    </div>
  </article>
</main>


<style>
  article {
    display: flex;
    justify-content: space-around;
    padding-block: 5vh;
  }
  article > div {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h1 {
    margin-top: 2rem;
    max-width: 32ch;
    text-align: center;
  }
  h2 {
    margin-top: 2rem;
    background-color: inherit;
  }
  ul {
    display: grid;
    grid-gap: 1vw;
    grid-template-columns: repeat(auto-fit, auto-fit);
    justify-items: center;
    width: 80%;
    margin-top: 1rem;
  }
  li {
    padding: 0.5vw;
  }
</style>
