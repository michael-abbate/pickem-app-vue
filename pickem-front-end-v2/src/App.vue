<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/nflteams">NFL Teams</router-link> |
    <router-link to="/">Leaderboard</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <h1>Pick Em App</h1>
  <router-view/>
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

// export default {
//   // name: 'Pickem-App',
//   components: {
//     ShowPicks
//   }
// }
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

  nav {
    padding-top: 30px;
  }

  nav a {
    font-weight: bold;
    color: #fff;
  }

  nav a.router-link-exact-active {
    color: #42b983;
  }


  body {
      font-family:  Helvetica, Arial, sans-serif;
      background-color: #1f1f1f;
      color:white;
  }

  h1 {
      margin: 30px auto;
      font-size: 3vw;
      text-align: center;
      /* min-height: 49px; */
      color:#fff;
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
      background-color: #1f1f1f;
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
