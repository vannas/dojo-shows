<template>
  <div class="hello container">
      
    <div class="col s8 m8 tabla1">
      <table class ="striped blue-grey lighten-4">
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
            <td class="movie_icon"><i class="small material-icons">local_movies</i> <router-link :to="'/shows/'+ show.id">{{ show.title }}</router-link></td>
            <td>{{ show.network }}</td>
            <td>{{ show.numberofSeasons }}</td>
            <td v-if="show.isCurrent"> Yes </td> 
            <td v-else> No </td> 
            <td><span v-for="(genre, i) in show.genres" :key="i"> {{ genre }} 〢 </span> </td>
            <td class="icons"> <router-link :to="'/shows/' + show.id + '/editar'"> <i class="material-icons">edit</i></router-link> ╵ <a href="#" @click.prevent="borrar_serie(show.id)"> <i class="material-icons">delete</i></a> </td>
          </tr>
        </tbody>
      </table>
    </div>     
    <!--<hr class="breakoff">-->
    <div class="formulario">
      <h5>Enter a new show</h5>
      <!--Creo un formulario para ingresar nuevos datos a la tabla y vinculo con v-bind @ al metodo----->
      <form @submit="addnewshow" id="formulario2">
        <!--//cada campo de input debe vincularse con un v-model amarrado a un elemento en el data() del componente-->
        <div class="input-field">
          <label for="titulo" class="active">Title</label>
          <input id="titulo" type="text" required="required" class="validate" v-model="nueva_serie">
        </div>
        <div class="input-field side">
          <label for="network" class="active">Network</label>
          <input id="network" type="text" required="required" class="validate" v-model="nuevo_canal"> 
        </div>
        <div class="input-field side">
          <label for="seasons" class="active season">Seasons</label>
          <input id="seasons" min="1" type="number" required="required" class="validate" v-model="temporadas">
        </div>
        <div class="input-field">
          <label for="genres" class="active">Genres (Separated by commas)</label>
          <input class="" id="genres" type="text" placeholder="Campo obligatorio" required value="" v-model="generos"/>
        </div>
        <div class="input-field">
          <label for="summary" class="active">Series Summary</label>
          <textarea id="summary" class="validate materialize-textarea" placeholder="At least 1 paragraph"  minlength="150" v-model="summary" required="required"> </textarea>
        </div>
        <div class="input-field">
          <label for="trailer" class="active">Embed Trailer (Optional)</label>
          <textarea id="trailer" class="materialize-textarea" placeholder="Insert youtube embed code" v-model="trailer" type="text"> </textarea>
        </div>
        <div class="input-field">
          <p>Is the show still on the air?</p>
            <div class="switch">
              <label>
                No
                <input type="checkbox" v-model="activo">
                <span class="lever"></span>
                Si
              </label>
            </div>
          <!--<p><input type="radio" name="opcion" value="si" class="with-gap" v-model="activo"/><span class="radio">Yes</span>
          <input type="radio" name="opcion" value="no" class="with-gap " v-model="activo"/><span class="radio">No</span></p>-->
          
        </div>
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
      activo: '',
      generos:'' ,
      summary:'',
      trailer:'',

    }
  },
  methods: {
    addnewshow(ev) {
      ev.preventDefault();

      db.collection('shows').add({
        title: this.nueva_serie,
        network: this.nuevo_canal,
        numberofSeasons: parseInt(this.temporadas),
        isCurrent: this.activo == ''? true : false,
        genres: this.generos.split(','),
        summary: this.summary,
        trailer: this.trailer
      });
      // Ahora vaciamos el formulario
      this.nueva_serie = '';
      this.nuevo_canal = '';
      this.temporadas = 0;
      this.activo = '';
      this.generos = [];
      this.summary = '';
      this.trailer = '';
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
  margin-top:20px;
  }

th {
  text-align: center;
  background-color:rgb(67, 131, 250);
  border: 2px solid rgb(67, 131, 250);
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

.movie_icon{
  text-align:left;
  vertical-align: middle;
}

h5{
  margin-top:20px;
  width:100%;
}

.breakoff{
  border-top: 10px dashed lightgrey;
  border-right: none;
  border-bottom: none;
  border-left: none;
  margin-top:30px;
}

.formulario{
  display:inline-block;
  margin-top:3em;
  padding:1em;
  font-size:10px;
  width: 40%;
  border-radius: 50px;
  background-color:rgb(187, 216, 235)
}

.formulario ::placeholder { 
  color:rgb(160, 160, 160);
  opacity: 1;
}

#network, #seasons, .side {
  display:inline-block;
  width:50%;
}

#seasons{
  margin-right:-80px;
}

.season {
  margin-left: 30px;
}

.radio{
  margin:10px;
  font-size:12px;
}

.btn{
  display:block;
  background-color:lightslategray;
  margin:0 auto;
  margin-bottom: 10px;
  
}

</style>
