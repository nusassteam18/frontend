<template>
  <div class="register-container">
    <h1>Register Account</h1>
    <form @submit.prevent="registerUser" class="register-form">
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input
          v-model="firstName"
          type="text"
          id="firstName"
          placeholder="Enter first name"
          required
        />
      </div>

      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input
          v-model="lastName"
          type="text"
          id="lastName"
          placeholder="Enter last name"
          required
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          v-model="email"
          type="email"
          id="email"
          placeholder="Enter email"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="password"
          type="password"
          id="password"
          placeholder="Enter password"
          required
        />
      </div>

      <button type="submit" class="register-button">Register</button>
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
        // let USER_URL = 'http://localhost:8080/users';
        const response = await fetch(this.API_GATEWAY_URL.concat('/users/register'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            role: 'Customer' 
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
    },
    goToResetPassword() {
    
      // this.$router.push('/forgot-password')
      alert('Forgot password clicked! (password reset function WIP)')
    }
  }
}
</script>

<style scoped>
/* Container styling */
.register-container {
  max-width: 500px;
  margin: 40px auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  padding: 20px;
  text-align: center;
}

.register-container h1 {
  margin-bottom: 20px;
  color: #2c3e50;
}

/* Form styling */
.register-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
  width: 80%;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
  color: #2c3e50;
}

.form-group input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

/* Register button */
.register-button {
  background-color: #28a745; 
  color: #fff;
  font-weight: bold;
  padding: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.register-button:hover {
  background-color: #218838;
}

</style>
