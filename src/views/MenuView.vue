<template>
  <div class="menu">
    <h1>Food Menu</h1>

    <!-- Loading State -->
    <div v-if="loading" class="loading">Loading menu items...</div>

    <!-- Menu Items Grid -->
    <div v-else class="menu-items">
      <div v-for="item in menuItems" :key="item.id" class="menu-item">
        <img :src="item.image" :alt="item.name" class="item-image" />
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

    <!-- Cart Preview -->
    <div class="cart-preview" v-if="cartItemsCount > 0">
      <router-link to="/cart" class="cart-button">
        View Cart ({{ cartItemsCount }} items - ${{ cartTotal.toFixed(2) }})
      </router-link>
    </div>
  </div>
</template>

<script>
import menuService from "@/services/menuService";
import cartStore from "@/store/cart";

export default {
  name: "MenuView",
  data() {
    return {
      menuItems: [],
      loading: true,
      cartItems: [],
    };
  },
  computed: {
    cartItemsCount() {
      return cartStore.getCartCount();
    },
    cartTotal() {
      return cartStore.getCartTotal();
    },
  },
  methods: {
    async fetchMenuItems() {
      this.loading = true;
      try {
        this.menuItems = await menuService.getAllMenuItems();
      } catch (error) {
        console.error("Error fetching menu items:", error);
      } finally {
        this.loading = false;
      }
    },
    addToCart(item) {
      cartStore.addToCart(item);
      this.$forceUpdate(); // Force update to refresh cart count

      // Show notification or feedback
      alert(`${item.name} added to your cart!`);
    },
    refreshCart() {
      this.cartItems = cartStore.getCartItems();
    },
  },
  created() {
    this.fetchMenuItems();
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
  margin-bottom: 30px;
  color: #333;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 18px;
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
