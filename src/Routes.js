import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/Home.vue";
import About from "./pages/About.vue";
import Login from "./pages/LogIn.vue";
import Signup from "./pages/Signup.vue";
import Dashboard from "./pages/Dashboard.vue";
import Overview from "./pages/Admin/pages/Overview.vue";
import AdminPOS from "./pages/Admin/pages/PointOfSale.vue";
import pipeline from "./middleware/pipeline.js";
import ProductView from './pages/ProductsView.vue';
import auth from "./middleware/auth.js";
import LandingPage from "./pages/Admin/pages/LandingPage.vue";
import ForgetPassword from "./ForgetPassword.vue";
import HelpPage from "./HelpPage.vue";
import UserPage from "./pages/User/pages/index.vue";
import OrderPage from "./pages/User/pages/OrderPage.vue";
import Profile from "./pages/User/pages/Profile.vue";
import adminGuard from "./middleware/adminGuard.js";
import EmployeeIndex from "./pages/Employee/index.vue";
import EmployeeParentPage from "./pages/Employee/EmployeeParentPage.vue";
import InventoryParent from "./pages/Admin/pages/Inventory/InventoryParent.vue";
import InventoryIndex from "./pages/Admin/pages/Inventory/Index.vue";
import CreateSupply from "./pages/Admin/pages/Inventory/CreateSupply.vue";
import ProductParent from "./pages/Admin/pages/Product/ProductParent.vue";
import ProductIndex from "./pages/Admin/pages/Product/Index.vue";
import CreateProduct from "./pages/Admin/pages/Product/CreateProduct.vue";
import AdminEmployeeParentPage from "./pages/Admin/pages/Employee/EmployeeParentPage.vue";
import AdminEmployeeIndex from "./pages/Admin/pages/Employee/Index.vue";
import PointOfSale from "./pages/Employee/PointOfSale.vue";
import EmployeeOrder from './pages/Employee/OrderPage.vue';
import TransactionParent from './pages/Admin/pages/Transaction/TransactionParent.vue';
import TransactionIndex from './pages/Admin/pages/Transaction/Index.vue';
import NotFound from "./pages/NotFound.vue";
import Orders from './pages/User/pages/Orders.vue';

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
    path: "/helppage",
    component: HelpPage,
  },
  {
    path: "/forgetpassword",
    component: ForgetPassword,
  },
  {
    path: "/dashboard",
    redirect: "/admin",
  },
  {
    path : '/products',
    component : () => ProductView
  },
  {
    path: "/admin",
    component: Dashboard,
    name: "admin",
    meta: {
      middleware: [auth, adminGuard],
    },
    children: [
      {
        path: "overview",
        name: "overview",
        component: Overview,
      },
      {
        path: "inventory",
        component: InventoryParent,
        children: [
          {
            path: "",
            name: "inventory",
            component: InventoryIndex,
          },
          {
            path: "create-supply",
            component: CreateSupply,
            name: "createSupply",
          },
        ],
      },
      {
        path: "products",
        component: ProductParent,
        children: [
          {
            path: "",
            name: "products",
            component: ProductIndex,
          },
          {
            path: "create-product",
            name: "createProduct",
            component: CreateProduct,
          },
        ],
      },
      {
        path: "employee",
        component: AdminEmployeeParentPage,
        children: [
          {
            path: "",
            component: AdminEmployeeIndex,
            name: "admin-employee-index",
          },
        ],
      },
      {
        path : "transaction", 
        component : TransactionParent,
        children : [
          {
            path : "",
            component : TransactionIndex
          }
        ]
      }
    ],
  },
  {
    path: "/client/:name",
    component: UserPage,
    name: "client",
    meta: {
      middleware: [auth],
    },
    children: [
      {
        path: "products",
        component: OrderPage,
        name: "orderpage",
      },
      {
        path : "orders",
        name : 'orders',
        component : Orders
      },
      {
        path: "profile",
        name: "profile",
        component: Profile,
      },
    ],
  },
  {
    path: "/employee/:name",
    component: EmployeeParentPage,
    meta: {
      middleware: [auth],
    },
    children: [
      {
        path: "",
        name: "employee-index",
        component: EmployeeIndex,
      },
      {
        path: "pos",
        name: "point-of-sale",
        component: PointOfSale,
      },
      {
        path : "orders",
        name : 'employee-orders',
        component : EmployeeOrder
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "404-not-found",
    component: NotFound,
  },
];

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

export default router;
