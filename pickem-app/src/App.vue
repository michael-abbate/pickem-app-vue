<template>
  
  <h1>Pick Em App</h1>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <ShowPicks/>

  
</template>

<script>
import ShowPicks from './components/ShowPicks.vue'

export default {
  // name: 'Pickem-App',
  components: {
    ShowPicks
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
