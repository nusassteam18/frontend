<template>
  <div class="login">
    <div class="r-name">
      <div>The</div>
      <div>Seasoned</div>
      <div>Spoon</div>
    </div>

    <div class="login-user">
      <h2 class="welcome-txt">Welcome Back</h2>
      
      <!-- Use @submit.prevent to handle the form submission with Vue -->
      <form name="login-form" @submit.prevent="loginUser">
        <div class="input-user">
          <label for="email">Email </label>
          <input
            id="email"
            v-model="email"
            type="text"
            placeholder="Enter your email"
          />
        </div>

        <div class="input-user">
          <label for="password">Password </label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <div class="button-sub">
          <button class="btn" type="submit">
            Sign In
          </button>
        </div>
      </form>

      <!-- Forgot Password Button -->
      <div class="forgot-password">
        <button type="button" class="forgot-btn" @click="goToForgotPassword">
          Forgot Password?
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { constants } from '../../constants.js'

// Import the setAuth helper from your auth module.
import { setAuth } from '@/services/auth'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async loginUser() {
  try {
    const response = await fetch(constants.API_GATEWAY_URL.concat('/users/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.email,
        password: this.password
      })
    }).then(res => {
    if (res.ok) {
      return res
    } else if(res.status === 404) {
      return Promise.reject(404)
    } else {
      return Promise.reject(res)
    }
  })

  const data = await response.json()
  console.log('Login response data:', data)

  
  const role = data.role
  // Check for userId: use data.user.userId if present, otherwise use data.user.id
  const userId = data.userId || data.id
  const restaurantId = data.restaurantId
  const firstName = data.firstName
  const lastName = data.lastName
  const email = data.email
  const password = data.password
  const contactNo = data.contactNo
  const creditCardNo = data.creditCardNo
  const creditCardName = data.creditCardName
  const creditCardExpiryDate = data.creditCardExpiryDate
  const creditCardSecurityCode = data.creditCardSecurityCode
  const homeAddress = data.homeAddress
  const restaurantName = data.restaurantName
  console.log('Extracted userId:', userId)

  if (userId) {
    // setAuth(data.token, 'Customer', userId)
    // console.log('After setAuth: authToken =', localStorage.getItem('authToken'))
    setAuth(role, userId, restaurantId, firstName, lastName, email, password, contactNo, creditCardNo, creditCardName, creditCardExpiryDate, creditCardSecurityCode, homeAddress, restaurantName)
    // console.log('After setAuth: userRole =', localStorage.getItem('userRole'))
    // console.log('After setAuth: userId =', localStorage.getItem('userId'))
  } else {
    console.error('UserId is missing in response.')
    alert('Login failed: Invalid user.')
    return
  }

  if (role == 'A') {
    alert(`Login successful. You are logged in as an admin${restaurantName == 'undefined' ? '' : ' for ' + restaurantName}.`)
    this.$router.push('/admin')
  }
    
  else {
    alert(`Login successful. Welcome ${firstName} ${lastName}!`)
    this.$router.push('/')
  }

  } catch (error) {
    if (error === 404) {
      alert(`Login failed: Invalid credentials`)
    } else {
      console.error('Login error:', error)
      alert('An error occurred during login.')
    }
  }
},
    goToForgotPassword() {
      this.$router.push('/forgot-password')
    }
  }
}
</script>

<style scoped>
.login {
  align-items: center;
  height: 100vh;
  justify-content: center;
  display: flex;
  position: relative;
  background-color: #ffa500; /* Orange background */
}
.login-user {
  background-color: #c8e6c9; /* Light green background */
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 4px 2px 5px rgba(0, 0, 0, 0.1);
}
.input-user {
  margin-bottom: 15px;
  text-align: left;
  align-items: flex-start;
}
.button-sub {
  display: block;
  margin-top: 10px;
}
button.btn {
  margin-top: 25px;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  background-color: #2e7d32; /* A darker green for the button */
  color: #fff;
  border: none;
  cursor: pointer;
}
button.btn:hover {
  background-color: #1b5e20; /* Even darker on hover */
}
.input-user label {
  font-size: 15px;
  display: block;
  font-weight: bold;
  line-height: 1.4;
  margin-bottom: 5px;
}
.input-user input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 15px;
  box-sizing: border-box;
}
h2 {
  text-align: center;
  margin-bottom: 40px;
}
.r-name {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-weight: bold;
  font-family: 'Pacifico', cursive;
  position: absolute;
  transform: translateY(-50%);
  font-size: 3rem;
  letter-spacing: 2px;
  margin-right: 900px;
  white-space: pre-wrap;
}
.forgot-password {
  margin-top: 15px;
  text-align: center;
}
.forgot-btn {
  background: none;
  border: none;
  color: #2e7d32;
  font-size: 0.9em;
  text-decoration: underline;
  cursor: pointer;
}
.forgot-btn:hover {
  color: #1b5e20;
}
</style>
