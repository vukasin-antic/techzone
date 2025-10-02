<template>
  <div class="container">
    <h2>Your Cart</h2>

    <!-- Ako korisnik nije ulogovan -->
    <div v-if="!currentUser">
      <p>You must <router-link to="/login">login</router-link> to view your cart.</p>
    </div>

    <!-- Ako je korisnik ulogovan -->
    <div v-else>
      <!-- Info o korisniku -->
      <div class="user-info">
        <h3>User Info</h3>
        <p><span>Name:</span> {{ currentUser.firstName }} {{ currentUser.lastName }}</p>
        <p><span>Email:</span> {{ currentUser.email }}</p>
        <p><span>Phone:</span> {{ currentUser.phone || "Not provided" }}</p>
        <p><span>Address:</span> {{ currentUser.address || "Not provided" }}</p>
      </div>

      <!-- Korpa -->
      <div class="cart-items">
        <h3>Products in Cart</h3>
        <div v-if="cart.length === 0">
          <p>Your cart is empty.</p>
        </div>
        <div class="product-grid" v-else>
          <div  class="product-card" v-for="(item, index) in cart" :key="index">
            <img :src="item.image.startsWith('http') ? item.image : '/src/assets/images/' + item.image + '.jpg'" :alt="item.title" />
            <div>
              <h3>{{ item.title }}</h3>
              <p class="price">${{ item.price }}</p>
              <button @click="removeFromCart(index)">Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="block" v-if="cart.length !== 0">
      <button class="button" @click="removeAll">Remove All</button>
      <h3 class="total">Total: ${{ total }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentUser: null,
      cart: [],
    }
  },
  computed: {
    total() {
      return this.cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)
    }
  },
  mounted() {
    this.loadCart()
    window.addEventListener("storage", this.loadCart)
  },
  beforeUnmount() {
    window.removeEventListener("storage", this.loadCart)
  },
  methods: {
    getCartKey() {
      const currentUser = JSON.parse(localStorage.getItem("loggedInUser"))
      this.currentUser = currentUser
      return currentUser ? `cart_${currentUser.email}` : "cart_guest"
    },
    loadCart() {
      const key = this.getCartKey()
      this.cart = JSON.parse(localStorage.getItem(key)) || []
      
    },
    saveCart() {
      const key = this.getCartKey()
      localStorage.setItem(key, JSON.stringify(this.cart))
      window.dispatchEvent(new Event("storage"))
    },
    removeFromCart(index) {
      this.cart.splice(index, 1)
      this.saveCart()
    },
    removeAll(){
      this.cart = []
      this.saveCart()
    }
  }
}
</script>

<style scoped>

.user-info {
  margin-bottom: 20px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 6px;
}
.user-info span{
  font-weight: bold;
}
.cart-items {
  margin-top: 20px;
}

.cart-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.cart-card img {
  width: 180px;
  height: 180px;
  object-fit: cover;
}

.price {
  color: #3498db;
  font-weight: bold;
}
.button{
  background: #dc2c19;
  padding: 12px 24px;
  font-size: 16px;
}
button {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #c0392b;
}
.block{
  margin-top: 45px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.total {
  font-size: 20px;
  font-weight: bold;
}
</style>
