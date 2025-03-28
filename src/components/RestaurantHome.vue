<template>
  <div class="restaurant-home">
    <h1>Our Restaurants</h1>
    <div class="restaurant-list">
      <div
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        class="restaurant-item"
      >
        <!-- Clicking the image navigates to the corresponding menu page -->
        <RouterLink :to="{ name: 'menu', params: { id: restaurant.id } }">
          <img
            :src="restaurant.image"
            :alt="restaurant.name"
            class="restaurant-image"
          />
          <h2>{{ restaurant.name }}</h2>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const restaurants = ref([
  {
    id: 1,
    name: "Italian Bistro",
    image: "assets/italian-bistro.jpg" // Adjust the image path as needed
  },
  {
    id: 2,
    name: "Sushi House",
    image: "assets/sushi-house.jpg"
  },
  {
    id: 3,
    name: "Burger Joint",
    image: "assets/burger-joint.jpg"
  }
]);
</script>

<style scoped>
.restaurant-home {
  text-align: center;
  margin: 20px;
}
.restaurant-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}
.restaurant-item {
  width: 220px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
}
.restaurant-item:hover {
  transform: scale(1.05);
}
.restaurant-image {
  width: 100%;
  height: auto;
  display: block;
  border-bottom: 1px solid #ddd;
}
.restaurant-item h2 {
  margin: 10px 0;
  font-size: 1.1em;
}
</style>
