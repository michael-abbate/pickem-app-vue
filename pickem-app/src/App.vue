<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <h1>Pick Em App</h1>
  <router-view/>
</template>

<script>
// import ShowPicks from './components/ShowPicks.vue'

// export default {
//   // name: 'Pickem-App',
//   components: {
//     ShowPicks
//   }
// }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}


body {

    font-family:  Helvetica, Arial, sans-serif;
}

h1 {
    margin: 80px auto;
    font-size: 42px;
    text-align: center;
    min-height: 49px;
}
</style>
