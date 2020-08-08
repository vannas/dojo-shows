<template>
  <div id="app" class="center-align">
      <img src="@/assets/tv.gif" alt="logo" class="teve">
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
#app, html {
  font-family: 'Oswald', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 10px;
  margin-bottom:50px;
  background-color:#80cbc4;
}

.teve {
  max-width: 150px;
}

h2 {
  margin-top:1rem;
}
</style>
