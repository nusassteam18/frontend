import { API_GATEWAY_URL } from "@/main";

export default {
  // Get all restaurants
  async getAllRestaurants() {
    try {
      const response = await fetch(API_GATEWAY_URL.concat("/restaurants"), { cache: "no-store" });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error fetching restaurants");
        return [];
      }
    } catch (error) {
      console.error("Error fetching restaurant", error);
      return [];
    }
  },

  // Get restaurant by ID
  async getRestaurantById(id) {
    try {
      const response = await fetch(API_GATEWAY_URL.concat("/restaurants/" + id), { cache: "no-store" });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error fetching restaurants");
        return null;
      }
    } catch (error) {
      console.error("Error fetching restaurant", error);
      return null;
    }
  },

  // Get restaurant
  async getRestaurant() {
    try {
      const response = await fetch("https://callmeliow.github.io/test/restaurant.json", { cache: "no-store" });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro fetching restaurant");
      
    }
  },
};
