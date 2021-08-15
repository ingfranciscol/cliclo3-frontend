<template>
  <div class="registrarPartido" id="login">
    <h1>Registrar Partido</h1>
    <form @submit.prevent="registrarPartidos(registro)">
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
            <select name="local" v-model="registro.local">
              <option value=null >Selecione un equipo</option>
              <option
                v-for="e in equipos"
                v-bind:key="e.id"
                v-bind:value="e.id"
              >
                {{ e.nombre }}
              </option>
            </select>
          </td>
          <th>Equipo Visitante</th>
          <td>
            <select name="visitante" v-model="registro.visitante">
              <option value=null >Selecione un equipo</option>
              <option
                v-for="e in equipos"
                v-bind:key="e.id"
                v-bind:value="e.id"
                v-show="e.id != registro.local"
              >
                {{ e.nombre }}
              </option>
            </select>
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
      equipos: "",
      registro: {
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
    ...mapActions(["registrarPartidos"]),
    async datosPartidos() {
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