<template>
  <div class="container col s12 m12">

    <h2 class="left-align">{{title}}</h2>

    <div class="resumen align-justify col s4 m4">
        <h5 class="white-text">Summary:</h5>

        <h6 class="col s4 m4"> {{summary}} </h6>
    </div>     

    <div class="info col s5 m5 light-blue-accent-2">
        <p><h6>Network: </h6> {{network}} 
        <p><h6>Seasons on air: </h6> {{numberofSeasons}} 
        <p><h6>Genres: </h6>
        <p><span v-for="(genre, i) in genres" :key="i"> {{ genre }} |</span> 
        <p><h6>Active: </h6> 
        <i class="small material-icons" v-if="isCurrent"> check </i>
        <i class="small material-icons red remove_circle" v-else> local_movies </i>
    </div>

    <div class="trailer" v-html="trailer">
        {{trailer}}
    </div>

    <a href="" target="/" rel="" class="btn red">Home</a>
      
  </div> 
</template>

<script>
import { db } from '@/firebase';  

export default {
  name: 'Show',
  data() {
    return {
      title:'',
      summary:'',
      network:'',
      numberofSeasons:0,
      genres: [],
      isCurrent: true,
      trailer: ''
    }
  },
  firestore() {
    return {
      shows: db.collection('shows')
    }
  },
  mounted() {
    db.collection('shows').doc(this.$route.params.id).get()
    .then(datos => {
      // acá capturamos los datos para asociarlos al objeto data
      const Serie = datos.data();
      this.title = Serie.title;
      this.network = Serie.network;
      this.genres = Serie.genres;
      this.summary = Serie.summary;
      this.numberofSeasons = Serie.numberofSeasons;
      
      this.trailer = Serie.trailer;


    });
  }
}
</script>

<style scoped>

.container{
    background-color:rgb(67, 131, 250);
    margin-top:50px;
    padding-top:50px;
    min-height: 500px;
    line-height: 0.9em;
    padding-bottom:50px;
    border-radius: 100px;
}

.resumen{
    display:inline-block;
    vertical-align: top;
    color:white;
    font-size: 16px;
    max-width:50%;
    text-align: justify;
}

.info{
    display:inline-block;
    border: 2px dashed black;
    color: blue-gray;
    font-size: 16px;
    margin:4%;
    padding-bottom:10px;
    width:20%; 
    
}

h2{
    padding:20px;
}

h6{
    display:inline-block;
    color:white;
    font-size:16px;
    margin-top:2px;
}

.trailer{
    display:block;
    margin: 0 auto;
    padding: 50px;
}

a .btn {
    display:block;
    margin: 100px auto;
    margin-bottom:200px;
    width:20%;
}
</style>