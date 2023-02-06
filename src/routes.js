import LogIn from './components/LogIn.vue'
import Dashboard from './components/Dashboard.vue'
import createCompany from './components/company/create.vue'
import updateCompany from './components/company/update.vue'
import companyList from './components/company/list.vue'
import createPeople from './components/people/create.vue'
import peopleList from './components/people/list.vue'
import updatePeople from './components/people/update.vue'
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

  },
    {
    name:'createCompany',
    component:createCompany,
    path:'/create-company'

  },
    {
    name:'companyList',
    component:companyList,
    path:'/company-list'

  },
    {
    name:'updateCompany',
    component:updateCompany,
    path:'/update-company/:id'

  },
    {
    name:'createPeople',
    component:createPeople,
    path:'/create-people'

  },
    {
    name:'peopleList',
    component:peopleList,
    path:'/people-list'

  },
    {
    name:'updatePeople',
    component:updatePeople,
    path:'/update-people/:id'

  }
  
  

]


const router = createRouter({
    history:createWebHistory(),
    routes
});


export default router