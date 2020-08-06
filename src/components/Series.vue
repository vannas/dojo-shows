<template>
  <div class="hello container">
      
      <div class="col s8 m8 tabla1">
        <table class ="striped bordered cyan lighten-4">
          <thead>
            <tr>
              <th>Título</th>
              <th>Network</th>
              <th>Temporadas</th>
              <th>Al Aire</th>
              <th>Géneros</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="show in shows" :key="show.id">
              <td class="sp"><i class="small material-icons">local_movies</i> {{ show.title }}</td>
              <td>{{ show.network }}</td>
              <td>{{ show.numberofSeasons }}</td>
              <td v-if="show.isCurrent"> Sí </td> 
              <td v-else> No </td> 
              <td><span v-for="(genre, i) in show.genres" :key="i"> {{ genre }} /</span> </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="formulario col s10 m10">
        <h5 class="right-align">Ingresa una Nueva Serie</h5>
        <!--Creo un formulario para ingresar nuevos datos a la tabla y vinculo con v-bind @ al metodo----->
        <form @submit="addnewshow">
          <!--//cada campo de input debe vincularse con un v-model amarrado a un elemento en el data() del componente-->
          <div class="input-field">
            <input id="titulo" type="text" required="required" class="validate col s4 m4" v-model="nueva_serie">
            <label for="titulo">Título</label>
          </div>
          <div class="input-field">
            <input id="network" type="text" required="required" class="validate col s4 m4" v-model="nuevo_canal">
            <label for="network">Cadena</label>
          </div>
          <div class="input-field">
            <label for="seasons">Temporadas</label>
            <input id="seasons" type="number" required="required" class="validate col m4 s4" v-model="temporadas">
          </div>
          <div class="input-field col m6 s6">
            <label>Géneros (Separe con comas)</label>
            <input class="col m6 s6" id="1" type="text" placeholder="Campo obligatorio" required value="" v-model="generos"/>
            
          </div>
          <div class="input-field">
            <p class="">La serie sigue activa?</p>
            <p class="col m6 s6"><label><input type="radio" name="opcion" id="yes" checked class="with-gap" /><span>Sí</span></label></p>
            <p class="col m6 s6"><label><input type="radio" name="opcion" id="no" class="with-gap" /><span>No</span></label></p>
          </div>
          <div class="input-field">
            <input type="submit" class="btn" value="Ingresar">
          </div>
        </form>
      </div>
    
  </div>
</template>

<script>
import { db } from '../firebase';  

export default {
  name: 'Series',
  data() {
    return {
      shows: [],
      nueva_serie: '',
      nuevo_canal:'',
      temporadas: null,
      activo: true,
      generos:'' 

    }
  },
  methods: {
    addnewshow(ev) {
      ev.preventDefault();

      db.collection('shows').add({
        title: this.nueva_serie,
        network: this.nuevo_canal,
        numberofSeasons: parseInt(this.temporadas),
        isCurrent: null,
        genres: this.generos.split(',').push
      });
      // Ahora vaciamos el formulario
      this.nueva_serie = '';
      this.nuevo_canal = '';
      this.temporadas = 0;
      this.activo = null;
      this.genre = []
    },
    created: function () {
      var i = 0;
      for (i = 0; i < this.genres.length; i++){
          this.$set(this.genre, i , 0)
      }
    }
  },
  firestore() {
    return {
      shows: db.collection('shows')
    }
  },
  mounted() {
    console.log(this.shows)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

table{
  color:blue-grey;
  font-size: 16px;
  
}

th {
  
  text-align: center;
  background-color:rgb(67, 131, 250);
  color:white;
  font-size:22px;
}

td {  
  max-height:60px;
  overflow:hidden;
  text-align: center;
  }

.sp{
  text-align:left;
  vertical-align: middle;
}

h5{
  margin-top:20px;
}

.formulario{
  font-size:0.8em;
  line-height: 0.5em;  
  color:blue-grey;
}

.input-field {
  display:inline-block;
  margin-left:10%;
  
}

.btn{
  background-color:indianred;
  margin-bottom: 10px;
  
}

</style>
