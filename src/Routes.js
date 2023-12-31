import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/Home.vue";
import About from "./pages/About.vue";
import Login from "./pages/LogIn.vue";
import Signup from "./pages/Signup.vue";
import Dashboard from "./pages/Dashboard.vue";
import pipeline from "./middleware/pipeline.js";
import ProductView from "./pages/ProductsView.vue";
import auth from "./middleware/auth.js";
import ForgetPassword from "./ForgetPassword.vue";
import HelpPage from "./HelpPage.vue";
import UserPage from "./pages/User/pages/index.vue";
import OrderPage from "./pages/User/pages/OrderPage.vue";
import Profile from "./pages/User/pages/Profile.vue";
import adminGuard from "./middleware/adminGuard.js";
import EmployeeIndex from "./pages/Employee/index.vue";
import EmployeeParentPage from "./pages/Employee/EmployeeParentPage.vue";
import InventoryParent from "./pages/Admin/pages/Inventory/InventoryParent.vue";
import ProductParent from "./pages/Admin/pages/Product/ProductParent.vue";
import AdminEmployeeParentPage from "./pages/Admin/pages/Employee/EmployeeParentPage.vue";
import AdminEmployeeIndex from "./pages/Admin/pages/Employee/Index.vue";
import PointOfSale from "./pages/Employee/PointOfSale.vue";
import EmployeeOrder from "./pages/Employee/OrderPage.vue";
import TransactionParent from "./pages/Admin/pages/Transaction/TransactionParent.vue";
import TransactionIndex from "./pages/Admin/pages/Transaction/Index.vue";
import NotFound from "./pages/NotFound.vue";
import Orders from "./pages/User/pages/Orders.vue";
import RiderIndex from "./pages/Riders/Index.vue";
import RiderDashboard from "./pages/Riders/Dashboard.vue";
import RiderDelivery from "./pages/Riders/Delivery.vue";
import FeedbackParent from "./pages/Admin/pages/Feedback/FeedbackParent.vue";
import FeedbackIndex from "./pages/Admin/pages/Feedback/Index.vue";
import PromoParent from "./pages/Admin/pages/Promo/PromoParent.vue";
import PromoIndex from "./pages/Admin/pages/Promo/Index.vue";
import CreatePromo from "./pages/Admin/pages/Promo/CreatePromo.vue";
// import ShowPromo from "./pages/Admin/pages/Promo/ShowPromo.vue";
import OrderShow from "./pages/User/pages/OrderShow.vue";
import TransactionReport from "./pages/Admin/pages/Report/TransactionReport.vue";
import ReportParent from "./pages/Admin/pages/Report/ReportParent.vue";
import ReportIndex from "./pages/Admin/pages/Report/Index.vue";
import ProductRate from "./pages/User/pages/Rates/ProductRate.vue";

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
    name: "login",
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
    path: "/products",
    component: ProductView,
  },
  {
    path : "/products/show/:productID",
    name : 'landing-product-show',
    component : () => import('./pages/ProductsShow.vue')
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
        component: () => import('./pages/Admin/pages/Overview.vue'),
      },
      {
        path: "inventory",
        component: InventoryParent,
        children: [
          {
            path: "",
            name: "inventory",
            component: () => import('./pages/Admin/pages/Inventory/Index.vue'),
          },
          {
            path: "create-supply",
            component: () => import('./pages/Admin/pages/Inventory/CreateSupply.vue'),
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
            component: () => import('./pages/Admin/pages/Product/Index.vue'),
          },
          {
            path: "create-product",
            name: "createProduct",
            component: () => import('./pages/Admin/pages/Product/CreateProduct.vue'),
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
        path : 'CMS',
        component : () => import('./pages/Admin/pages/LandingPage/Index.vue'),
        children: [
          {
            path: "",
            component: () => import('./pages/Admin/pages/LandingPage/Header/Index.vue'),
            name: "cms-header",
          },
          {
            path: "header/create",
            component: () => import('./pages/Admin/pages/LandingPage/Header/Create.vue'),
            name: "cms-header-create",
          },
        ],
      },
      {
        path: "transaction",
        component: TransactionParent,
        children: [
          {
            path: "",
            component: TransactionIndex,
          },
        ],
      },
      {
        path: "feedback",
        component: FeedbackParent,
        children: [
          {
            path: "",
            component: FeedbackIndex,
          },
        ],
      },    
       {
        path: "promo",
        component: PromoParent,
        children: [
          {
            path: "",
            name: "promo-index",
            component: PromoIndex,
          },
          {
            path: "create",
            name: "create-promo",
            component: CreatePromo,
          },
          {
            path: "show/:promo",
            name: "show-promo",
            component: () => import('./pages/Admin/pages/Promo/ShowPromo.vue'),
          },
        ],
      },
      {
        path: "report",
        component: ReportParent,
        children: [
          {
            path: "",
            name: "report-index",
            component: ReportIndex,
          },
          {
            path: "transaction",
            name: "transaction-report",
            component: TransactionReport,
          },
          {
            path: "sales",
            name: "sales-report",
            component: () => import('./pages/Admin/pages/Report/SalesReport.vue'),
          },
        ],
      },
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
        path: "orders",
        name: "orders",
        component: Orders,
      },
      {
        path: "orders/show/:orderID",
        component: OrderShow,
        name: "order-show",
      },
      {
        path: "profile",
        name: "profile",
        component: Profile,
      },
      {
        path: "order/product/:productID/rate",
        name: "product-rate",
        component: ProductRate,
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
        path: "orders",
        name: "employee-orders",
        component: EmployeeOrder,
      },
    ],
  },
  {
    path: "/riders/:name",
    name: "riders-index",
    component: RiderIndex,
    meta: {
      middleware: [auth],
    },
    children: [
      {
        path: "dashboard",
        name: "rider-dashboard",
        component: RiderDashboard,
      },
      {
        path: "deliveries",
        name: "rider-deliveries",
        component: RiderDelivery,
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
