<template>
  <div class="hero">
    <h1>Welcome to TechZone</h1>
    <p>Your one-stop shop for the latest gadgets 🚀</p>
    <button class="button" @click="$router.push('/orders')">Shop Now</button>
  </div>
  <div class="container">
    <h2>Popular Products</h2>
    <div class="product-grid">
      <div class="product-card" v-for="p in popularProducts" :key="p.id">
        <img :src="p.image" :alt="p.title" />
        <h3>{{ p.title }}</h3>
        <p class="price">${{ p.price }}</p>
        <button @click="addToCart(p)">Add to Cart</button>
        <p v-if="successMsg[p.id]" class="success-msg">{{ successMsg[p.id] }}</p>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return { 
        products: [],
        successMsg: "",
    }
  },
  computed: {
    popularProducts() {
      return this.products.slice(0, 6) // prva 6 proizvoda
    }
  },
  async mounted() {
    const res = await fetch("https://fakestoreapi.com/products")
    this.products = await res.json()
  },
  methods: {
    addToCart(product) {
      const user = JSON.parse(localStorage.getItem("loggedInUser"))
      if (!user) return this.$router.push("/login")

      const key = `cart_${user.email}`
      let cart = JSON.parse(localStorage.getItem(key)) || []
      cart.push(product)
      localStorage.setItem(key, JSON.stringify(cart))
      window.dispatchEvent(new Event("storage"))
      
      this.successMsg = { ...this.successMsg, [product.id]: `${product.title} added to cart!` }
      setTimeout(() => {
        const { [product.id]: removed, ...rest } = this.successMsg
        this.successMsg = rest
      }, 3000)
      console.log(this.successMsg)
    }
  }
}
</script>

<style scoped>
.hero {
  text-align: center;
  padding: 180px 20px;
  background: linear-gradient(120deg, #3498db, #8e44ad);
  color: white;
  margin-bottom: 30px;
  font-size: 1.5rem;
}
.hero h1{
  padding: 20px;
}
.hero p{
  margin-bottom: 20px;
}
.button{
  height: 4rem;
  width: 10rem;
  font-size: 16px;
}
</style>