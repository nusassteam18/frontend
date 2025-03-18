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

      <div v-if="user.role === 'Customer'">
        <div class="userInfo">
          <label>Contact Number</label>
          <input v-model="customer.contactNo"/>
        </div>
        <div class="userInfo">
          <label>Credit Card No</label>
          <input v-model="customer.creditCardNo"/>
        </div>
        <div class="userInfo">
          <label>Credit Card Name</label>
          <input v-model="customer.creditCardName"/>
        </div>
        <div class="userInfo">
          <label>Credit Card Expiry Date</label>
          <input type="date" v-model="customer.creditCardExpiryDate"/>
        </div>
        <div class="userInfo">
          <label>Credit Card Expiry Security Code</label>
          <input v-model="customer.creditCardSecurityCode"/>
        </div>
        <div class="userInfo">
          <label>Home Address</label>
          <input v-model="customer.homeAddress" required />
        </div>
      </div>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      user: {},
      customer: {},
      admin: {}
    };
  },
  async mounted() {
     try {
        const id = localStorage.getItem('userId');
        const res = await fetch(`http://localhost:3000/api/users/${id}`);
        if (!res.ok) throw new Error('Failed to obtain profile');
        this.user = await res.json();
        if(this.user.role === 'Customer'){
            const resp = await fetch(`http://localhost:3000/api/customers/${id}`);
            if (!resp.ok) throw new Error('Failed to obtain profile');
            const cus = await resp.json();
            let date = new Date(cus.creditCardExpiryDate);
            date.setMinutes(date.getMinutes()-date.getTimezoneOffset());
            this.customer = { contactNo: cus.contactNo, creditCardNo: cus.creditCardNo,
            creditCardName: cus.creditCardName, creditCardExpiryDate: date.toISOString().split('T')[0],
            creditCardSecurityCode: cus.creditCardSecurityCode, homeAddress: cus.homeAddress}
        }
        if(this.user.role === 'Admin'){
            const resp = await fetch(`http://localhost:3000/api/admins/${id}`);
            if (!resp.ok) throw new Error('Failed to obtain profile');
            this.admin = await resp.json();
        }
    } catch(e) {
        console.error(e);
    }
  },
  methods: {
    async update(){
      try{
        const res = await fetch(`http://localhost:3000/api/users/${this.user.id}`,{
          method: 'PUT',
          headers: {'Content-Type':'application/json',},
          body: JSON.stringify(this.user),
        });
        if (res.ok) {
          const user = await res.json();
          console.log('Updated successfully:', user);
        } else {
          throw new Error('Failed to update');
        }
        if (this.user.role === 'Customer') {
          const resp = await fetch(`http://localhost:3000/api/customers/${this.user.id}`)
          if(resp.ok){
            const cus = await resp.json();

            if(Object.keys(cus).length===0){
              const res = await fetch(`http://localhost:3000/api/customers/${this.user.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',},
                body: JSON.stringify(this.customer),
              });
              if (res.ok) {
                const user = await res.json();
                alert('Updated successful')
              } else {
                throw new Error('Failed');
              }
            } else {
                const res = await fetch(`http://localhost:3000/api/customers/${this.user.id}`, {
                   method: 'PUT',
                   headers: { 'Content-Type': 'application/json',},
                   body: JSON.stringify(this.customer),
                });
                if (res.ok) {
                  const customer = await res.json();
                  alert('Updated successful')
                } else {
                  throw new Error('Failed');
                }
            }
          }
        }

        if(this.user.role === 'Admin'){
          const resp = await fetch(`http://localhost:3000/api/customers/${this.user.id}`)
          const data = await resp.json();
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
  display: block; /* Makes the button a block-level element */
  width: 100%; /* Makes the button take full width */
  max-width: 200px;
  font-size: 15px;
  margin-top: 20px;
  background-color: #90ee90;
}

h2 {
  color: #000;
}

</style>