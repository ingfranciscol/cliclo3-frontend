import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/registrar',
    name: 'Registrar',
    component: () => import('../views/Registrar.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/registrarpartido',
    name: 'Registrar Partido',
    component: () => import('../views/RegistrarPartidos.vue'),
    meta: {seguridad: true}
  },
  {
    path: '/partido',
    name: 'Ver Partido',
    component: () => import('../views/Partido.vue'),
    meta: {seguridad: true}
  },
  {
    path: '/actualizar/:id',
    name: 'Actualizar',
    component: () => import('../views/Actualizar.vue'),
    meta: {seguridad: true}
  },
  {
    path: '/equipo',
    name: 'Equipo',
    component: () => import('../views/Equipo.vue'),
    meta: {seguridad: true}
  },
  {
    path: '/equipos',
    name: 'Equipos',
    component: () => import('../views/Equipos.vue'),
    meta: {seguridad: true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, form, next)=>{  
  const seguridad = to.matched.some(item=>item.meta.seguridad)
  if(seguridad && store.state.token === null ){
    next('/')
  }
  else{
    next()
  }
})
export default router

