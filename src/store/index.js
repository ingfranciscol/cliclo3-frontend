import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";
const ENDPOINT_PATH = "http://localhost:8081";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async registrar({ commit }, usuario) {
      try {
        const res = await axios.post(
          ENDPOINT_PATH + "/usuario/agregar",
          usuario
        );
        router.push("/login");
      } catch (error) {
        if (usuario.nombre == "") {
          alert("El campo de nombre no debe estar vavio");
        } else if (usuario.correo == "") {
          alert("El campo de correo no debe estar vavio");
        } else if (usuario.username == "") {
          alert("El campo de usuario no debe estar vavio");
        } else if (usuario.password == "") {
          alert("El campo de password no debe estar vavio");
        } else {
          alert(
            "Por favor eliga otro nombre como usuario. \n" +
              usuario.username +
              ", ya se encuentra registrado"
          );
        }
      }
    },
    async registrarPartidos({ commit }, registro) {      
      if (registro.local != "" && registro.visitante != "" ) {
          if (registro.local != "null" && registro.visitante != "null"){
            if(registro.goles_local == "" || registro.goles_visitante == "" || registro.fecha==""){
              var mensaje = confirm("¿El partido aun no sea llevado acabo?\nDesea guardarlo asi");
              if (mensaje) {
                registro.usuario = parseInt(registro.usuario);
                registro.goles_local = 0;
                registro.goles_visitante = 0;
                try {
                  const res = await axios.post(
                    ENDPOINT_PATH + "/partido/agregar",
                    registro,
                    {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("Authorization"),
                      },
                    }
                  );
                  router.push("/partido");
                } catch (error) {
                }
              }
              else {
                alert("¡Continue llenando los datos!");
              }
            }
            else{
              registro.usuario = parseInt(registro.usuario);
              registro.goles_local = parseInt(registro.goles_local);
              registro.goles_visitante = parseInt(registro.goles_visitante);
              try {
                const res = await axios.post(
                  ENDPOINT_PATH + "/partido/agregar",
                  registro,
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: localStorage.getItem("Authorization"),
                    },
                  }
                );
                router.push("/partido");
              } catch (error) {
              }
            }
          }
          else{
            if(registro.local == "null" ){
              alert("Se debe selecionar un equipos como local");
            }else if(registro.visitante == "null" ){
              alert("Se debe selecionar un equipos como Visitante");
            }
          }   
      }
      else{
        if(registro.local == "" ){
          alert("Se debe selecionar un equipos como local");
        }else if(registro.visitante == "" ){
          alert("Se debe selecionar un equipos como Visitante");
        }
      }
      /**/
    },
    async registrarEquipo({ commit }, equipo) {
      try {
        const res = await axios.post(
          ENDPOINT_PATH + "/equipo/agregar",
          equipo,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("Authorization"),
            },
          }
        );
        router.push("/equipos");
      } catch (error) {
        if (equipo.nombre == "") {
          alert("El campo de nombre no debe estar vavio");
        } else {
          alert(
            "Por favor eliga otro nombre. \n" +
              equipo.nombre +
              ", ya se encuentra registrado"
          );
        }
      }
    },
    async actualizarPartidos({ commit }, registro) {
      if(registro.fecha!=""){
        registro.usuario = parseInt(registro.usuario);
        registro.goles_local = parseInt(registro.goles_local);
        registro.goles_visitante = parseInt(registro.goles_visitante);
        try {
          const res = await axios.put(
            ENDPOINT_PATH + "/partido/actualizar",
            registro,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("Authorization"),
              },
            }
          );
          router.push("/partido");
        } catch (error) {
        }
      }
      else{
        alert("Debe seleccionar una fecha")
      }
    },
    async ingresar({ commit }, usuario) {
      try {
        const res = await axios.post(ENDPOINT_PATH + "/login", usuario);

        commit("setToken", res.headers.authorization);
        localStorage.setItem("Authorization", res.headers.authorization);

        try {
          const res = await axios.get(
            ENDPOINT_PATH +
              "/usuario/buscar/" +
              usuario.username +
              "/" +
              usuario.password,
            {
              headers: {
                "Content-Type": "application",
                Authorization: localStorage.getItem("Authorization"),
              },
            }
          );
          commit("setUser", res.data.id);
          localStorage.setItem("User", res.data.id);
        } catch (error) {
        }

        alert("Bienvenido!!!!");
        router.push("/partido");
      } catch (error) {
        if (usuario.username == "") {
          alert("El campo de usuario no debe estar vavio");
        } else if (usuario.password == "") {
          alert("El campo de password no debe estar vavio");
        } else {
          alert("Usuario no exite\n o las credenciales estan erradas");
        }
      }
    },
    leerToken({ commit }) {
      if (localStorage.getItem("Authorization")) {
        commit("setToken", localStorage.getItem("Authorization"));
        commit("setUser", localStorage.getItem("User"));
      } else {
        commit("setToken", null);
        commit("setUser", null);
      }
    },
  },
  modules: {},
});
