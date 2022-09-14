<script lang="ts">
  export let onClick: (() => void) | undefined = undefined;
</script>

<div class:clickable={onClick} class="container" on:click={onClick}>
  <svg
    viewBox="0 0 100 100"
    style="align-self:top; justify-self:left; rotate:0deg;"
  >
    <path d="M50 100 L0 100 L0 0 L100 0 L100 50 Z" />
  </svg>
  <svg
    viewBox="0 0 100 100"
    style="align-self:top; justify-self:right; rotate:90deg;"
  >
    <path d="M50 100 L0 100 L0 0 L100 0 L100 50 Z" />
  </svg>
  <svg
    viewBox="0 0 100 100"
    style="align-self:end; justify-self:right; rotate:180deg;"
  >
    <path d="M50 100 L0 100 L0 0 L100 0 L100 50 Z" />
  </svg>
  <svg
    viewBox="0 0 100 100"
    style="align-self:end; justify-self:left; rotate:270deg;"
  >
    <path d="M50 100 L0 100 L0 0 L100 0 L100 50 Z" />
  </svg>
  <div class="white-board">
    <slot />
  </div>
</div>

<style>
  .container {
    width: 100%;
    height: 100%;
    display: grid;
    --frame-thickness: 10px;
    background-size: cover;
  }
  .clickable {
    cursor: pointer;
  }
  .container > * {
    grid-column: 1 / -1;
    grid-row: 1 / -1;
  }
  .container svg {
    width: calc(var(--frame-thickness) * 2);
    fill: hsl(0, 0%, 10%);
    stroke: hsl(0, 0%, 25%);
    stroke-width: 5;
    filter: drop-shadow(0 0 1px hsl(0, 0%, 40%));
    border-top-left-radius: calc(var(--frame-thickness) / 2);
  }
  .white-board {
    width: 100%;
    height: 100%;
    border: var(--frame-thickness) solid lightslategray;
    border-radius: calc(var(--frame-thickness) / 2);
    padding: var(--frame-thickness);
    background-color: hsl(0, 0%, 94%);
    box-shadow: inset -1px 2px 2px lightgray, 6px 9px 1px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
</style>
