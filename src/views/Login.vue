<template lang="">
    <div class="login" id='login'>
        <h1>Login</h1>
        <form @submit.prevent="ingresar(usuario)">
            <table style="width:200px">
                <tr>
                    <th style="width:25%">
                        Usuario
                    </th>
                    <td>
                        <input type="text" name="username" v-model="usuario.username">
                    </td>
                </tr>
                <tr>
                    <th>
                        Password
                    </th>
                    <td>
                        <input type="password" name="password" v-model="usuario.password">
                    </td>
                </tr>
                <tr>
                    <td>

                    </td>
                    <td>
                        <button type="submit" >Ingresar</button>
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
      usuario: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    ...mapActions(["ingresar"]),
    carga() {
      console.log("fady" + this.token);
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