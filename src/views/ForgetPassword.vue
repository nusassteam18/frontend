<template>
  <div class="forgotPassword">
    <h2>Forgot Password</h2>
    <form @submit.prevent="chnPass">
      <div class="changePassword">
        <label for="email">Email</label>
        <input type="email" v-model="user.email" id="email" required placeholder="Enter Email"/>
      </div>
      <button type="submit">Reset Password</button>
      <div v-if="userExist" class="userExist">{{userExist}}</div>
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      user: {},
      userExist: ''
    };
  },
  methods: {
    async chnPass() {
      try {
        this.userExist = '';
        const res = await fetch(this.API_GATEWAY_URL.concat('/users/forgotPass'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.user.email
          })
        })

        if(res.ok){
          this.userExist = 'Password reset has been send to your email';
        }
        else if(res.status === 404){
          this.userExist = 'Email does not exist';
        }
      } catch (err) {
          console.error('Failed:', err);
      }
    },
  },
};

</script>

<style>
.forgotPassword {
  max-width: 400px;
  margin: 50px auto;
  text-align: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
}

.changePassword {
  flex-direction: column;
  margin-bottom: 20px;
  align-items: flex-start;
  display: flex;
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
  margin-bottom: 8px;
}

button {
  background-color: #42b983;
  color: #fff;
  font-weight: bold;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
}

.userExist {
  color: red;
  font-weight: bold;
}

h2 {
  color: #000;
  margin-bottom: 20px;
}

</style>