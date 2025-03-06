<template>
  <div class="restaurant-menu">
    <h1>{{ restaurant.name }} Menu</h1>
    <!-- Detailed menu items can be rendered here -->
    <p>Menu details will go here.</p>
    <RouterLink to="/">Back to Home</RouterLink>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const restaurant = ref({});

onMounted(() => {
  const restaurantId = route.params.id;
  // Static sample data; replace with an API call as needed.
  const restaurants = {
    1: { id: 1, name: "Italian Bistro" },
    2: { id: 2, name: "Sushi House" },
    3: { id: 3, name: "Burger Joint" }
  };
  restaurant.value = restaurants[restaurantId] || { name: "Unknown Restaurant" };
});
</script>

<style scoped>
.restaurant-menu {
  text-align: center;
  margin: 20px;
}
</style>
