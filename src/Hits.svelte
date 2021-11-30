<script>
    import {credentials} from './stores.js';
    import {findKatya} from './search.js';

    let user;
    credentials.subscribe(value => {
      user = value;
    })

    let search_value = '';

    function submitSearch() {
      let part_type = search_api_options[search_type];
      findKatya(search_value, part_type)
        .then(value => { results = JSON.parse(value) })
    }
    
</script>

<main>
    
    <div>
        <h1>Find best hits, {user.user || 'stranger'}!</h1>
    </div>

    <div class="search">
        <input bind:value={search_value}
               on:keydown="{event => event.key === 'Enter' && submitSearch()}">
        <button on:click={submitSearch}>Search</button>
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

</style>
