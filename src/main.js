import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'



const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

function ensureDefaultAdmin() {
  const users = JSON.parse(localStorage.getItem('users')) || []
  const hasAdmin = users.some(u => u.role === 'admin')
  if (!hasAdmin) {
    users.push({
      firstName: 'Admin',
      email: 'admin@gmail.com',
      password: '1234',   // lozinka za test
      role: 'admin'
    })
    localStorage.setItem('users', JSON.stringify(users))
    console.log('✅ Default admin user created: admin@gmail.com / 1234')
  }
}

ensureDefaultAdmin()