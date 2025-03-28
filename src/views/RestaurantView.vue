<script setup>
import 'bootstrap/dist/css/bootstrap.css' 
import StarRating from 'vue-star-rating'
import { defineComponent, onMounted, reactive, watch } from 'vue'
import restaurantService from '@/services/restaurantService';

defineComponent({
  component: StarRating
});

const state = reactive({
  restaurant: [],
  isLoading: true,
});

const calculateStar = (rating) => {
  if (!rating) {
    return 0;
  }
  return rating;
}

const fetchRestaurant = async () => {
  state.isLoading = true;

  try {
    state.restaurant = await restaurantService.getRestaurant();
  } catch (error) {
    console.error("Error fetching restaurant!", error);
  } finally {
    state.isLoading = false;
  }
};

onMounted(fetchRestaurant);
</script>

<template>
  <div v-if="state.isLoading">Loading...</div>

  <div v-else class="container">
    <div class="row">
      <div class="col-md-12 box-grey">
        <h1 class="restaurant-name">{{ state.restaurant.name }}</h1>
        <p class="restaurant-description">{{ state.restaurant.description }}</p>
        <p class="restaurant-address">{{ state.restaurant.address }}</p>
      </div>
    </div>
    
    <div class="row">
      <div class="col-md-12 box-grey">
        <p class="fs-3 mb-0">{{ state.restaurant.averageScore }}</p>
        <star-rating  
          :rating="calculateStar(state.restaurant.averageScore)" 
          :read-only="true"
          :fixed-points="1"
          :increment="0.01"
          :show-rating="false"
          :star-size="25">
        </star-rating>
        <p class="font-lighter mt-3 mb-0">Number of Rating: {{ state.restaurant.rateCount }}</p>
      </div>
    </div>
  </div>
</template>


<style scoped>
.box-grey {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.restaurant-name {
  margin-bottom: 10px;
  color: #333;
}

.restaurant-description {
  color: #555;
  margin-bottom: 10px;
}

.restaurant-address {
  color: #777;
  font-size: 0.9em;
}

.vue-star-rating {
  justify-content: center;
}
</style>
