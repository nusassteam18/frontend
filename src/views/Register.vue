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

      <div class="form-group">
        <label for="contactNo">Contact No</label>
        <input
          v-model="contactNo"
          type="contactNo"
          id="contactNo"
          placeholder="Enter contact no"
          required
        />
      </div>

      <div class="form-group">
        <label for="creditCardExpiryDate">Credit Card Expiry Date</label>
        <input
          v-model="creditCardExpiryDate"
          type="creditCardExpiryDate"
          id="creditCardExpiryDate"
          placeholder="Enter credit card expiry date"
          required
        />
      </div>

      <div class="form-group">
        <label for="creditCardName">Credit Card Name</label>
        <input
          v-model="creditCardName"
          type="creditCardName"
          id="creditCardName"
          placeholder="Enter credit card name"
          required
        />
      </div>
      <div class="form-group">
        <label for="creditCardNo">Credit Card No</label>
        <input
          v-model="creditCardNo"
          type="creditCardNo"
          id="creditCardNo"
          placeholder="Enter credit card no"
          required
        />
      </div>

      <div class="form-group">
        <label for="creditCardSecurityCode">Credit Card Security Code</label>
        <input
          v-model="creditCardSecurityCode"
          type="creditCardSecurityCode"
          id="creditCardSecurityCode"
          placeholder="Enter credit card security code"
          required
        />
      </div>

      <div class="form-group">
        <label for="homeAddress">Home Address</label>
        <input
          v-model="homeAddress"
          type="homeAddress"
          id="homeAddress"
          placeholder="Enter home address"
          required
        />
      </div>

      <button type="submit" class="register-button">Register</button>
    </form>


  </div>
</template>

<script>
import { constants } from '../../constants.js'

export default {
  name: 'Register',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      contactNo: '',
      creditCardExpiryDate: '',
      creditCardName: '',
      creditCardNo: '',
      creditCardSecurityCode: '',
      homeAddress: ''
    }
  },
  methods: {
    async registerUser() {
      try {
        // let USER_URL = 'http://localhost:8080/users';
        const response = await fetch(constants.API_GATEWAY_URL.concat('/users/customers/register'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            role: 'C',
            contactNo: this.contactNo,
            creditCardExpiryDate: this.creditCardExpiryDate,
            creditCardName: this.creditCardName,
            creditCardNo: this.creditCardNo,
            creditCardSecurityCode: this.creditCardSecurityCode,
            homeAddress: this.homeAddress
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
