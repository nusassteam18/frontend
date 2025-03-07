<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/menu">Menu</router-link> |
    <router-link to="/cart">Cart</router-link> |
    <router-link to="/payment">Payment</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/admin">Admin</router-link> |
    
    <!-- If user is NOT logged in, show Register & Login links -->
    <span v-if="!isLoggedIn">
      <router-link to="/register">Register</router-link> |
      <router-link to="/login">Login</router-link>
    </span>
    
    <!-- If user IS logged in, show Logout button -->
    <span v-else>
      <button @click="logout">Logout</button>
    </span>
  </nav>

  <!-- Render the route's component (e.g., Home, Menu, Register, etc.) -->
  <router-view />
</template>

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
</style>
