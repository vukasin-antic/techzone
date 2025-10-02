<template>
  <div class="auth">
    <div class="auth-title">
      <h1>Log in to access your account and shopping cart with ease.</h1>
    </div>
    <div class="auth-container">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input type="email" name="email" v-model="email" placeholder="Email" required />
        <input type="password" name="password" v-model="password" placeholder="Password" required />
        <button type="submit">Log in</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
      <p class="reg-log">Don’t have an account? <a href="/register">Sign up</a></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { 
      email: "", 
      password: "", 
      error: "" 
    }
  },
  methods: {
    login() {
      const users = JSON.parse(localStorage.getItem("users")) || []
      const user = users.find(u => u.email === this.email && u.password === this.password)
      if (!user) {
        this.error = "Invalid email or password"
        return
      }
      localStorage.setItem("loggedInUser", JSON.stringify(user))
      window.dispatchEvent(new Event("storage"))
      this.$router.push("/")
    }
  }
}
</script>
<style scoped>

</style>