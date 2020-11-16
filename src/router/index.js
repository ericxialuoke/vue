import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import AppIndex from "../components/home/AppIndex";
import Home from '../components/Home'
import library from '../components/library/LibraryIndex'

Vue.use(VueRouter)

const routes = [

  {
    path:'/home',
    name: Home,
    component: Home,
    redirect:'/index',
    children:[
      {
        path: '/index',
        name: 'AppIndex',
        component: AppIndex,
        meta:{
          requireAuth: true
        },
      },
      {
        path: '/library',
        name: 'Library',
        component: library,
        meta: {
          requireAuth: true
        }
      }
    ]
  },

  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
