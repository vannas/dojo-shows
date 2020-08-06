<template>
  <div id="app">
      <i class="large material-icons">tv</i>
      <h2 class="">TV Shows</h2>
      <center><Series/></center>
  </div>
</template>

<script>
import Series from './components/Series.vue'


export default {
  name: 'App',
  components: {
    Series
  }
}
</script>

<style>
#app {
  font-family: 'Oswald', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
  margin-bottom:40px;
}

h2 {
  margin-top:-1rem;
}
</style>
