import { createRouter, createWebHashHistory } from "vue-router";

import Home from './pages/Home.vue';
import About from './pages/About.vue';
import Login from './pages/LogIn.vue';
import Signup from './pages/Signup.vue';

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
        path : '/signup',
        component : Signup
    }
]



const router = createRouter({
    history : createWebHashHistory(),
    routes : routes
});


export default router