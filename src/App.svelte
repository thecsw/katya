<script>
    import { onMount } from 'svelte';

    import { loggedIn, pageLoaded } from './stores.js';
    import { check_cookie, logout_user } from './auth.js';
    
    import Search from './Search.svelte';
    import Login from './Login.svelte';

    let userLoggedIn;
    loggedIn.subscribe(value => {
      userLoggedIn = value;
    })

    let thisPageLoaded;
    pageLoaded.subscribe(value => {
      thisPageLoaded = value;
    })

    function logout () {
      logout_user();
      loggedIn.set(false);
    }
    
    onMount(() => {
      check_cookie()
        .then(value => {loggedIn.set(value)})
        .then(() => {pageLoaded.set(true)})
    });
    
</script>


{#if thisPageLoaded}
  {#if userLoggedIn}
    <button on:click={logout}>Logout</button>
    <Search/>
  {:else}
    <Login/>
  {/if}
{/if}
