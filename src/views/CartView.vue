<template>
  <div class="cart">
    <h1>Your Cart</h1>

    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>Your cart is empty.</p>
      <router-link to="/menu" class="continue-shopping"
        >Continue Shopping</router-link
      >
    </div>

    <div v-else class="cart-content">
      <!-- Cart Items -->
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.name" class="item-image" />
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p class="price">${{ item.price.toFixed(2) }}</p>
          </div>
          <div class="item-quantity">
            <button @click="decrementQuantity(item)" class="quantity-btn">
              -
            </button>
            <input
              type="number"
              v-model.number="item.quantity"
              min="1"
              @change="updateQuantity(item)"
              class="quantity-input"
            />
            <button @click="incrementQuantity(item)" class="quantity-btn">
              +
            </button>
          </div>
          <div class="item-total">
            ${{ (item.price * item.quantity).toFixed(2) }}
          </div>
          <button @click="removeItem(item.id)" class="remove-btn">
            &times;
          </button>
        </div>
      </div>

      <!-- Cart Summary -->
      <div class="cart-summary">
        <h2>Order Summary</h2>
        <div class="summary-row">
          <span>Subtotal ({{ totalItems }} items)</span>
          <span>${{ subtotal.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Delivery Fee</span>
          <span>${{ deliveryFee.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Tax</span>
          <span>${{ tax.toFixed(2) }}</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>${{ total.toFixed(2) }}</span>
        </div>

        <button @click="checkout" class="checkout-btn">
          Proceed to Checkout
        </button>

        <router-link to="/menu" class="continue-shopping">
          Continue Shopping
        </router-link>

        <button @click="clearCart" class="clear-cart">Clear Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import cartStore from "@/store/cart";

export default {
  name: "CartView",
  data() {
    return {
      cartItems: [],
      deliveryFee: 0.0,
      taxRate: 0.0, // 0% tax
    };
  },
  computed: {
    totalItems() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
    subtotal() {
      return this.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    tax() {
      return this.subtotal * this.taxRate;
    },
    total() {
      return this.subtotal + this.tax + this.deliveryFee;
    },
  },
  methods: {
    loadCart() {
      this.cartItems = cartStore.getCartItems();
    },
    updateQuantity(item) {
      if (item.quantity < 1) {
        item.quantity = 1;
      }
      cartStore.updateCartItemQuantity(item.id, item.quantity);
      this.loadCart();
    },
    incrementQuantity(item) {
      cartStore.updateCartItemQuantity(item.id, item.quantity + 1);
      this.loadCart();
    },
    decrementQuantity(item) {
      if (item.quantity > 1) {
        cartStore.updateCartItemQuantity(item.id, item.quantity - 1);
        this.loadCart();
      }
    },
    removeItem(itemId) {
      cartStore.removeFromCart(itemId);
      this.loadCart();
    },
    clearCart() {
      if (confirm("Are you sure you want to clear your cart?")) {
        cartStore.clearCart();
        this.loadCart();
      }
    },
    checkout() {
      // In a real app, this would redirect to a checkout page or process
      //cartStore.clearCart();
      this.$router.push("/payment");
    },
  },
  created() {
    this.loadCart();
  },
};
</script>

<style scoped>
.cart {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 30px;
  color: #333;
}

.empty-cart {
  text-align: center;
  padding: 50px 0;
}

.empty-cart p {
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

.cart-items {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}

.cart-item {
  display: grid;
  grid-template-columns: 100px 1fr 150px 100px 40px;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.item-details {
  padding: 0 15px;
}

.item-details h3 {
  margin-top: 0;
  margin-bottom: 5px;
  font-size: 16px;
}

.price {
  color: #666;
}

.item-quantity {
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.quantity-input {
  width: 40px;
  height: 30px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 0 5px;
}

.item-total {
  font-weight: bold;
  text-align: right;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: #999;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  color: #ff4d4d;
}

.cart-summary {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  position: sticky;
  top: 20px;
}

.cart-summary h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
  font-size: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  color: #666;
}

.summary-row.total {
  font-weight: bold;
  font-size: 18px;
  color: #333;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #ddd;
}

.checkout-btn {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.checkout-btn:hover {
  background-color: #3aa876;
}

.continue-shopping {
  display: inline-block;
  margin-top: 20px;
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
}

.clear-cart {
  background: none;
  border: none;
  color: #ff4d4d;
  cursor: pointer;
  margin-top: 20px;
  padding: 0;
  font-size: 14px;
  text-decoration: underline;
  display: block;
  margin-left: auto;
}

@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-item {
    grid-template-columns: 80px 1fr 80px 30px;
    gap: 10px;
  }

  .item-quantity {
    grid-column: 1 / span 2;
    justify-content: flex-start;
    margin-top: 10px;
  }

  .item-total {
    grid-column: 3;
    grid-row: 2;
    margin-top: 10px;
  }
}
</style>
