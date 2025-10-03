<!-- npm run build
npm install gh-pages --save-dev
npm run deploy 

kad hostujem fajlove
-->




<template>
  <div class="container">
    <h2>All Products</h2>
    <input v-model="search" placeholder="Search products..." />
    <div class="product-grid">
      <div class="product-card" v-for="p in filteredProducts" :key="p.id">
        <img :src="p.image.startsWith('http') ? p.image : 'images/' + p.image + '.jpg'" :alt="p.title" />
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
      search: "",
      successMsg: {}
    }
  },
  async mounted() {
    const res = await fetch("https://fakestoreapi.com/products")
    const apiProducts = await res.json()
    const localProducts = JSON.parse(localStorage.getItem("customProducts")) || []
    this.products = [...apiProducts, ...localProducts]
  },
  computed: {
    filteredProducts() {
      return this.products.filter(p =>
        p.title.toLowerCase().includes(this.search.toLowerCase())
      )
    }
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