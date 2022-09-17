<script lang="ts">
  export let rules: string[];

  let rulesInputs = rules.map((rule) => {
    return { value: rule };
  });

  // const saveRule = (index:number) => {
  //   rulesInputs[index].edited = false;
  //   rules = rulesInputs.filter(rule => !rule.edited).map(rule => rule.value);
  // }
  // $: rules = rulesInputs.map((rule) => rule.value);

  const addRule = () => {
    rulesInputs = [...rulesInputs, { value: '' }];
  };
</script>

<div class="container">
  <h3>Reglas de negocio ({rulesInputs.length})</h3>
  <ol>
    {#each rulesInputs as { value }, i}
      <li class="field">
        <label for="rule-{i}">{i + 1}:</label>
        <textarea
          required
          name="rule-{i}"
          placeholder="Definicion"
          rows="2"
          bind:value
        />
        <button
          type="button"
          class="icon remove-button"
          on:click|preventDefault={() =>
            (rulesInputs = rulesInputs.filter((rules, rI) => rI !== i))}
          >x</button
        >
      </li>
    {:else}
      <p>Ningun escenario añadido</p>
    {/each}
  </ol>
  <button type="button" class="add-button" on:click={addRule}
    >Añadir regla</button
  >
</div>

<style>
  .container {
    padding: 1rem;
    background-color: rgb(182, 86, 86);
  }
  h3 {
    padding-block: 0.5rem;
  }
  ol * {
    font-size: 1.125rem;
    font-family: inherit;
  }
  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-inline: 0.5rem;
    padding-block: 0.25rem;
    background-color: hsl(0, 0%, 98%, 0.2);
  }
  li + li {
    border-top: 1px solid hsl(0, 0%, 98%, 0.2);
  }
  textarea {
    outline: none;
    resize: none;
    min-width: 32ch;
    padding: 0.125rem;
    background-color: transparent;
    border: none;
  }
  button {
    border: none;
    background-color: hsl(0, 0%, 98%, 0.5);
    border-bottom: 1px solid hsl(0, 0%, 98%, 0.75);
    border-right: 1px solid hsl(0, 0%, 98%);
  }
  .add-button {
    margin-top: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
  }
  .remove-button {
    border-radius: 25%;
    width: 1.5rem;
    height: 1.5rem;
    text-align: center;
    text-justify: center;
  }
</style>
