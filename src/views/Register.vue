<template>
  <div class="register-container">
    <h1>Register</h1>
    <form @submit.prevent="registerUser">
      <div>
        <label for="firstName">First Name</label>
        <input 
          v-model="firstName" 
          type="text" 
          id="firstName" 
          placeholder="Enter first name"
          required
        />
      </div>

      <div>
        <label for="lastName">Last Name</label>
        <input 
          v-model="lastName" 
          type="text" 
          id="lastName" 
          placeholder="Enter last name"
          required
        />
      </div>

      <div>
        <label for="email">Email</label>
        <input 
          v-model="email" 
          type="email" 
          id="email" 
          placeholder="Enter email"
          required
        />
      </div>

      <div>
        <label for="password">Password</label>
        <input 
          v-model="password" 
          type="password" 
          id="password" 
          placeholder="Enter password"
          required
        />
      </div>

      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }
  },

methods: {
  async registerUser() {
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          role: 'Customer' // or let the server default to Customer
        })
      })

      if (response.ok) {
        alert('Registration successful! Please log in.')
        this.$router.push('/login')
      } else {
        const errorData = await response.json()
        alert('Registration failed: ' + errorData.message)
      }
    } catch (error) {
      console.error('Registration error:', error)
      alert('An error occurred during registration.')
    }
  }
}

}
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  text-align: left;
}

form > div {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}

button {
  padding: 8px 16px;
  cursor: pointer;
}
</style>
