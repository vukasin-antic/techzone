import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Orders from '../views/Orders.vue'
import Admin from '../views/Admin.vue'
import Cart from '../views/Cart.vue'

const routes = [
  { 
    path: '/techzone/', 
    component: Home 
  },
  { 
    path: '/techzone/home', 
    component: Home 
  },
  { 
    path: '/techzone//login', 
    component: Login 
  },
  { 
    path: '/techzone//register', 
    component: Register 
  },
  { 
    path: '/techzone//orders', 
    component: Orders 
  },
  { 
    path: '/techzone//cart', 
    component: Cart 
  },
  { 
    path: '/techzone//admin', 
    component: Admin,
    meta: { requiresAdmin: true }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (to.meta.requiresAdmin) {
    if (user && user.role === "admin") {
      next();
    } 
    else {
      next("/techzone//home");
    }
  } 
  else {
    next();
  }
  
});

export default router
