<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    import { loggedIn, pageLoaded, currentPage } from './stores.js';
    import { check_cookie, logout_user } from './auth.js';

    import Sources from './Sources.svelte';
    import Search from './Search.svelte';
    import Login from './Login.svelte';
    import Hits from './Hits.svelte';

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

    let thisCurrentPage;
    currentPage.subscribe(value => {
      thisCurrentPage = value;
    })
    function goSearch() { currentPage.set("search"); }
    function goHits() { currentPage.set("hits"); }
    function goSources() { currentPage.set("sources"); }
    
    onMount(() => {
      check_cookie()
        .then(value => { loggedIn.set(value) })
        .then(() => { pageLoaded.set(true) })
    });
    
</script>

{#if thisPageLoaded}
  <main transition:fade>
      {#if userLoggedIn}
        <button on:click={logout}>Logout</button>
        <button on:click={goSearch}>Search</button>
        <button on:click={goHits}>Word hits</button>
        <button on:click={goSources}>Sources</button>
        {#if thisCurrentPage == "search"}
          <Search/>
        {/if}
        {#if thisCurrentPage == "hits"}
          <Hits/>
        {/if}
        {#if thisCurrentPage == "sources"}
          <Sources/>
        {/if}
      {:else}
          <Login/>
      {/if}
  </main>
{/if}
