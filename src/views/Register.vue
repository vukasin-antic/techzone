<template>
  <div class="auth">
    <div class="auth-title">
      <h1>Log in to access your account and shopping cart with ease.</h1>
    </div>
    <div class="auth-container">
      <h2>Sign up</h2>
      <form @submit.prevent="register">
        <input type="text" name="firstName" v-model="firstName" placeholder="First Name" />
        <input type="text" name="lastName" v-model="lastName" placeholder="Last Name" />
        <input type="email" name="email" v-model="email" placeholder="Email" />
        <input type="password" name="pass" v-model="password" placeholder="Password" />
        <input type="password" name="check-pass" v-model="confirmPassword" placeholder="Confirm Password"/>
        <input type="text" name="phone" v-model="phone" placeholder="Phone (optional)" />
        <input type="text" name="address" v-model="address" placeholder="Address (optional)" />
        <button type="submit">Sign up</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p class="reg-log">Already have an account? <router-link to="/login">Log in</router-link></p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      errorMessage: ""
    }
  },
  methods: {
    validateForm() {
      // Regex obrasci
      const RegExImePrezime = /^[A-ZČĆŽŠĐ][a-zčćžšđ]{2,}$/;
      const RegExEmail = /^[\w.-]+@[\w.-]+\.(com|net|org|rs|edu\.rs|ict\.edu\.rs)$/;
      const RegExPhone = /^(06\d{7,8}|\+3816\d{6,8})$/;
      const RegExAddress = /^[A-Za-zčćžšđČĆŽŠĐ\s]+\d+$/;

      // Validacija imena
      if (!RegExImePrezime.test(this.firstName)) {
        this.errorMessage = "Invalid first name";
        return false;
      }

      // Validacija prezimena
      if (!RegExImePrezime.test(this.lastName)) {
        this.errorMessage = "Invalid last name";
        return false;
      }

      // Validacija emaila
      if (!RegExEmail.test(this.email)) {
        this.errorMessage = "Invalid email";
        return false;
      }

      // Validacija passworda
      if (this.password.length < 3) {
        this.errorMessage = "Invalid password (minimum 3 characters).";
        return false;
      }
      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Passwords do not match!";
        return false;
      }

      // Validacija telefona (ako je unet)
      if (this.phone && !RegExPhone.test(this.phone)) {
        this.errorMessage = "Invalid phone number (Phone number must start with 06 or +3816)";
        return false;
      }

      // Validacija adrese (ako je uneta)
      if (this.address && !RegExAddress.test(this.address)) {
        this.errorMessage = "Invalid Address";
        return false;
      }

      this.errorMessage = "";
      return true;
    },

    register() {
      if (!this.validateForm()) return;

      const users = JSON.parse(localStorage.getItem("users")) || []

      if (users.find(u => u.email === this.email)) {
        this.errorMessage = "User with this email already exists!"
        return
      }

      const newUser = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        phone: this.phone,
        address: this.address
      }

      users.push(newUser)
      localStorage.setItem("users", JSON.stringify(users))
      localStorage.setItem("currentUser", JSON.stringify(newUser))

      this.$router.push("/orders")
    }
  }
}
</script>