<template>
  <div class="registrar" id='login'>
    <h1>Login</h1>
      <form @submit.prevent="registrar(usuarios)">
          <table style="width:200px">
              <tr>
                  <th style="width:25%">
                      Nombre
                  </th>
                  <td>
                      <input type="text" name="nombre" v-model="usuarios.nombre">
                  </td>
              </tr>
              <tr>
                  <th>
                      Correo
                  </th>
                  <td>
                      <input type="email" name="correo" v-model="usuarios.correo">
                  </td>
              </tr>
              <tr>
                  <th>
                      Usuario
                  </th>
                  <td>
                      <input type="text" name="username" v-model="usuarios.username">
                  </td>
              </tr>
              <tr>
                  <th>
                      Password
                  </th>
                  <td>
                      <input type="password" name="password" v-model="usuarios.password">
                  </td>
              </tr>
              <tr>
                  <td>

                  </td>
                  <td>
                      <button type="submit" >Registrar</button>
                  </td>
              </tr>
          </table>
      </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      usuarios: {
        nombre: "",
        correo: "",
        username: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    ...mapActions(["registrar"]),
    carga() {
      if (this.token != null) {
        window.location.href = "/";
      }
    },
  },
  created() {
    this.carga();
  },
};
</script>