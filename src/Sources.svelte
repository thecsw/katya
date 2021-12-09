<script>
    import { onMount } from 'svelte';
    
    import { getSources } from './sources.js';
    import { credentials } from './stores.js';

    let user;
    credentials.subscribe(value => {
      user = value;
    })

    let sources = [];

    onMount(() => { getSources().then(value => { sources = JSON.parse(value) } )});
    
</script>

<main>
    <div class="sources">
        <h2>Your sources</h2>
        {#each sources as source, i}
          <div>
              <input bind:value={source.label}
                     placeholder={source.label}>
              <input bind:value={source.link}
                     placeholder={source.link}>
          </div>
        {/each}
      </div>
    
</main>

<style>
    h1 {
      text-align: center;
      color: #7F5727;
      font-size: 3em;
      font-weight: 200;
    }
    
    main {
      /* text-align: center; */
      max-width: none;
      padding: 3em;
    }

    .sources {
      margin-left: auto;
      margin-right: auto;
      width: 800px;
      max-width: 100%;
    }    
</style>
