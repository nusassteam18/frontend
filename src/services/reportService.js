import { constants } from '../../constants.js'

export default {
  // Get restaurant ratings by ID
  async getRestaurantRatings(restaurantId) {
    try {
      const response = await fetch(`${constants.API_GATEWAY_URL}/restaurants/ratings/${restaurantId}`, { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then(res => {
        if (res.ok) {
          return res
        } else if(res.status === 404) {
          return Promise.reject(404)
        } else {
          return Promise.reject(res)
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching restaurant ratings:", error.message);
      throw error;
    }
  },

  // Get restaurant revenue report
  async getRevenueReport(restaurantId) {
    try {
      const response = await fetch(`${constants.API_GATEWAY_URL}/orders/report/${restaurantId}`, { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then(res => {
        if (res.ok) {
          return res
        } else if(res.status === 404) {
          return Promise.reject(404)
        } else {
          return Promise.reject(res)
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching revenue report:", error.message);
      throw error;
    }
  }
};