<script>
    import { onMount } from 'svelte';

    import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications'
    
    import { getSources, createSource, deleteSource, crawlSource } from './sources.js';
    import { credentials } from './stores.js';

    let user;
    credentials.subscribe(value => {
      user = value;
    })

    let sources = [
      // {
      //   "link": "https://ilibrary.ru/text/436",
      //   "label": "",
      //   "num_words": 26950,
      //   "num_sentences": 2138,
      //   "enabled": false
      // },
      // {
      //   "link": "https://ilibrary.ru/text/11",
      //   "label": "War and Peace",
      //   "num_words": 488898,
      //   "num_sentences": 34987,
      //   "enabled": true
      // }
    ];

    let empty_source = { link: "", label: "", enabled: true, crawling: false }
    let new_source = empty_source

    function updateSources() {
      getSources().then(value => { sources = JSON.parse(value) } )
    }

    function updateSource(label, link, disabled) {
      return () => {
        createSource(label, link, disabled).
          then(_ => { updateSources() }).
          then(_ => { notifier.info("Source updated", 2000) });
      };
    }

    function removeSource(link) {
      return () => {
        deleteSource(link).
          then(_ => { updateSources() }).
          then(_ => { notifier.danger("Source deleted", 2000) });
      };
    }

    function triggerSource(link) {
      return () => {
        crawlSource(link).
          then(_ => { updateSources() }).
          then(_ => { notifier.success("Started crawling", 2000) })
      }
    }
    
    onMount(() => { updateSources() });

    let makeSourceResult;
    function makeSource() {
      createSource(new_source.label, new_source.link).
        then(value => { makeSourceResult = value }).
        then(() => { updateSources() }).
        then(() => { new_source = { link: "", label: "", enabled: false, crawling: false } }).
        then(_ => { notifier.success("Source created", 2000) });
    }

    
</script>

<NotificationDisplay />

<main>
    <div class="sources">
        <h2>Add a source</h2>
        <div>
            <input bind:value={new_source.label}
                   placeholder="label">
            <input bind:value={new_source.link}
                   placeholder="link">
            <button on:click={makeSource}>Create</button>
        </div>
        
        <h2>Your sources</h2>
        {#each sources as source, i}
          <div>
              <input bind:checked={source.enabled}
                     type="checkbox">
              <input bind:value={source.label}
                     placeholder={source.label}>
              <input bind:value={source.link}
                     placeholder={source.link}>
              <button on:click={triggerSource(source.link)}>Crawl</button>
              <button on:click={updateSource(source.label, source.link, !source.enabled)}>Update</button>
              <button on:click={removeSource(source.link)}>Delete</button>
              {#if source.crawling}
                Currently crawling
                {/if}
              <!-- W: {source.num_words} -->
              <!-- S: {source.num_sentences} -->
          </div>
        {/each}
        <p></p><p></p>
        <button on:click={updateSources}>Refresh sources</button>
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
      width: 1000px;
      max-width: 100%;
    }

    
</style>
