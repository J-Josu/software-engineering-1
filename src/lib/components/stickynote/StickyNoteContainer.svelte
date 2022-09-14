<script lang="ts">
  export let link: string = '';
  export let color: string;
  export let rotate = true;
</script>

<div>
  {#if link}
    <a
      href={link}
      class="note-wrap"
      style:rotate={rotate ? `${Math.random() * 10 - 5}deg` : 'none'}
      style:background-color={color}
    >
      <slot />
    </a>
  {:else}
    <div
      class="note-wrap"
      style:rotate={rotate ? `${Math.random() * 10 - 5}deg` : 'none'}
      style:background-color={color}
    >
      <slot />
    </div>
  {/if}
</div>

<style>
  div {
    width: 100%;
    height: 100%;
  }
  .note-wrap {
    width: 90%;
    height: 90%;
    margin-inline: 5%;
    margin-top: 7.5%;
    position: relative;
    vertical-align: top;
    display: inline-block;
    font-family: Englebert, Arial;
    color: hsl(36, 11%, 26%);
    line-height: 34px;
    text-align: center;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  }
  .note-wrap:before {
    display: block;
    content: '';
    background: rgba(227, 200, 114, 0.4);
    width: 50%;
    height: 12%;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    border-radius: 6px/18px 0;
    position: absolute;
    top: -8%;
    left: 25%;
    -webkit-transform: rotate(-2deg);
    -moz-transform: rotate(-2deg);
    -o-transform: rotate(-2deg);
    -ms-transform: rotate(-2deg);
    transform: rotate(-2deg);
  }
</style>
