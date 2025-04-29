import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { h } from 'vue';
import RestaurantList from '@/components/RestaurantList.vue';
import restaurantService from '@/services/restaurantService';

// Mock the restaurantService
jest.mock('@/services/restaurantService');

// Mock vue-router
jest.mock('vue-router', () => ({
  useRouter: jest.fn(),
  RouterLink: {
    template: '<a><slot></slot></a>'
  }
}));

// Stub required components
import { config } from '@vue/test-utils';
config.global.stubs = {
  'router-link': true,
  'star-rating': true
};

// Mock vue-star-rating
jest.mock('vue-star-rating', () => {
  return {
    __esModule: true,
    default: {
      template: '<div class="star-rating-mock"></div>'
    }
  };
});

describe('RestaurantList.vue', () => {
  let wrapper;
  const mockRestaurants = [
    {
      restaurantId: 1,
      name: 'Test Restaurant 1',
      description: 'Description 1',
      averageScore: 4.5,
      rateCount: 10
    },
    {
      restaurantId: 2,
      name: 'Test Restaurant 2',
      description: 'Description 2',
      averageScore: 3.2,
      rateCount: 5
    }
  ];

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    // Setup mock function
    restaurantService.getAllRestaurants = jest.fn();
  });

  it('displays loading state initially', async () => {
    // Mock the service to return a delayed promise
    restaurantService.getAllRestaurants.mockImplementation(() => new Promise(resolve => {
      setTimeout(() => resolve(mockRestaurants), 100);
    }));

    wrapper = shallowMount(RestaurantList);
    expect(wrapper.find('.loading').exists()).toBe(true);
    expect(wrapper.find('.loading').text()).toContain('Loading restaurants');
  });

  it('calls fetchRestaurants on mount', async () => {
    // Mock the service
    restaurantService.getAllRestaurants.mockResolvedValue(mockRestaurants);
    
    // Mount component
    wrapper = shallowMount(RestaurantList);
    
    // Check that service was called
    expect(restaurantService.getAllRestaurants).toHaveBeenCalled();
  });

  it('handles error when fetching restaurants', async () => {
    // Mock console.error to prevent actual error logs during test
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock the service to throw an error
    const errorMessage = 'Network error';
    restaurantService.getAllRestaurants.mockRejectedValue(new Error(errorMessage));

    wrapper = shallowMount(RestaurantList);
    
    // Wait for promises to resolve - need to wait for all async operations
    await new Promise(resolve => setTimeout(resolve, 0));
    // Force component update
    await wrapper.vm.$nextTick();
    
    // Should have called console.error
    expect(consoleErrorSpy).toHaveBeenCalled();
    
    // Restore console.error
    consoleErrorSpy.mockRestore();
  });
});