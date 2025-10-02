<template>
  <header>
    <h1>TechZone</h1>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/orders">Orders</router-link>
      <router-link v-if="isAdmin" to="/admin">Admin</router-link>
      <router-link v-if="!loggedInUser" to="/login">Login</router-link>
      <router-link v-if="!loggedInUser" to="/register">Sign Up</router-link>
      <a v-if="loggedInUser" @click="logout" class="logout">Logout</a>
    </nav>
    <div class="cart-icon" @click="goToCart">
      <i class="fa-solid fa-cart-shopping"></i><span v-if="cartCount > 0">{{ cartCount }}</span>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      cartCount: 0,
      isAdmin: false,
      loggedInUser: null
    }
  },
  mounted() {
    this.checkUser()
    this.updateCartCount()
    window.addEventListener("storage", () => {
      this.updateCartCount()
      this.checkUser()
    })
  },
  beforeUnmount() {
    window.removeEventListener("storage", this.updateCartCount)
  },
  methods: {
    checkUser() {
      const user = JSON.parse(localStorage.getItem("loggedInUser"))
      this.loggedInUser = user
      this.isAdmin = user && user.role === "admin"
    },
    updateCartCount() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"))
    const key = user ? `cart_${user.email}` : "cart_guest"
    const cart = JSON.parse(localStorage.getItem(key)) || []
    this.cartCount = cart.length
  },
    goToCart() {
      const user = JSON.parse(localStorage.getItem("loggedInUser"))
      if (!user) {
        this.$router.push("/login")
      } else {
        this.$router.push("/cart")
      }
    },
    logout() {
      localStorage.removeItem("loggedInUser")
      this.loggedInUser = null
      this.isAdmin = false
      this.cartCount = 0
      window.dispatchEvent(new Event("storage"))
      this.$router.push("/")
    }
  }
}
</script>
<style>  
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, #2c3e50, #3498db);
  color: white;
  padding: 15px;
}

header h1 {
  font-size: 28px;
  letter-spacing: 1px;
}
nav a {
  color: white;
  margin: 0 10px;
  text-decoration: none;
  transition: color 0.2s;
  font-size: 1.3rem;
  cursor: pointer;
}

nav a.router-link-exact-active, .cart-icon {
  color: #ffd700;
}

nav a:hover, .cart-icon:hover {
  color: #ffdd55;
}
.cart-icon {
  cursor: pointer;
  font-size: 1.7rem;
  position: relative;
  transition: color 0.2s;
  margin-right: 70px;
}
.cart-icon span {
  background: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 14px;
  position: absolute;
  top: -10px;
  right: -15px;
}

</style>