<template>
  <div class="userProfile">
    <h2>Edit profile</h2>
    <form class="userEdit" @submit.prevent="updateUser">
      <div class="userInfo">
        <label>First name</label>
        <input v-model="firstName" required />
      </div>
      <div class="userInfo">
        <label>Last name</label>
        <input v-model="lastName" />
      </div>
      <div class="userInfo">
        <label>Email</label>
        <input type="email" v-model="email" required />
      </div>
      <div class="userInfo">
        <label>Password</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Save</button>
    </form>
  </div>
</template>


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