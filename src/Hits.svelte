<script>
    import { onMount } from 'svelte';
    import Select from 'svelte-select';
    
    import { credentials } from './stores.js';
    import { findKatyaHits } from './search.js';
    import { getSources } from './sources.js';
    import { downloadCSV } from './util.js';

    let sources = [{label:"label", link:"link", enabled:"true"}];
    let items = [];
    function updateSources() {
      getSources().
        then(value => {
          sources = JSON.parse(value);
          items = [];
          for (const source in sources) {
            //console.log(sources[source])
            if (sources[source].enabled)
              items.push({
                value: sources[source].link,
                label: sources[source].label
              })
          }
        })
    }
    onMount(() => { updateSources() });
    
    let user;
    credentials.subscribe(value => {
      user = value;
    })

    let search_value = undefined;
    function handleSelect(event) {
      search_value = event.detail;
    }
    
    function handleClear() {
      search_value = undefined;
    }

    let results = [["word", "frequency"], ["word2", "frequency2"]];
    
    function submitSearch() {
      if (search_value) {
        findKatyaHits(search_value.value)
          .then(value => { results = JSON.parse(value) })
      }
    }

    function submitSearchCSV() {
      if (search_value) {
        findKatyaHits(search_value.value, "1")
          .then(value => { downloadCSV(search_value.label, value) })
      }
    }
    
</script>

<main>
    
    <div>
        <h1>Find best hits, {user.user || 'stranger'}!</h1>
    </div>

    <div class="search">
        <Select items={items} on:select={handleSelect} on:clear={handleClear}/>
        <p></p>
        <button on:click={submitSearch}>Search</button>
        <button on:click={submitSearchCSV}>CSV</button>
    </div>
    
    <!-- <div class="search"> -->
    <!--     <input bind:value={search_value} -->
    <!--            on:keydown="{event => event.key === 'Enter' && submitSearch()}"> -->
    <!--     <button on:click={submitSearch}>Search</button> -->
    <!-- </div> -->

    <div class="results">
        <h2>Corpus results</h2>
        {#each results as result, i}
          <article>
              <span>{result[0]}</span>
              <span>{result[1]}</span>
              <p></p>
          </article>
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

    .search {
      margin-left: auto;
      margin-right: auto;
      width: 420px;
      max-width: 100%;
    }

    .results {
      margin-left: auto;
      margin-right: auto;
      width: 800px;
      max-width: 100%;
    }

    .search {
      text-align: center;
      max-width: 400px;
      border-radius: 4px;
      margin-left: auto;
      margin-right: auto;
      width: 420px;
      max-width: 100%;
    }

</style>
