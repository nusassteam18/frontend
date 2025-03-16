<template>
  <div class="restaurant-list">
    <h2>Our Restaurants</h2>
    
    <div v-if="loading" class="loading">Loading restaurants...</div>
    
    <div v-else class="restaurants-grid">
      <div v-for="restaurant in restaurants" :key="restaurant.id" class="restaurant-card">
        <img v-if="restaurant.image" :src="restaurant.image" :alt="restaurant.name" class="restaurant-image">
        <div v-else class="restaurant-image placeholder-image">{{ restaurant.name.charAt(0) }}</div>
        
        <div class="restaurant-details">
          <h3>{{ restaurant.name }}</h3>
          <p class="description">{{ restaurant.description }}</p>
            <StarRating 
            :rating="calculateStar(restaurant.rating)" 
            :read-only="true"
            :fixed-points="1"
            :increment="0.01"
            :star-size="25">
          </StarRating>
        <p class="text-rating-total">({{ restaurant.rateCount }})</p>
          <router-link :to="`/restaurant/${restaurant.id}/menu`" class="view-menu-btn">
            View Menu
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import restaurantService from '@/services/restaurantService';
import StarRating from 'vue-star-rating'

export default defineComponent({
  name: 'RestaurantList',
  components: {
    StarRating,
  },
  data() {
    return {
      restaurants: [],
      loading: true
    };
  },
  methods: {
    async fetchRestaurants() {
      this.loading = true;
      try {
        this.restaurants = await restaurantService.getAllRestaurants();
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        this.loading = false;
      }
    },
    calculateStar(rating){
      if (!rating) {
        return 0;
      }
      return rating;
    }
  },
  created() {
    this.fetchRestaurants();
  }
});
</script>

<style scoped>
.restaurant-list {
  margin-bottom: 30px;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #666;
}

.restaurants-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.restaurant-card {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.restaurant-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.restaurant-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.placeholder-image {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  color: #888;
  font-size: 3rem;
  font-weight: bold;
}

.restaurant-details {
  padding: 15px;
}

.restaurant-details h3 {
  margin-top: 0;
  margin-bottom: 5px;
  color: #333;
}

.description {
  color: #666;
  margin-bottom: 15px;
  font-size: 0.9em;
}

.view-menu-btn {
  display: inline-block;
  background-color: #42b983;
  color: white;
  padding: 8px 15px;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.view-menu-btn:hover {
  background-color: #3aa876;
}

.vue-star-rating {
  justify-content: center;
}

.text-rating-total {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 12px;
}
</style>