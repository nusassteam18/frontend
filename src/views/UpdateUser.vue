<template>
  <div class="userProfile">
    <h2>Edit profile</h2>
    <form class="userEdit" @submit.prevent="update">
      <div class="userInfo">
        <label>First name</label>
        <input v-model="user.firstName" required />
      </div>
      <div class="userInfo">
        <label>Last name</label>
        <input v-model="user.lastName" />
      </div>
      <div class="userInfo">
        <label>Email</label>
        <input type="email" v-model="user.email" required/>
      </div>

      <div v-if="user.role === 'C'">
        <div class="userInfo">
          <label>Contact Number</label>
          <input v-model="user.contactNo"/>
        </div>
        <div class="userInfo">
          <label>Credit Card No</label>
          <input v-model="user.creditCardNo"/>
        </div>
        <div class="userInfo">
          <label>Credit Card Name</label>
          <input v-model="user.creditCardName"/>
        </div>
        <div class="userInfo">
          <label>Credit Card Expiry Date</label>
          <input v-model="user.creditCardExpiryDate"/>
        </div>
        <div class="userInfo">
          <label>Credit Card Expiry Security Code</label>
          <input v-model="user.creditCardSecurityCode"/>
        </div>
        <div class="userInfo">
          <label>Home Address</label>
          <input v-model="user.homeAddress" required />
        </div>
      </div>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
import { constants } from '../../constants.js'

export default {
  data() {
    return {
      user: {}
    };
  },
  async mounted() {
     try {
        const id = localStorage.getItem('userId');
        const res = await fetch(constants.API_GATEWAY_URL.concat(`/users/${id}`));
        if (!res.ok) throw new Error('Failed to obtain profile');
        this.user = await res.json();
    } catch(e) {
        console.error(e);
    }
  },
  methods: {
    async update(){
      try{
        if(this.user.role === "C"){
          const res = await fetch(constants.API_GATEWAY_URL.concat(`/users/customer/${this.user.userId}`),{
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(this.user),
          });
          if (res.ok) {
            const user = await res.json();
            alert('Updated successfully');
          } else {
            throw new Error('Failed to update');
          }
        }
        else {
          const res = await fetch(constants.API_GATEWAY_URL.concat(`/users/admin/${this.user.id}`),{
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(this.user),
          });
          if(res.ok){
            const ad = await res.json();
            alert('Updated successful')
          } else {
            throw new Error('Failed');
          }
        }
      } catch (e) {
         console.error('Failed update:', e);
      }
    }
  }
};
</script>

<style scoped>
.userProfile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  max-width: 400px;
  margin: 50px auto;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  background: #f9f9f9;
  border-radius: 10px;
}


.userInfo{
  gap: 15px;
  display: grid;
  grid-template-columns: 120px 1fr; /* 120px for label, input takes the rest */
  align-items: center;
  margin-bottom: 15px;
}

input {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 7px;
  font-size: 14px;
}

label {
  color: #000;
  text-align: left;
  font-weight: bold;
}

.userEdit {
  display: flex;
  flex-direction: column; /* Stack form elements vertically */
  align-items: center; /* Center the form elements */
  width: 100%;
  max-width: 400px; /* Limit the width of the form */
}

button {
  background-color: #42b983; 
  color: #fff;
  font-weight: bold;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3aa876;
}
h2 {
  color: #000;
  margin-bottom: 30px;
}

</style>