// Dummy restaurant data service

// Sample restaurant data
const restaurants = [
  {
    id: 1,
    name: "Pizza Palace",
    description: "Authentic Italian pizzas made with fresh ingredients",
    address: "123 Main Street, New York, NY 10001",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
    rating: 4.5,
    rateCount: 120,
  },
  {
    id: 2,
    name: "Burger Junction",
    description: "Gourmet burgers and sides for the whole family",
    address: "456 Oak Avenue, Chicago, IL 60007",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    rating: 4.2,
    rateCount: 105,
  },
  {
    id: 3,
    name: "Fresh Greens",
    description: "Healthy salads and vegetarian options",
    address: "789 Willow Boulevard, Los Angeles, CA 90001",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    rating: 5.0,
    rateCount: 60,
  },
];

export default {
  // Get all restaurants
  getAllRestaurants() {
    return new Promise((resolve) => {
      resolve(restaurants);
    });
  },

  // Get restaurant by ID
  getRestaurantById(id) {
    return new Promise((resolve) => {
      // Simulate API call delay
      const restaurant = restaurants.find((r) => r.id === id);
      resolve(restaurant || null);
    });
  },
};
