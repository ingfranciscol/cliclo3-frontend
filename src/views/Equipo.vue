<template>
  <div class="registrarPartido" id="login">
    <h1>Registrar Equipo</h1>
    <form @submit.prevent="registrarEquipo(equipo)">
      <table border="1" style="width: 600px">
        <tr>
          <th>Nombre</th>
          <td>
            <input type="text" name="nombre" v-model="equipo.nombre" />
          </td>
        </tr>
        <tr>
          <td colspan="2" style="text-align: center">
            <button type="submit">Registrar</button>
          </td>
        </tr>
      </table>
    </form>
  </div>
</template>


<script>
import { mapActions } from "vuex";

export default {
  name: "registrarEquipo",
  data() {
    return {
      equipo: {
        nombre: ""
      },
    };
  },
  methods: {
    ...mapActions(["registrarEquipo"]),
    
  },
};
</script>