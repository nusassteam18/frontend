<template>
  <nav>

    <span v-if="!isLoggedIn">
      <router-link to="/">Restaurant</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/login">Login</router-link>
    </span>

    <span v-else>
      <template v-if="userRole === 'C'">
        <router-link to="/">Restaurant</router-link> | </template>
      <router-link to="/profile">Profile</router-link> |
      <router-link to="/updateProfile">Update Profile</router-link> |
      <template v-if="userRole === 'C'">
        <router-link to="/rate">Rate</router-link> |
    

      </template>
      <template v-else-if="userRole === 'A'">
        <router-link to="/admin">Admin</router-link> |
        <router-link to="/restaurant/report">Report</router-link> |
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
      return !!this.authState.userId
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
