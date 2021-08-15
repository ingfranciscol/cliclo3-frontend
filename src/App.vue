<template>
  <div id="app">
    <div id="nav">
      <cabecera></cabecera>
      <router-link to="/">Home</router-link> |
      
      <span v-if="tokenIf">
        <router-link to="/registrar">Registrar</router-link> |
        <router-link to="/login">Ingresar</router-link> |
      </span>
      
      <span v-if="tokenIf == false">
        <router-link to="/registrarpartido">Registar Partido</router-link> |
        <router-link to="/partido">Ver Partido</router-link> |
        <router-link to="/equipo">Registrar Equipo</router-link> |
        <router-link to="/equipos">Listado de Equipo</router-link> |
        <a v-on:click="salir">Salir</a>
      </span>
    </div>
    <router-view />
  </div>
</template>
<script>
import { mapActions } from "vuex";
import store from "./store";
import router from "./router";
import Cabecera from "./components/Cabecera.vue";

export default {
  name: "app",
  data() {
    return {
      tokenIf: null,
    };
  },
  components: {
    Cabecera,
  },
  methods: {
    ...mapActions(["leerToken"]),
    salir() {
      localStorage.removeItem("Authorization");
      localStorage.removeItem("User");
      this.tokenIf = true;
      store.state.token = null;
      store.state.user = null;
      router.push("login");
    },
  },
  created() {
    this.leerToken();
    if (store.state.token != null) {
      this.tokenIf = false;
    } else {
      this.tokenIf = true;
    }
  },
  updated() {
    if (store.state.token != null) {
      this.tokenIf = false;
    } else {
      this.tokenIf = true;
    }
  },
};
</script>
<style>
body {
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(0, 212, 255, 1) 100%
  );
  height: 100%;
  background-attachment: fixed;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

table {
  text-align: left;
}

hd {
  background: rgb(3, 219, 57);
}

#login {
  text-align: center;
  text-align: -webkit-center;
}
</style>
