<script>
    import { onMount } from 'svelte';

    import { loggedIn } from './stores.js';
    import { check_cookie } from './auth.js';
    
    import Search from './Search.svelte';
    import Login from './Login.svelte';

    let userLoggedIn;
    loggedIn.subscribe(value => {
      userLoggedIn = value;
    })
    
    onMount(() => {
      loggedIn.set(check_cookie());
    });
    
</script>

{#if userLoggedIn}
  <Search/>
{:else}
  <Login/>
{/if}
