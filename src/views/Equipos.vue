<template>
  <div id="login">
    <h1>Equipos</h1>
    <table border="1" style="width: 600px">
      <tr>
        <th>No.</th>
        <th>Equipo</th>
      </tr>
      <tr v-for="equipo in equipos" v-bind:key="equipo.id">
        <td>
          {{ equipo.id }}
        </td>
        <td>
          {{ equipo.nombre }}
        </td>
      </tr>
    </table>
  </div>
</template>


<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "Equipos",
  data() {
    return {
      equipos: "",
    };
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    async datos() {
      try {
        const res = await axios.get("http://localhost:8081/equipo/lista", {
          headers: {
            "Content-Type": "application",
            Authorization: this.token,
          },
        });
        this.equipos = res.data;
      } catch (error) {
      }
    },
  },
  created() {
    this.datos();
  },
};
</script>