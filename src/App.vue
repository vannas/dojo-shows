<template>
  <div id="app" class="center-align">
      <i class="large material-icons">tv</i>
      <h2 class="">TV Shows</h2>
      
      <router-view />

  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
   
  }
}
</script>

<style>
#app {
  font-family: 'Oswald', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 10px;
  margin-bottom:50px;
}

h2 {
  margin-top:-1rem;
}
</style>
