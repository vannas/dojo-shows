<template>
  
<div class="container col s12 m12">
      
    <h2 class="left-align">Edit Entry for {{title}}</h2>
    <div class="container formulario col s10 m10">
        <form @submit.prevent="editar_show(id)">
        <!--//cada campo de input debe vincularse con un v-model amarrado a un elemento en el data() del componente-->
            <div class="input-field">
                <input id="titulo" type="text" required="required" class="validate col s4 m4" v-model="title">
                <label for="titulo" class="active">Title</label>
            </div>
            <div class="input-field">
                <input id="network" type="text" required="required" class="validate col s4 m4" v-model="network">
                <label for="network" class="active">Network</label>
            </div>
            <div class="input-field">
                <label for="seasons" class="active">Seasons</label>
                <input id="seasons" type="number" required="required" class="validate col m4 s4" v-model="numberofSeasons">
            </div>
            <div class="input-field col m6 s6">
                <label class="active">Genres (Separate by commas)</label>
                <input class="col m6 s6" id="1" type="text" placeholder="Campo obligatorio" required value="" v-model="genres"/>
            </div>
            <div class="input-field">
                <p class="">Series still active?</p>
                <p class="col m6 s6"><label class="active"><input type="radio" name="opcion" id="yes" value="si" checked class="with-gap" v-model="isCurrent"/><span>Yes</span></label></p>
                <p class="col m6 s6"><label class="active"><input type="radio" name="opcion" id="no" value="no" class="with-gap" v-model="isCurrent"/><span>No</span></label></p>
            </div>
            <div class="input-field">
                <input type="submit" class="btn" value="Enter">
            </div>
        </form>

        <a href="" target="/" rel="" class="btn red">Home</a>
    </div>
</div>

</template>

<script>
import { db } from '@/firebase';  

export default {
  name: 'Editar',
  props: {
    id: String
  },
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
  methods : {
    editar_show(id_show) {
        db.collection('shows').doc(id_show).update({
            title: this.title,
            network: this.network,
            numberofSeasons: parseInt(this.numberofSeasons),
            isCurrent: this.isCurrent == 'si'? true : false,
            genres: this.genres.split(',')
        })
        .then(() => {
            console.log('Cambiado');
        })
        }
  },
  firestore() {
    return {
      shows: db.collection('shows')
    }
  },
  mounted() {
    db.collection('shows').doc(this.id).get()
    .then(datos => {
    // acá capturamos los datos para asociarlos al objeto data
        const Serie = datos.data();
        this.title = Serie.title;
        this.network = Serie.network;
        this.genres = Serie.genres.join(',');
        this.summary = Serie.summary;
        this.numberofSeasons = Serie.numberofSeasons;
        this.trailer = Serie.trailer;
    })    
  }
}

</script>

<style>
a .btn {
    display:block;
    margin: 100px auto;
    margin-bottom:200px;
    width:20%;
}
</style>