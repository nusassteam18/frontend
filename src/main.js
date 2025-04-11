import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faStar as faStarSolid, faThumbsUp, faHeart } from '@fortawesome/free-solid-svg-icons'

library.add(faStarSolid,faThumbsUp, faHeart);

// 1. Assign app to a variable
let app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);

// 3. Use router and mount app
app.use(router).mount('#app')