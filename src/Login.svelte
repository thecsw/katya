<script>
    //import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications'
    
    import { loggedIn } from './stores.js';
    import { login_user, make_token } from './auth.js';

    let user = { user: "", pass: "" };
    
    function login() {
      if (user.user.length == 0 || user.pass.length == 0) { return }
      login_user(make_token(user)).
        then(val => {
          loggedIn.set(val);
        });
    }
</script>

<!-- <NotificationDisplay /> -->

<p class="aligncenter">
    <!-- svelte-ignore a11y-missing-attribute -->
    <img src="/logo.png" width=20%>
</p>

<main>
    <input bind:value={user.user}
           placeholder="username">

    <input bind:value={user.pass}
           on:keydown="{event => event.key === 'Enter' && login()}"
           type="password"
           placeholder="password">
    <div>
        <button on:click={login}>Login</button>
    </div>
     
</main>

<style>
    /* h1 { */
    /*   text-align: center; */
    /*   font-size: 3em; */
    /*   font-weight: 200; */
    /* } */

    main {
      text-align: center;
      margin-left: auto;
      margin-right: auto;
      width: 320px;
      max-width: 100%;
    }

    img {
      text-align: center;
      max-width: 100%;
      border-radius: 10px;
      padding: 10em 0 3em 1em;
    }

</style>
