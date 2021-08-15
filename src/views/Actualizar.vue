<template>
  <div class="registrarPartido" id="login">
    <h1>Actualizar Partido</h1>
    <form @submit.prevent="actualizarPartidos(registro)">
      <table border="1" style="width: 600px">
        <tr>
          <th colspan="2">Fecha</th>
          <td colspan="2">
            <input type="date" name="fecha" v-model="registro.fecha" />
          </td>
        </tr>
        <tr>
          <th>Equipo Local</th>
          <td>
            <span
              v-for="e in equipos"
              v-bind:key="e.id"
              v-show="e.id === registro.local"
              >
                {{ e.nombre }}
              </span>
          </td>
          <th>Equipo Visitante</th>
          <td>
            <span
              v-for="e in equipos"
              v-bind:key="e.id"
              v-show="e.id === registro.visitante"
              >
                {{ e.nombre }}
              </span>
          </td>
        </tr>
        <tr>
          <th>Goles Local</th>
          <td>
            <input
              type="number"
              min="0"
              name="goles_local"
              v-model="registro.goles_local"
            />
          </td>
          <th>Goles Visitante</th>
          <td>
            <input
              type="number"
              min="0"
              name="goles_visitante"
              v-model="registro.goles_visitante"
            />
          </td>
        </tr>
        <tr>
          <td colspan="4" style="text-align: center">
            <button type="submit">Registrar</button>
          </td>
        </tr>
      </table>
    </form>
  </div>
</template>


<script>
import { mapActions, mapState } from "vuex";
import axios from "axios";

export default {
  name: "RegistroPartidos",
  data() {
    return {
      id: "",
      equipos: "",
      registro: {
        id:"",  
        usuario: "",
        local: "",
        visitante: "",
        fecha: "",
        goles_local: "",
        goles_visitante: "",
      },
    };
  },
  computed: {
    ...mapState(["token", "user"]),
  },
  methods: {
    ...mapActions(["actualizarPartidos"]),
    async datosPartidos() {
      try {
        this.id = this.$route.params.id;

        const res = await axios.get(
          "http://localhost:8081/partido/buscar/" + this.id,
          {
            headers: {
              "Content-Type": "application",
              Authorization: this.token,
            },
          }
        );
        this.registro = await res.data;
      } catch (error) {
      }
      try {
        this.registro.usuario = this.user;
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
    this.datosPartidos();
  },
};
</script>