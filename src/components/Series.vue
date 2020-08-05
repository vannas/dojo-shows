<template>
  <div class="hello container">
      <div class="col s8 m8">
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
              <td>{{ show.isCurrent }}</td>
              <td><span v-for="(genre, i) in show.genres" :key="i"> {{ genre }} /</span> </td>
            </tr>
          </tbody>
        </table>
      </div>
    
  </div>
</template>

<script>
import { db } from '../firebase';  

export default {
  name: 'Series',
  data() {
    return {
      shows: []
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

</style>
