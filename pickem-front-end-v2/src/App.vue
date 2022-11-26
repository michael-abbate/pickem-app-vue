<template>
  <div class = "app-header">
      <div class = "app-header-logo">
        <h1><nav><router-link to="/">Migs' Pick 'Em</router-link></nav></h1>
      </div>
      <div class = "app-header-nav">
        <nav>
          <router-link v-if="$store.state.isUserLoggedIn" to="/">Games</router-link>
          <router-link v-if="$store.state.isUserLoggedIn" to="/nflteams">NFL Teams</router-link>
          <router-link v-if="$store.state.isUserLoggedIn" to="/">Leaderboard</router-link>
          <router-link v-if="$store.state.isUserLoggedIn" to="/about">About</router-link>
          
          <button v-if="!$store.state.isUserLoggedIn" @click="navigateTo({name: 'LoginUser'})" class = "navbar-but">Login</button>
          <button v-if="!$store.state.isUserLoggedIn" @click="navigateTo({name: 'RegisterUser'})">Sign Up</button>

          <button v-if="$store.state.isUserLoggedIn" @click=logout>Log Out</button>


        </nav>

      </div>
  </div>
  <div class="router-view-div">
    <h3 v-if="$store.state.isUserLoggedIn">Welcome {{ $store.state.user.firstname }}!</h3>
    <router-view/>
  </div>
</template>

<script>
// Frontend
//TODO: clean up names that are displayed when picks are selected.
//TODO: Send a payload JSON with game ID and other info as pick, including a clean pick name
//TODO: start to save submissions
//TODO: Mobile --> if mobile, adjust showpicks component to 75%/25% split and get rid of empty div.
//TODO: create components for ShowPicks view
//TODO: add counter to selectpicks widget in ShowPicks

// Backend
//TODO: create new page, set up like submitted picks page then grade them live.
//TODO: set up data structure for user's submitted picks, user's info, groups
//TODO: submit actual picks to database (or to email or gsheet for now)
//TODO: Update proxy for API in prod env.
//TODO: use v-model in selectedpicks submission

// *********************************************************************************
// import ShowPicks from './components/ShowPicks.vue'

export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      // redirect to homepage
      this.$router.push({
        name: 'LoginUser'
      })
    }
  }
}
</script>

<style>
body, html{
  margin:0;
  padding:0;
}
@media (pointer:fine) {
  .vl {
    border-left: 3px solid red;
    height: 2500px;
    position: absolute;
    left: 50%;
    margin-left: -3px;
    top: 0;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    /* color: #2c3e50; */
  }

  .app-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 60px;
    background-color: #1b1d21;
  }

  .app-header-logo{
    display:flex;
    vertical-align: middle;
    align-items: center;
    float:left;
    height:100%;
    padding-left:10px;
  }

  .app-header-nav{
    display:flex;
    vertical-align: middle;
    align-items: center;
    float:right;
    height:100%;
    padding-right:10px;
  }

  nav a {
    text-decoration: none;
    font-weight: bold;
    background-color: #1b1d21;
    font-size: 1vw;
    border:none;
    color:#fff;
    height:25px;
    margin:3px;
  }

  .router-view-div {
    padding-top:75px;
  }

  body {
      font-family:  Helvetica, Arial, sans-serif;
      background-color: #131619;
      color:white;
  }

  h1 {
      font-size: 1.6vw;
      font-style:italic;
      color:#fff;
  }

  button {
    font-weight: bold;
    background-color: #1b1d21;
    font-size: 1vw;
    border:none;
    color:#fff;
    height:25px;
    margin:3px;
    /* width:20%; */
}

button:hover {
    cursor: pointer;
    /* background-color: #fff; */
    font-weight:bold;
    /* color:#1f1f1f; */
}


}
@media (pointer:coarse) {
  .vl {
    border-left: 3px solid red;
    height: 2500px;
    position: absolute;
    left: 50%;
    margin-left: -3px;
    top: 0;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    /* color: #2c3e50; */
  }

  nav {
    display:flex;
    justify-content: left;
    padding-left: 8px;
  }

  nav a {
    color: #fff;
  }
  

  nav a.router-link-exact-active {
    color: #42b983;
  }


  body {
      font-family:  Helvetica, Arial, sans-serif;
      background-color: #131619;
      color:white;
  }

  h1 {
    justify-content:right;
      font-size: 4vw;
      font-style:italic;
      text-align: right;
      /* min-height: 49px; */
      color:#fff;
      padding-right:8px;
  }

}
</style>
