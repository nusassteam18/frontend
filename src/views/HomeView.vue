<template>
  <div class="home">
    <div class="hero">
      <div class="hero-content">
        <h1>The Seasoned Spoon 2</h1>
        <p>Choose from a variety of restaurants to order from and fulfill your cravings.</p>
      </div>
    </div>
    
    <div class="content">
      <RestaurantList />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import RestaurantList from '@/components/RestaurantList.vue'

export default {
  name: 'HomeView',
  components: {
    RestaurantList
  }
}
</script>

<style scoped>
.home {
  width: 100%;
}

.hero {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80');
  background-size: cover;
  background-position: center;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  margin-bottom: 40px;
}

.hero-content {
  max-width: 700px;
  padding: 0 20px;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 30px;
}

.browse-btn {
  display: inline-block;
  background-color: #42b983;
  color: white;
  padding: 12px 25px;
  border-radius: 30px;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s;
}

.browse-btn:hover {
  background-color: #3aa876;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>