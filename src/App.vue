<template>
  <nav>
    <router-link to="/">Restaurant</router-link> |
    <router-link to="/menu">Menu</router-link> |
    <router-link to="/about">About</router-link> |

    <span v-if="!isLoggedIn">
      <router-link to="/register">Register</router-link> |
      <router-link to="/login">Login</router-link>
    </span>

    <span v-else>
      <router-link to="/profile">Profile</router-link> |
      <template v-if="userRole === 'Customer'">
        <router-link to="/orders">Orders</router-link> |
        <router-link to="/cart">Cart</router-link> |

      </template>
      <template v-else-if="userRole === 'Admin'">
        <router-link to="/admin">Admin</router-link> |
      </template>
      <button class="logout-btn" @click="logout">Logout</button>
    </span>
  </nav>
  <router-view />
</template>

<script>
import { authState, clearAuth } from '@/services/auth'

export default {
  name: 'App',
  setup() {
    return { authState }
  },
  computed: {
    isLoggedIn() {
      return !!this.authState.token
    },
    userRole() {
      return this.authState.role
    }
  },
  methods: {
    logout() {
      clearAuth()
      this.$router.push('/')
    }
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

/* Style the logout button to look like a link */
.logout-btn {
  background: none;
  border: none;
  color: #2c3e50;
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
  font-size: 1em;
}

.logout-btn:hover {
  color: #42b983;
}
</style>
