<script lang="ts">
  import { goto } from '$app/navigation';
  import { supabase } from '$db/supabaseClient';
  import { flip } from 'svelte/animate';
  import { fade, fly, slide } from 'svelte/transition';

  type LoginType = 'login' | 'register';
  let currentType = 'login';
  let titles = ['Iniciar sesion', 'Registrarse'];
  let buttons: { type?: LoginType; text: string }[] = [
    { type: 'login', text: 'Iniciar Sesion' },
    { type: 'register', text: 'Registrarse' },
  ];

  export let name = '';
  export let email = '';
  export let password = '';

  const handleSubmition = async (type: LoginType) => {
    if (type !== currentType) {
      currentType = type;
      buttons = [buttons[1], buttons[0]];
      titles = [titles[1], titles[0]];
      return;
    }

    if (type === 'login') {
      const result = await supabase.auth.signIn({ email, password });
      if (result.error instanceof Error) return console.log(result.error);
      if (!result.session)
        return alert(
          'must confirm account by email\n' + JSON.stringify(result)
        );
      console.log('login succesfull\n', result);
      goto('/');
    } else {
      const result = await supabase.auth.signUp(
        {
          email,
          password,
        },
        {
          redirectTo: '/',
        }
      );

      console.log(result);
    }
  };
</script>

<main>
  <article>
    <h1>{titles[0]}</h1>
    <form on:submit|preventDefault>
      <div>
        {#if currentType === 'register'}
          <div in:slide out:slide>
            <label for="name">Nombre</label>
            <input type="text" bind:value={name} />
          </div>
        {/if}
        <div>
          <label for="email">Email</label>
          <input type="email" name="email" id="" bind:value={email} />
        </div>
        <div>
          <label for="password">Contraseña</label>
          <input type="password" name="password" id="" bind:value={password} />
        </div>
      </div>
      <div class="buttons-container">
        {#each buttons as { type, text } (type)}
          <button
            class:selected={currentType === type}
            animate:flip
            on:click|preventDefault={() => type && handleSubmition(type)}
          >
            {text}
          </button>
        {/each}
      </div>
    </form>
  </article>
</main>

<style>
  article {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: hsl(0, 0%, 10%);
  }
  h1 {
    justify-self: left;
    font-size: 2rem;
    padding: 0.25rem;
    line-height: 2rem;
    text-transform: uppercase;
  }
  form {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 30vh;
    gap: 1rem;
    margin-top: 1rem;
    width: clamp(20ch, 50vw, 32ch);
  }
  form div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 1.5rem;
  }

  input {
    margin-left: 0.5rem;
    border: none;
    font-size: 1.25rem;
    padding: 0.25rem;
    line-height: 1.5rem;
  }
  .buttons-container {
    display: grid;
    place-items: center;
    margin-top: 1rem;
  }
  button {
    font-size: 1.25rem;
    padding: 1rem 2rem;
    width: fit-content;
    border-radius: 1rem;
    border: none;
    transition: all 1s ease;
    background-color: transparent;
  }
  button.selected {
    grid-row: 1/2;
  }
  button:not(.selected) {
    grid-row: 3/4;
  }

  main {
    margin-inline: auto;
    height: 100%;
  }
  main::-webkit-scrollbar {
    display: none;
  }
  @media screen and (min-width: 688px) {
    main {
      max-width: 90%;
    }
  }
  @media screen and (min-width: 992px) {
    main {
      max-width: 80%;
    }
  }
  @media screen and (min-width: 1312px) {
    main {
      max-width: 70%;
    }
  }
</style>
