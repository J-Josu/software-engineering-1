<script lang="ts">
  export let link: string;
  export let title: string;
  export let description: string;
</script>

<div>
  <a href={link}>
    <h2>{title}</h2>
    <p>{description}</p>
  </a>
</div>

<style>
  div {
    padding: 0.5rem;
    transition: background-color 0.5s ease-out;
  }
  div:hover {
    background-color: hsl(0, 0%, 80%, 0.25);
  }
  p {
    margin-left: 1rem;
    padding: 0.25rem;
  }
</style>
