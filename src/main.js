import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 1. Assign app to a variable
let app = createApp(App)

// 2. Assign the global variable before mounting
app.config.globalProperties.API_GATEWAY_URL = 'http://localhost:8080'

// 3. Use router and mount app
app.use(router).mount('#app')