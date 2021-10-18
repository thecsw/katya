<script>
    import { onMount } from 'svelte';

    import { loggedIn } from './stores.js';
    import { check_cookie, logout_user } from './auth.js';
    
    import Search from './Search.svelte';
    import Login from './Login.svelte';

    let userLoggedIn;
    loggedIn.subscribe(value => {
      userLoggedIn = value;
    })

    function logout () {
      logout_user();
      loggedIn.set(false);
    }
    
    onMount(() => {
      check_cookie().then((val) => {loggedIn.set(val)})
    });
    
</script>

{#if userLoggedIn}
  <Search/>
  <button on:click={logout}>Logout</button>
{:else}
  <Login/>
{/if}
