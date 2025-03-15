// Cart store using localStorage for persistence with restaurant-specific carts

export default {
  // Get cart items for all restaurants
  getAllCartItems() {
    const cartItems = localStorage.getItem("cartItems");
    return cartItems ? JSON.parse(cartItems) : {};
  },
  
  // Get cart items for a specific restaurant
  getCartItems(restaurantId) {
    const allCarts = this.getAllCartItems();
    return allCarts[restaurantId] || [];
  },

  // Add item to cart for a specific restaurant
  addToCart(item) {
    if (!item.restaurantId) {
      console.error("Cannot add item to cart: missing restaurantId");
      return [];
    }
    
    const allCarts = this.getAllCartItems();
    const restaurantId = item.restaurantId;
    
    // Initialize restaurant cart if it doesn't exist
    if (!allCarts[restaurantId]) {
      allCarts[restaurantId] = [];
    }
    
    const restaurantCart = allCarts[restaurantId];

    // Check if item already exists in cart
    const existingItemIndex = restaurantCart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex >= 0) {
      // Increment quantity if item already exists
      restaurantCart[existingItemIndex].quantity += 1;
    } else {
      // Add new item with quantity 1
      restaurantCart.push({
        ...item,
        quantity: 1,
      });
    }

    // Save to localStorage
    localStorage.setItem("cartItems", JSON.stringify(allCarts));
    return restaurantCart;
  },

  // Update item quantity in cart for a specific restaurant
  updateCartItemQuantity(restaurantId, itemId, quantity) {
    const allCarts = this.getAllCartItems();
    
    if (!allCarts[restaurantId]) {
      return [];
    }
    
    const restaurantCart = allCarts[restaurantId];
    const itemIndex = restaurantCart.findIndex((item) => item.id === itemId);

    if (itemIndex >= 0) {
      if (quantity > 0) {
        restaurantCart[itemIndex].quantity = quantity;
      } else {
        // Remove item if quantity is 0 or less
        restaurantCart.splice(itemIndex, 1);
      }

      // Save to localStorage
      localStorage.setItem("cartItems", JSON.stringify(allCarts));
    }

    return restaurantCart;
  },

  // Remove item from cart for a specific restaurant
  removeFromCart(restaurantId, itemId) {
    const allCarts = this.getAllCartItems();
    
    if (!allCarts[restaurantId]) {
      return [];
    }
    
    const restaurantCart = allCarts[restaurantId];
    const updatedCart = restaurantCart.filter((item) => item.id !== itemId);
    
    allCarts[restaurantId] = updatedCart;

    // Save to localStorage
    localStorage.setItem("cartItems", JSON.stringify(allCarts));
    return updatedCart;
  },

  // Clear the cart for a specific restaurant
  clearCart(restaurantId) {
    const allCarts = this.getAllCartItems();
    
    if (restaurantId) {
      // Clear specific restaurant cart
      if (allCarts[restaurantId]) {
        delete allCarts[restaurantId];
        localStorage.setItem("cartItems", JSON.stringify(allCarts));
      }
      return [];
    } else {
      // Clear all carts
      localStorage.removeItem("cartItems");
      return {};
    }
  },

  // Get total items count in cart for a specific restaurant
  getCartCount(restaurantId) {
    if (!restaurantId) {
      // Get total count across all restaurants
      const allCarts = this.getAllCartItems();
      let totalCount = 0;
      
      Object.values(allCarts).forEach(cart => {
        totalCount += cart.reduce((total, item) => total + item.quantity, 0);
      });
      
      return totalCount;
    }
    
    const restaurantCart = this.getCartItems(restaurantId);
    return restaurantCart.reduce((total, item) => total + item.quantity, 0);
  },

  // Get cart total price for a specific restaurant
  getCartTotal(restaurantId) {
    if (!restaurantId) {
      // Get total price across all restaurants
      const allCarts = this.getAllCartItems();
      let totalPrice = 0;
      
      Object.values(allCarts).forEach(cart => {
        totalPrice += cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      });
      
      return totalPrice;
    }
    
    const restaurantCart = this.getCartItems(restaurantId);
    return restaurantCart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
  
  // Get restaurant names that have items in the cart
  getCartRestaurants() {
    const allCarts = this.getAllCartItems();
    const restaurantIds = Object.keys(allCarts);
    
    return restaurantIds.filter(id => allCarts[id] && allCarts[id].length > 0);
  }
};