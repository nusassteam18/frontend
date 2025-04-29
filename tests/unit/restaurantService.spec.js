import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import restaurantService from '@/services/restaurantService';
import { constants } from '../../constants.js';

// Mock fetch
global.fetch = jest.fn();

describe('restaurantService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllRestaurants', () => {
    it('should fetch all restaurants successfully', async () => {
      // Mock data
      const mockRestaurants = [
        { restaurantId: 1, name: 'Restaurant 1' },
        { restaurantId: 2, name: 'Restaurant 2' }
      ];

      // Mock successful response
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRestaurants
      });

      // Call the service
      const result = await restaurantService.getAllRestaurants();

      // Assertions
      expect(fetch).toHaveBeenCalledWith(
        constants.API_GATEWAY_URL.concat('/restaurants'),
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        }
      );
      expect(result).toEqual(mockRestaurants);
    });

    it('should handle 404 error', async () => {
      // Mock console.error
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      // Mock 404 response
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      // Call the service
      const result = await restaurantService.getAllRestaurants();

      // Assertions
      expect(fetch).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(result).toBeUndefined();

      // Restore
      consoleErrorSpy.mockRestore();
    });

    it('should handle general error', async () => {
      // Mock console.error
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      // Mock error
      global.fetch.mockRejectedValueOnce(new Error('Network error'));

      // Call the service
      const result = await restaurantService.getAllRestaurants();

      // Assertions
      expect(fetch).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(result).toBeUndefined();

      // Restore
      consoleErrorSpy.mockRestore();
    });
  });

  describe('getRestaurantById', () => {
    it('should fetch a restaurant by id successfully', async () => {
      // Mock data
      const mockRestaurant = { restaurantId: 1, name: 'Restaurant 1' };
      const id = 1;

      // Mock successful response
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRestaurant
      });

      // Call the service
      const result = await restaurantService.getRestaurantById(id);

      // Assertions
      expect(fetch).toHaveBeenCalledWith(
        constants.API_GATEWAY_URL.concat('/restaurants/', id),
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        }
      );
      expect(result).toEqual(mockRestaurant);
    });
  });
});