import { constants } from '../../constants.js'
import Rating from '@/models/Rating.js';

export default {
  // Get restaurant rating by restaurant ID and user ID
  async getRatingByRestaurantIdAndCustomerId(restaurantId, userId) {
    try {
      const response = await fetch(`${constants.API_GATEWAY_URL}/restaurants/ratings/${restaurantId}/users/${userId}`, { 
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
      return new Rating(data);
    } catch (error) {
      console.error("Error fetching user rated rating:", error.message);
      throw error;
    }
  },

  //  Submit rating
  async submitRating(rating) {
    try {
      const response = await fetch(`${constants.API_GATEWAY_URL}/restaurants/ratings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(rating)
      });

      if (response.ok) {
        return new Rating(await response.json());
      }
      else{
        const errorData = await response.json();
        alert('Failed to submit rating: ' + errorData.message);
        return false;
      }
    } catch (error) {
      console.log('Error submitting rating: ' + error);
    }
  },
  
  // Update rating
  async updateRating(rating) {
    try {
      const response = await fetch(`${constants.API_GATEWAY_URL}/restaurants/ratings/${rating.ratingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rating)
      });
      
      if (response.ok) {
        return new Rating(await response.json());
      }
      else{
        const errorData = await response.json();
        alert('Failed to update rating: ' + errorData.message);
        return false;
      }
      
    } catch (error) {
      console.log('Error updating rating: ' + error);
    }
  }
};