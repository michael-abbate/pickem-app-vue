<template>
<div class="vl"></div>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <h1>Pick Em App</h1>
  <router-view/>
</template>

<script>
//TODO: Send a payload JSON with game ID and other info as pick, including a clean pick name
//TODO: clean up selected picks box 
//TODO; start to save submissions

// import ShowPicks from './components/ShowPicks.vue'

// export default {
//   // name: 'Pickem-App',
//   components: {
//     ShowPicks
//   }
// }
</script>

<style>
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
  color: #2c3e50;
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
</style>
