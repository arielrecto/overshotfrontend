import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/Home.vue";
import About from "./pages/About.vue";
import Login from "./pages/LogIn.vue";
import Signup from "./pages/Signup.vue";
import Dashboard from "./pages/Dashboard.vue";
import Overview from "./pages/Admin/pages/Overview.vue";
import Inventory from "./pages/Admin/pages/Inventory.vue";
import AdminPOS from "./pages/Admin/pages/PointOfSale.vue";
import pipeline from "./middleware/pipeline.js";
import auth from "./middleware/auth.js";
import LandingPage from "./pages/Admin/pages/LandingPage.vue";
<<<<<<< HEAD
import UserPage from "./pages/User/pages/index.vue"
import OrderPage from "./pages/User/pages/OrderPage.vue"
import ForgetPassword from "./ForgetPassword.vue";
import HelpPage from "./HelpPage.vue";

=======
import UserPage from "./pages/User/pages/index.vue";
import OrderPage from "./pages/User/pages/OrderPage.vue";
import Profile from "./pages/User/pages/Profile.vue";
import authUserRole from "./middleware/authUserRole";
>>>>>>> origin/main

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/signin",
    component: Login,
  },
  {
    path: "/login",
    redirect: "/signin",
  },
  {
    path: "/signup",
    component: Signup,
  },
  {
    path: "/dashboard",
    redirect: "/admin",
  },
  {
    path: "/admin",
    component: Dashboard,
    name: "admin",
    meta: {
      middleware: [auth, authUserRole],
    },
    children: [
      {
        path: "overview",
        name: "overview",
        component: Overview,
      },
      {
        path: "inventory",
        name: "inventory",
        component: Inventory,
      },
      {
        path: "point-of-sale",
        name: "post of sale",
        component: AdminPOS,
      },
      {
        path: "landing-page-setting",
        name: "landing page setting",
        component: LandingPage,
      },
    ],
  },
  {
    path: "/client/:name",
    component: UserPage,
    name: "client",
    meta :{
      middleware : [auth, authUserRole]
    },
<<<<<<< HEAD
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
        path : '/forgetPassword',
        component : ForgetPassword

    },
    {
        path : '/dashboard',
        redirect : '/admin'
    },
    {
        path : '/helpPage',
        component : HelpPage
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
                name : 'inventory',
                component : Inventory   
            },
            {
                path : 'point-of-sale',
                name : 'post of sale',
                component : AdminPOS
            },
            {
                path : 'landing-page-setting',
                name : 'landing page setting',
                component : LandingPage
            }
        ]
    },
    {
        path : '/user',
        component : UserPage,
        name : 'user',
        children : [
           {
            path : 'order',
            component : OrderPage
           }
        ]
    }
]


=======
    children: [
      {
        path: "profile/:id",
        component: Profile,
      },
    ],
  },
];
>>>>>>> origin/main

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }

  const middleware = to.meta.middleware;
  const context = {
    to,
    from,
    next,
  };

  return middleware[0]({
    ...context,
    next: pipeline(context, middleware, 1),
  });
});

<<<<<<< HEAD
    

    return middleware[0]({
        ...context, next : pipeline(context, middleware, 1)
    })

})


export default router
=======
export default router;
>>>>>>> origin/main
