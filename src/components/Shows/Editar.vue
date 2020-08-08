<template>
  
<div class="container col s12 m12">
      
    <h4 class="left-align">Edit Entry for {{title}}</h4>
    <div class="container formulario col s10 m10">
        <form @submit.prevent="editar_show(id)">
        <!--//cada campo de input debe vincularse con un v-model amarrado a un elemento en el data() del componente-->
            <div class="input-field">
                <label for="titulo" class="active">Title</label>
                <input id="titulo" type="text" required="required" class="validate col s4 m4" v-model="title">
            </div>
            <div class="input-field">
                <label for="network" class="active">Network</label>
                <input id="network" type="text" required="required" class="validate col s4 m4" v-model="network">
            </div>
            <div class="input-field">
                <label for="seasons" class="active">Seasons</label>
                <input id="seasons" min="1" type="number" required="required" class="validate col m4 s4" v-model="numberofSeasons">
            </div>
            <div class="input-field col m6 s6">
                <label class="active">Genres (Separate by commas)</label>
                <input class="col m6 s6" id="1" type="text" placeholder="Campo obligatorio" required value="" v-model="genres"/>
            </div>
            <div class="input-field">
              <label for="summary" class="active" id="summ">Series Summary</label>
              <textarea class="textarea validate materialize" id="summary" minlength="150" v-model="summary" required="required"></textarea>
            </div>
            <div class="input-field radio">
              <p class="">Series still active?</p>
              <div class="switch">
                <label>
                  No
                  <input type="checkbox" v-model="activo">
                  <span class="lever"></span>
                  Si
                </label>
            </div>
                <!--<p class="col m6 s6"><label class="active radio"><input type="radio" name="opcion" id="yes" value="si" checked class="with-gap" v-model="isCurrent"/><span>Yes</span></label></p>
                <p class="col m6 s6"><label class="active radio"><input type="radio" name="opcion" id="no" value="no" class="with-gap" v-model="isCurrent"/><span>No</span></label></p>-->
            </div>
            <div class="input-field">
                <input type="submit" class="btn" value="Edit">
            </div>
        </form>

        <a href="" target="/" rel="" class="btn red" id="home">Home</a>
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
      isCurrent: '',
      trailer: ''
    }
  },
  methods : {
    editar_show(id_show) {
        db.collection('shows').doc(id_show).update({
            title: this.title,
            network: this.network,
            numberofSeasons: parseInt(this.numberofSeasons),
            isCurrent: this.isCurrent == 'checked'? true : false,
            genres: this.genres.split(','),
            summary: this.summary
        })
        .then(() => {
            alert('Your changes have been successfully added');
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

<style scoped>

.container{
  background-color:white;
  border-radius: 100px;
}

h4{
  margin-left:15%;
  padding-top:1em;
}

label {
  position:relative;
  margin: -0.5em;
}

.radio{
  position:relative;
  margin:1em;
}
#summary{
  margin-top: 30px;
  height: 130px;
}

#home{
  margin-left: 90%;
  margin-bottom:5%;
}


</style>