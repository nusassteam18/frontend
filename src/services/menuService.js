import { API_GATEWAY_URL } from '@/main';

export default {
  // Get menu items by restaurant ID
  async getMenuItemsByRestaurantId(restaurantId) {
    try {
      const response = await fetch(API_GATEWAY_URL.concat('/restaurants/products?restaurantId=' + restaurantId), { cache: "no-store" });
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
};
