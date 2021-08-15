<template>
  <div id="login">
    <h1>Encuentro entre los Equipos</h1>
    <table border="1" style="width: 600px">
      <tr>
        <th colspan="6" style="text-align: center">
          <h3>Encuentro entre los Equipos</h3>
        </th>
      </tr>
      <tr>
        <th colspan="2">Equipo Visitante</th>
        <th colspan="2">Equipo Local</th>
        <th rowspan="2">Fecha</th>
        <th rowspan="2">Actualizar</th>
      </tr>
      <tr>
        <td>Equipo Visitante</td>
        <td>Goles Local</td>
        <td>Equipo Visitante</td>
        <td>Goles Local</td>
      </tr>
      <tr v-for="partido in partidos" v-bind:key="partido.id">
        <td
          v-for="equipo in equipos"
          v-bind:key="equipo.id"
          v-show="equipo.id === partido.local"
        >
          {{ equipo.nombre }}
        </td>

        <td style="text-align: center" v-if="!partido.fecha"></td>
        <td v-else>
          {{ partido.goles_local }}
        </td>
        <td
          v-for="equipo in equipos"
          v-bind:key="equipo.id + '2'"
          v-show="equipo.id === partido.visitante"
        >
          {{ equipo.nombre }}
        </td>
        <td style="text-align: center" v-if="!partido.fecha"></td>
        <td v-else>
          {{ partido.goles_visitante }}
        </td>
        <td>{{ partido.fecha }}</td>
        <td v-if="!partido.fecha">
          <router-link :to="{ name: 'Actualizar', params: { id: partido.id }}">Actualizar</router-link>
        </td>
        <td v-else></td>
      </tr>
    </table>
  </div>
</template>


<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "Partido",
  data() {
    return {
      partidos: "",
      equipos: "",
    };
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    async datos() {
      try {
        const res = await axios.get("http://localhost:8081/partido/lista", {
          headers: {
            "Content-Type": "application",
            Authorization: this.token,
          },
        });
        this.partidos = res.data;
      } catch (error) {
      }

      try {
        const equipos = await axios.get("http://localhost:8081/equipo/lista", {
          headers: {
            "Content-Type": "application",
            Authorization: this.token,
          },
        });
        this.equipos = equipos.data;
      } catch (error) {
      }
    },
  },
  created() {
    this.datos();
  },
};
</script>