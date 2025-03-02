// Cart store using localStorage for persistence

export default {
  // Get cart items from localStorage
  getCartItems() {
    const cartItems = localStorage.getItem("cartItems");
    return cartItems ? JSON.parse(cartItems) : [];
  },

  // Add item to cart
  addToCart(item) {
    const cartItems = this.getCartItems();

    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex >= 0) {
      // Increment quantity if item already exists
      cartItems[existingItemIndex].quantity += 1;
    } else {
      // Add new item with quantity 1
      cartItems.push({
        ...item,
        quantity: 1,
      });
    }

    // Save to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    return cartItems;
  },

  // Update item quantity in cart
  updateCartItemQuantity(itemId, quantity) {
    const cartItems = this.getCartItems();
    const itemIndex = cartItems.findIndex((item) => item.id === itemId);

    if (itemIndex >= 0) {
      if (quantity > 0) {
        cartItems[itemIndex].quantity = quantity;
      } else {
        // Remove item if quantity is 0 or less
        cartItems.splice(itemIndex, 1);
      }

      // Save to localStorage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    return cartItems;
  },

  // Remove item from cart
  removeFromCart(itemId) {
    const cartItems = this.getCartItems();
    const updatedCart = cartItems.filter((item) => item.id !== itemId);

    // Save to localStorage
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    return updatedCart;
  },

  // Clear the entire cart
  clearCart() {
    localStorage.removeItem("cartItems");
    return [];
  },

  // Get total items count in cart
  getCartCount() {
    const cartItems = this.getCartItems();
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  },

  // Get cart total price
  getCartTotal() {
    const cartItems = this.getCartItems();
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
};
