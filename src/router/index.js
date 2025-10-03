import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Orders from '../views/Orders.vue'
import Admin from '../views/Admin.vue'
import Cart from '../views/Cart.vue'

const routes = [
  { 
    path: '/', 
    component: Home 
  },
  { 
    path: '/home', 
    component: Home 
  },
  { 
    path: '/login', 
    component: Login 
  },
  { 
    path: '/register', 
    component: Register 
  },
  { 
    path: '/orders', 
    component: Orders 
  },
  { 
    path: '/cart', 
    component: Cart 
  },
  { 
    path: '/admin', 
    component: Admin,
    meta: { requiresAdmin: true }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (to.meta.requiresAdmin) {
    if (user && user.role === "admin") {
      next();
    } 
    else {
      next("/");
    }
  } 
  else {
    next();
  }
  
});

export default router
