<template>
  <div class="container">
    <h2>Admin Panel</h2>
    <div class="form">
      <form @submit.prevent="addProduct">
        <input v-model="newProduct.title" placeholder="Product name" />
        <input v-model="newProduct.price" placeholder="Price" type="text" />
        
        <div class="select-wrapper">
          <select v-model="newProduct.image">
          <option disabled value="">-- Select Image --</option>
          <option v-for="img in allowedItems" :key="img" :value="img">
            {{ img }}
          </option>
        </select>
        </div>
        

        <button type="submit" class="add">Add Product</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>

    <div v-if="customProducts.length > 0">
      <h1>Custom Products</h1>
      <div class="product-grid">
        <div v-for="(p, i) in customProducts" :key="p.id" class="product-card">
          <img :src="imagePath(p.image)" :alt="p.title" />
          <h3>{{ p.title }}</h3>
          <p class="price">${{ p.price }}</p>
          <button class="delete" @click="deleteProduct(i)">Delete</button>
        </div>
      </div>
    </div>
    <p v-else>No custom products yet.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newProduct: { title: "", price: "", image: "" },
      customProducts: [],
      errorMessage: "",
      allowedItems: ['camera', 'headphones', 'iphone', 'keyboard', 'laptop', 'monitor', 'mouse', 'pc', 'watch']
    }
  },
  mounted() {
    this.loadProducts()
  },
  methods: {
    loadProducts() {
      this.customProducts = JSON.parse(localStorage.getItem("customProducts")) || []
    },
    saveProducts() {
      localStorage.setItem("customProducts", JSON.stringify(this.customProducts))
      window.dispatchEvent(new Event("storage"))
    },
    addProduct() {

      // const regExTitle = /^[A-Z][a-zA-Z]{1,}?$/
      // if (!regExTitle.test(this.newProduct.title)) {
      //   this.errorMessage = "Price must contain only letters (e.g. Laptop or Pc)"
      //   return
      // }
      if(!this.newProduct.title){
        this.errorMessage = "You need to enter name of the product!"
        return
      }

      const regExPrice = /^[0-9]+(\.[0-9]{1,2})?$/
      if (!regExPrice.test(this.newProduct.price)) {
        this.errorMessage = "Price must contain only numbers (e.g. 1200 or 1200.50)"
        return
      }

      if (!this.newProduct.image) {
        this.errorMessage = "Please select an image."
        return
      }

      const productWithId = {
        id: Date.now(),
        title: this.newProduct.title,
        price: parseFloat(this.newProduct.price),
        image: this.newProduct.image
      }

      this.customProducts.push(productWithId)
      this.saveProducts()
      this.newProduct = { title: "", price: "", image: "" }
      this.errorMessage = ""
    },
    deleteProduct(index) {
      const deletedProduct = this.customProducts[index]
      this.customProducts.splice(index, 1)
      this.saveProducts()

      for (let key in localStorage) {
        if (key.startsWith("cart_")) {
          let cart = JSON.parse(localStorage.getItem(key)) || []
          cart = cart.filter(item => item.id !== deletedProduct.id)
          localStorage.setItem(key, JSON.stringify(cart))
        }
      }

      window.dispatchEvent(new Event("storage"))
    },
    imagePath(imgName) {
      return `src/assets/images/${imgName}.jpg`
    }
  }
}
</script>

<style scoped>
.add {
  margin-top: 15px;
  background-color: rgb(50, 234, 4);
}
.add:hover {
  background-color: rgb(22, 208, 109);
}
.delete {
  background-color: rgb(221, 7, 7);
}
.delete:hover {
  background-color: rgb(237, 39, 25);
}
h1 {
  text-align: center;
}
p {
  margin: 15px 0px;
}
select {
  display: block;
  width: 100%;
  margin: 20px 0;
  padding: 15px;
}
.error {
  color: red;
  margin-top: 10px;
}

.select-wrapper {
  position: relative;
  width: 100%;
}

.select-wrapper select {
  width: 100%;
  padding: 15px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.select-wrapper::after {
  content: "▼";
  font-size: 14px;
  position: absolute;
  top: 50%;
  right: 20px;   /* pomeraj strelicu */
  transform: translateY(-50%);
  pointer-events: none;
}
</style>
