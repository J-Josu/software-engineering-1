<script lang="ts">
  export let isDisplayed: boolean;
  let popUpContainer: HTMLDivElement;
</script>

{#if isDisplayed}
  <div
    bind:this={popUpContainer}
    on:click={(e) => {
      console.log(e);
      if (e.target == popUpContainer) isDisplayed = false;
    }}
  >
    <slot />
  </div>
{/if}

<style>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100vw;
    height: 100vh;
    background-color: hsl(0, 0%, 25%, 0.75);
  }
</style>
