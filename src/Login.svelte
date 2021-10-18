<script>
    import {loggedIn} from './stores.js';
    import {login_user, encode_user} from './auth.js';
    
    let user = '';
    let pass = '';
    
    function login() {
      if (user.length == 0 || pass.length == 0) {
        return
      }
      let encoded = encode_user(user, pass);
      let success = login_user("Basic " + encoded);
      console.log(success);
      loggedIn.set(success);
    }
</script>

<div>
    <h1>Login</h1>
</div>

<main>
    <input bind:value={user}
           placeholder="username">

    <input bind:value={pass}
           on:keydown="{event => event.key === 'Enter' && login()}"
           type="password"
           placeholder="password">
    <div>
        <button on:click={login}>Login</button>
    </div>
     
</main>

<style>
    h1 {
      text-align: center;
      font-size: 3em;
      font-weight: 200;
    }

    main {
      text-align: center;
      margin-left: auto;
      margin-right: auto;
      width: 320px;
      max-width: 100%;
    }
</style>
