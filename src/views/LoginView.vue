<template>
    <div class="login">
      <div class="r-name">
        <div>The</div>
        <div>Seasoned</div>
        <div>Spoon</div>
      </div>
      <div class="login-user">
        <h2 class="welcome-txt">Welcome Back</h2>
        <form name="login-form" >
          <div class="input-user">
            <label for="email">Email </label>
            <input id="email" type="text" />
          </div>
          <div class="input-user">
            <label for="password">Password </label>
            <input id="password" type="password" />
          </div>
          <div class="button-sub">
            <button class="btn" type="submit">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
</template>

<style scoped>

.login {
  align-items: center;
  height: 100vh;
  justify-content: center;
  display: flex;
  position: relative;
  background-color: #ffa500;
}

.login-user {
  background-color: #c8e6c9;
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

button {
  margin-top: 25px;
  width: 25%;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
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
  font-weight: bold;
  letter-spacing: 2px;
  margin-right: 900px;
  white-space: pre-wrap;
}


</style>