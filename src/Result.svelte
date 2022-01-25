<script>
    export let result, i;
</script>

<article>
    <span>{i+1}</span>
    <h4><a target="_blank" href={result.source}>{result.title}</a></h4>
    {result.left} <mark>{result.center}</mark> {result.right}
    <p></p>
    <pre>Retrieved {result.scraped}</pre>
</article>

<style>
    article {
      position: relative;
      padding: 0 0 0 2em;
      border-bottom: 1px solid #eee;
    }

    span {
      position: absolute;
      left: 0;
    }

    a {
      color: #333;
    }
</style>
