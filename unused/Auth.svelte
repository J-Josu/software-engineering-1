<script lang="ts">
  import { supabase } from '$db/supabaseClient';

  let loading = false;
  let email = '';

  const handleLogin = async () => {
    try {
      loading = true;
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert('Check your email for login link!');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      loading = false;
    }
  };
</script>

<div class="container">
  <h1>Iniciar sesion</h1>
  <p>Para iniciar sesion abri el link a recibir en el email indicado abajo</p>

  <form on:submit|preventDefault={handleLogin}>
    <label for="email">Email</label>
    <input
      type="email"
      name="email"
      placeholder="mi_email@email.com"
      bind:value={email}
    />
    <button type="submit" disabled={loading} aria-live="polite">
      {loading ? 'Enviando...' : 'Enviar link magico'}
    </button>
  </form>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    margin: auto;
    padding: 2rem;
    border: 1px solid lightgrey;
  }
  .container p {
    width: 50%;
    text-align: center;
  }
  form {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    gap: 0.5rem;
  }
</style>

<form on:submit|preventDefault={newSystem}>
  <label for="name">id</label>
  <input type="text" required name="name" bind:value={formData.name} />
  <label for="description">description</label>
  <input type="text" name="description" bind:value={formData.description} />
  <button type="submit">Crear</button>
  <button on:click={() => (showFormulary = false)}>Cerrar</button>
</form>
