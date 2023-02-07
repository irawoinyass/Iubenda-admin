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
    path:'/login',
    meta: {
        title: "Login",
    },


    },
    {
    name:'Dashboard',
    component:Dashboard,
    path:'/',
    meta: {
        title: "Dashboard",
    },


  },
    {
    name:'createCompany',
    component:createCompany,
    path:'/create-company',
    meta: {
        title: "create Company",
    },


  },
    {
    name:'companyList',
    component:companyList,
    path:'/company-list',
    meta: {
        title: "company List",
    },


  },
    {
    name:'updateCompany',
    component:updateCompany,
    path:'/update-company/:id',
    meta: {
        title: "update Company",
    },


  },
    {
    name:'createPeople',
    component:createPeople,
    path:'/create-people',
    meta: {
        title: "create People",
    },


  },
    {
    name:'peopleList',
    component:peopleList,
    path:'/people-list',
    meta: {
        title: "people List",
    },

    

  },
    {
    name:'updatePeople',
    component:updatePeople,
    path:'/update-people/:id',
    meta: {
        title: "update People",
    },


  }
  
  

]


const router = createRouter({
    history:createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    next();
})


export default router