<script lang="ts">
  import { supabase } from '$db/supabaseClient';
    import { flip } from 'svelte/animate';

  let currentType: 'login' | 'register' = 'login';

  export let name = '';
  export let email = '';
  export let password = '';
  

  const handleSubmition = async (type: 'login' | 'register') => {
    if (type !== currentType) return (currentType = type);

    if (type === 'login') {
      const result = await supabase.auth.signIn({
        email,
        password,
      });

      console.log(result);
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
    <h1>{currentType === 'login' ? 'Iniciar Sesion' : 'Registrarse'}</h1>
    <form on:submit|preventDefault>
      {#if currentType === 'register'}
        <div>
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
      <div class="buttons-container">
        <button
          class:selected={currentType === 'login'}
          on:click|preventDefault={() => handleSubmition('login')}
        >
          Iniciar Sesion
        </button>
        <span>O</span>
        <button
          class:selected={currentType === 'register'}
          on:click|preventDefault={() => handleSubmition('register')}
        >
          Registrarse
        </button>
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
    font-size: 2rem;
    padding: 0.25rem;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    transition: all 1s;
  }
  button {
    font-size: 1.25rem;
    padding: 1rem 2rem;
    width: fit-content;
    border-radius: 1rem;
    border: 1px solid lightgray;
    transition: all 1s ease;
  }
  /* button.selected {
    justify-self: baseline;
  }
  button:not(.selected) {
    justify-self: end;
  } */
  button:hover {
    border-color: gray;
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
