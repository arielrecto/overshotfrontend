import { createRouter, createWebHistory } from "vue-router";

import Home from './pages/Home.vue';
import About from './pages/About.vue';
import Login from './pages/LogIn.vue';
import Signup from './pages/Signup.vue';
import Dashboard from './pages/Dashboard.vue'
import Overview from './pages/Admin/pages/Overview.vue'
import Inventory from './pages/Admin/pages/Inventory.vue'
import AdminPOS from './pages/Admin/pages/PointOfSale.vue'
import pipeline from "./middleware/pipeline.js";
import auth from "./middleware/auth.js";




const routes = [
    {
        path : '/',
        component : Home
    },
    {
        path : '/about',
        component : About
    },
    {
        path : '/signin',
        component : Login
    },
    {
        path : '/login',
        redirect : '/signin'
    },
    {
        path : '/signup',
        component : Signup
    },
    {
        path : '/dashboard',
        redirect : '/admin'
    },
    {
        path : '/admin',
        component : Dashboard,
        name : 'admin',
        meta :{
            middleware : [auth]
        },
        children : [
            {
                path : 'overview',
                name : 'overview',
                component : Overview
            },
            {
                path : 'inventory',
                component : Inventory   
            },
            {
                path : 'point-of-sale',
                component : AdminPOS
            }
        ]
    }
]



const router = createRouter({
    history : createWebHistory(),
    routes : routes,
});

router.beforeEach((to, from, next)=> {

    if(!to.meta.middleware) {
        return next()
    }

    const middleware = to.meta.middleware;
    const context = {
        to, 
        from,
        next
    }


    return middleware[0]({
        ...context, next : pipeline(context, middleware, 1)
    })

})


export default router