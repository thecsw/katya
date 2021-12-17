<script>
    import {credentials} from './stores.js';
    import {findKatya} from './search.js';
    import { downloadCSV } from './util.js';
    
    import Result from './Result.svelte'
    
    let search_value = '';
    let search_type = 0;
    let search_placeholder = ['literals', 'tags', 'lemmas', 'shapes'];
    let search_api_options = ['text', 'tags', 'lemmas', 'shapes']

    let user;
    credentials.subscribe(value => {
      user = value;
    })

    let results = [{
      "left": "Nothing here yet!",
      "left_reverse": "",
      "center": "",
      "center_reverse": "",
      "right": "",
      "source": "",
      "title": ""
    }];
    
    function submitSearch() {
      let part_type = search_api_options[search_type];
      findKatya(search_value, part_type)
        .then(value => { results = JSON.parse(value) })
    }

    function submitSearchCSV() {
      let part_type = search_api_options[search_type];
      findKatya(search_value, part_type, "1")
        .then(value => { downloadCSV(search_value, value) })
    }

    
    
</script>

<main>

    <div>
        <h1>Time to search, {user.user || 'stranger'}!</h1>
    </div>

    <div class="search">
        <input bind:value={search_value}
               on:keydown="{event => event.key === 'Enter' && submitSearch()}"
               placeholder={search_placeholder[search_type]}>
        <button on:click={submitSearch}>Search</button>
        <button on:click={submitSearchCSV}>CSV</button>
        
        <label>
            <input type=radio bind:group={search_type} value={0}>
            Literals
        </label>
        <label>
            <input type=radio bind:group={search_type} value={1}>
            Tags
        </label>
        <label>
            <input type=radio bind:group={search_type} value={2}>
            Lemmas
        </label>
        <label>
            <input type=radio bind:group={search_type} value={3}>
            Shapes
        </label>
    </div>

    <div class="results">
        <h2>Corpus results</h2>
        {#each results as result, i}
          <Result result={result} i={i}/>
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
</style>
