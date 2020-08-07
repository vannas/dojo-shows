<template>
  <div class="hello container">
      
    <div class="col s8 m8 tabla1">
      <table class ="striped bordered cyan lighten-4">
        <thead>
          <tr>
            <th>Title</th>
            <th>Network</th>
            <th>Seasons</th>
            <th>On Air</th>
            <th>Genres</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="show in shows" :key="show.id">
            <td class="sp"><i class="small material-icons">local_movies</i> <router-link :to="'/shows/'+ show.id">{{ show.title }}</router-link></td>
            <td>{{ show.network }}</td>
            <td>{{ show.numberofSeasons }}</td>
            <td v-if="show.isCurrent"> Yes </td> 
            <td v-else> No </td> 
            <td><span v-for="(genre, i) in show.genres" :key="i"> {{ genre }} /</span> </td>
            <td class="icons"> <router-link :to="'/shows/' + show.id + '/editar'"> <i class="material-icons">edit</i></router-link> ╵ <a href="#" @click.prevent="borrar_serie(show.id)"> <i class="material-icons">delete</i></a> </td>
          </tr>
        </tbody>
      </table>
    </div>     

    <div class="formulario col s8 m8">
      <h5 class="right-align">Enter a new show</h5>
      <!--Creo un formulario para ingresar nuevos datos a la tabla y vinculo con v-bind @ al metodo----->
      <form @submit="addnewshow">
        <!--//cada campo de input debe vincularse con un v-model amarrado a un elemento en el data() del componente-->
        <div class="input-field">
          <input id="titulo" type="text" required="required" class="validate col s4 m4" v-model="nueva_serie">
          <label for="titulo">Title</label>
        </div>
        <div class="input-field">
          <input id="network" type="text" required="required" class="validate col s4 m4" v-model="nuevo_canal">
          <label for="network">Network</label>
        </div>
        <div class="input-field">
          <label for="seasons">Seasons</label>
          <input id="seasons" type="number" required="required" class="validate col m4 s4" v-model="temporadas">
        </div>
        <div class="input-field col m6 s6">
          <label>Genres (Separated by commas)</label>
          <input class="col m6 s6" id="1" type="text" placeholder="Campo obligatorio" required value="" v-model="generos"/>
        </div>

        <div class="input-field">
          <label for="trailer">Series Summary</label>
          <textarea id="summary" class="validate materialize-textarea col s5 m5" placeholder="At least 1 paragraph"  minlength="150" v-model="summary" required="required"> </textarea>
        </div>

        <div class="input-field">
          <p class="">Is the show still on the air?</p>
          <p class="col m3 s3"><label><input type="radio" name="opcion" id="yes" value="si" checked class="with-gap" v-model="activo"/><span>Yes</span></label></p>
          <p class="col m3 s3"><label><input type="radio" name="opcion" id="no" value="no" class="with-gap" v-model="activo"/><span>No</span></label></p>
        </div>

        <!--<div class="input-field">
          <textarea id="trailer" class="materialize-textarea col s4 m4" placeholder="Insert youtube embed code" v-model="trailer" type=""> </textarea>
          <label for="trailer">Embed Trailer (Optional)</label>
        </div>-->
        <div class="input-field">
          <input type="submit" class="btn" value="Enter">
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
      activo: 'si',
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
        isCurrent: this.activo == 'si'? true : false,
        genres: this.generos.split(',')
      });
      // Ahora vaciamos el formulario
      this.nueva_serie = '';
      this.nuevo_canal = '';
      this.temporadas = 0;
      this.activo = 'si';
      this.generos = []
    },
    async editar_serie(id_serie){
      try {
        db.collection('shows').doc(id_serie).delete();
      }
      catch (error) {
        console.log(error);
      }
      
    },
    async borrar_serie(id_serie){
      if (window.confirm('¿Confirmas que quieres borrar toda la información de esta serie?')){      
        try {
          db.collection('shows').doc(id_serie).delete();
        }
        catch (error) {
          console.log(error);
        }
      }
    },
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

.icons{
  vertical-align: top;
  margin-top:3px;
}

.sp{
  text-align:left;
  vertical-align: middle;
}

h5{
  margin-top:60px;
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
  display:block;
  background-color:indianred;
  margin-bottom: 10px;
  
}

</style>
