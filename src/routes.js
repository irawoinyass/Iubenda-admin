import LogIn from './components/LogIn.vue'
import Dashboard from './components/Dashboard.vue'
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  
  {
    name:'LogIn',
    component:LogIn,
    path:'/login'

    },
    {
    name:'Dashboard',
    component:Dashboard,
    path:'/'

  }
  

]


const router = createRouter({
    history:createWebHistory(),
    routes
});


export default router