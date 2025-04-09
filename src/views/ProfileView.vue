

<template>
  <div class="profile-container">
    <h2 class="profile-title">User Profile</h2>

    <div class="profile-card">
      <!-- Basic User Info (excluding role) -->
      <div class="profile-field">
        <label>Email:</label>
        <span>{{ user.email || 'Not Provided' }}</span>
      </div>
      <div class="profile-field">
        <label>First Name:</label>
        <span>{{ user.firstName || '' }}</span>
      </div>
      <div class="profile-field">
        <label>Last Name:</label>
        <span>{{ user.lastName || '' }}</span>
      </div>

      <!-- If the user is a Customer, show Customer fields -->
      <div v-if="user.role === 'C'">
        <div class="profile-field">
          <label>Contact No:</label>
          <span>{{ customer.contactNo || '' }}</span>
        </div>
        <div class="profile-field">
          <label>Credit Card No:</label>
          <span>{{ customer.creditCardNo || '' }}</span>
        </div>
        <div class="profile-field">
          <label>Credit Card Name:</label>
          <span>{{ customer.creditCardName || '' }}</span>
        </div>
        <div class="profile-field">
          <label>Credit Card Expiry Date:</label>
          <span>{{ customer.creditCardExpiryDate || '' }}</span>
        </div>
        <div class="profile-field">
          <label>Credit Card Security Code:</label>
          <span>{{ customer.creditCardSecurityCode || '' }}</span>
        </div>
        <div class="profile-field">
          <label>Home Address:</label>
          <span>{{ customer.homeAddress || '' }}</span>
        </div>
      </div>

      <!-- If the user is an Admin, show Admin fields -->
      <div v-else-if="user.role === 'Admin'">
        <div class="profile-field">
          <label>Restaurant ID:</label>
          <span>{{ admin.restaurantId || '' }}</span>
        </div>
      </div>
    </div>

    <!-- Update Profile Button -->
    <button class="update-btn" @click="goToUpdateProfile">
      Update User Information
    </button>
  </div>
</template>

<script>
import { constants } from '../../constants.js'

export default {
  name: 'ProfileView',
  data() {
    return {
      user: {},      // base user info
      customer: {},  // customer-specific info
      admin: {}      // admin-specific info
    }
  },
 async mounted() {
  try {
    const userId = localStorage.getItem('userId')
    console.log('LocalStorage userId:', userId)

    if (!userId) {
      alert('No user logged in. Redirecting to home...')
      return this.$router.push('/')
    }

    //console.log('Fetching user from:', `http://localhost:3000/api/users/${userId}`)
    let response = await fetch(constants.API_GATEWAY_URL.concat(`/users/${userId}`))
    console.log('User fetch status:', response.status)
    if (!response.ok) throw new Error('Failed to fetch user data')
    this.user = await response.json()
    console.log('Fetched user:', this.user)

    if (this.user.role === 'C') {
      console.log('Fetching customer info...')
      response = await fetch(constants.API_GATEWAY_URL.concat(`/users/customers/${userId}`))
      console.log('Customer fetch status:', response.status)
      if (response.ok) {
        this.customer = await response.json()
        console.log('Fetched customer:', this.customer)
      }
    } else if (this.user.role === 'Admin') {
      console.log('Fetching admin info...')
      response = await fetch(constants.API_GATEWAY_URL.concat(`/admins/${userId}`))
      console.log('Admin fetch status:', response.status)
      if (response.ok) {
        this.admin = await response.json()
        console.log('Fetched admin:', this.admin)
      }
    }
  } catch (error) {
    console.error('Error loading profile:', error)
    alert('Could not load profile information.')
  }
}
,
  methods: {
    goToUpdateProfile() {
      this.$router.push('/updateProfile')
    }
  }
}
</script>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 40px 0;
}

.profile-title {
  margin-bottom: 30px;
  color: #2c3e50;
}

.profile-card {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  width: 350px;
  box-shadow: 4px 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

/* Updated styling for alignment */
.profile-field {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.profile-field label {
  font-weight: bold;
  color: #2c3e50;
  margin-right: 10px;
  width: 120px; /* fixed width for labels to align them uniformly */
}

.profile-field span {
  color: #2c3e50;
  flex: 1; /* takes up the remaining space */
}

.update-btn {
  background-color: #42b983; 
  color: #fff;
  font-weight: bold;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.update-btn:hover {
  background-color: #3aa876;
}

</style>
