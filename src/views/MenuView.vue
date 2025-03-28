<template>
  <div class="menu">
    <!-- Restaurant Information -->
    <div v-if="restaurant" class="restaurant-info">
      <h1>{{ restaurant.name }}</h1>
      <p class="restaurant-description">{{ restaurant.description }}</p>
      <p class="restaurant-address">{{ restaurant.address }}</p>
    </div>
    <div v-else>
      <h1>Food Menu</h1>
      <div v-if="!loading" class="restaurant-selector">
        <label for="restaurant-select">Select a Restaurant:</label>
        <select id="restaurant-select" v-model="selectedRestaurantId" @change="loadRestaurantMenu">
          <option v-for="rest in restaurants" :key="rest.restaurantId" :value="rest.restaurantId">{{ rest.name }}</option>
        </select>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading">Loading menu items...</div>

    <!-- Menu Items Grid -->
    <div v-else-if="products.length > 0" class="menu-items">
      <div v-for="item in products" :key="item.productId" class="menu-item">
        <img :src="item.imageId" :alt="item.name" class="item-image" />
        <div class="item-details">
          <h3>{{ item.name }}</h3>
          <p class="description">{{ item.description }}</p>
          <p class="price">${{ item.price.toFixed(2) }}</p>
          <button class="add-to-cart" @click="addToCart(item)">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    <div v-else class="no-items">
      <p>No menu items available for this restaurant. Please select another restaurant.</p>
    </div>

    <!-- Cart Preview -->
    <div class="cart-preview" v-if="cartItemsCount > 0">
      <router-link :to="cartLink" class="cart-button">
        View Cart ({{ cartItemsCount }} items - ${{ cartTotal.toFixed(2) }})
      </router-link>
    </div>
  </div>
</template>

<script>
import menuService from "@/services/menuService";
import restaurantService from "@/services/restaurantService";
import cartStore from "@/store/cart";
import { authState } from "@/services/auth";

export default {
  name: "MenuView",
  data() {
    return {
      products: [],
      loading: true,
      cartItems: [],
      restaurants: [],
      restaurant: null,
      selectedRestaurantId: null,
      cartVersion: 0,
    };
  },
  computed: {
    cartItemsCount() {
      this.cartVersion;
      console.log(this.selectedRestaurantId);
      return this.selectedRestaurantId 
        ? cartStore.getCartCount(this.selectedRestaurantId)
        : 0;
    },
    cartTotal() {
      this.cartVersion;
      return this.selectedRestaurantId 
        ? cartStore.getCartTotal(this.selectedRestaurantId)
        : 0;
    },
    cartLink() {
      return this.selectedRestaurantId 
        ? `/cart/${this.selectedRestaurantId}` 
        : '/cart';
    }
  },
  methods: {
    async fetchRestaurants() {
      try {
        this.restaurants = await restaurantService.getAllRestaurants();
        if (this.restaurants.length > 0 && !this.selectedRestaurantId) {
          this.selectedRestaurantId = this.restaurants[0].restaurantId;
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    },
    async loadRestaurantMenu() {
      if (!this.selectedRestaurantId) return;
      
      this.loading = true;
      try {
        // Fetch restaurant details
        this.restaurant = await restaurantService.getRestaurantById(this.selectedRestaurantId);
        
        // Fetch menu items for this restaurant
        this.products = await menuService.getMenuItemsByRestaurantId(this.selectedRestaurantId);
      } catch (error) {
        console.error("Error loading restaurant menu:", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchMenuItems() {
      this.loading = true;
      try {
        // If we have a restaurant ID from route parameters, use that
        const routeRestaurantId = this.$route.params.restaurantId;
        if (routeRestaurantId) {
          this.selectedRestaurantId = parseInt(routeRestaurantId, 10);
          await this.loadRestaurantMenu();
        } else if (this.selectedRestaurantId) {
          await this.loadRestaurantMenu();
        } else {
          // Fallback to all menu items
          this.products = await menuService.getAllMenuItems();
        }
      } catch (error) {
        console.error("Error fetching menu items:", error);
      } finally {
        this.loading = false;
      }
    },
    addToCart(item) {
      console.log("item: " + item.productId);
      console.log("item restaurant ID: " + item.restaurantId);
      // Check if user is logged in
      if (!authState.userId) {
        alert("Please log in to add items to your cart.");
        this.$router.push("/login");
        return;
      }
      
      // Add restaurant information to the item when adding to cart
      const itemWithRestaurant = {
        ...item,
        restaurantName: this.restaurant ? this.restaurant.name : "Unknown Restaurant"
      };
      
      // User is logged in, proceed with adding to cart
      cartStore.addToCart(itemWithRestaurant);
      this.cartVersion++;
      // this.$forceUpdate(); // Force update to refresh cart count

      // Show notification or feedback
      alert(`${item.name} added to your cart!`);
    },
    refreshCart() {
      if (this.selectedRestaurantId) {
        this.cartItems = cartStore.getCartItems(this.selectedRestaurantId);
      }
    },
  },
  watch: {
    // When route changes, refresh menu if restaurant ID is in the URL
    '$route.params.restaurantId': function(newId) {
      if (newId) {
        this.selectedRestaurantId = parseInt(newId, 10);
        this.loadRestaurantMenu();
      }
    },
    // When restaurant changes, refresh cart
    selectedRestaurantId: function() {
      this.refreshCart();
    },
  },
  async created() {
    await this.fetchRestaurants();
    await this.fetchMenuItems();
    this.refreshCart();
  },
};
</script>

<style scoped>
.menu {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 10px;
  color: #333;
}

.restaurant-info {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.restaurant-description {
  color: #555;
  margin-bottom: 10px;
}

.restaurant-address {
  color: #777;
  font-size: 0.9em;
}

.restaurant-selector {
  margin-bottom: 20px;
}

.restaurant-selector select {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-left: 10px;
  min-width: 200px;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
}

.no-items {
  text-align: center;
  padding: 40px;
  font-size: 16px;
  color: #666;
}

.menu-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.menu-item {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.menu-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.item-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.item-details {
  padding: 15px;
}

.item-details h3 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #333;
}

.description {
  color: #666;
  margin-bottom: 15px;
  min-height: 40px;
}

.price {
  font-weight: bold;
  color: #42b983;
  font-size: 18px;
  margin-bottom: 15px;
}

.add-to-cart {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  transition: background-color 0.3s;
}

.add-to-cart:hover {
  background-color: #3aa876;
}

.cart-preview {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #42b983;
  color: white;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.cart-button {
  color: white;
  text-decoration: none;
  font-weight: bold;
}
</style>