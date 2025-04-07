<template>
  <div class="container mt-4">
    <h1 class="mb-4">Restaurant Reports</h1>
    
    <!-- Loading indicator -->
    <div v-if="state.isLoading" class="text-center my-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Loading report data...</p>
    </div>
    
    <div v-else>
      <!-- Revenue Report Section -->
      <div class="card mb-4">
        <div class="card-header bg-primary text-white">
          <h2 class="h4 mb-0">Revenue Report - Last 3 Months</h2>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered table-hover">
              <thead class="table-light">
                <tr>
                  <th>Month</th>
                  <th>Revenue</th>
                  <th>Number of Orders</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in state.revenueData.revenues" :key="index">
                  <td>{{ formatDate(item.date) }}</td>
                  <td>${{ item.revenue.toFixed(2) }}</td>
                  <td>{{ item.numberOfOrders }}</td>
                </tr>
              </tbody>
              <tfoot class="table-light">
                <tr>
                  <th>Total</th>
                  <th>${{ calculateTotalRevenue().toFixed(2) }}</th>
                  <th>{{ calculateTotalOrders() }}</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      
      <!-- Ratings Summary Section -->
      <div class="card mb-4">
        <div class="card-header bg-info text-white">
          <h2 class="h4 mb-0">Customer Ratings Overview</h2>
        </div>
        <div class="card-body">
          <div class="row align-items-center">
            <div class="text-center">
              <div class="display-1 fw-bold">{{ state.ratingsData.averageScore.toFixed(1) }}</div>
              <star-rating
                :rating="state.ratingsData.averageScore"
                :read-only="true"
                :show-rating="false"
                :star-size="30"
                :increment="0.01"
                :fixed-points="1"
              ></star-rating>
              <p class="text-muted">Based on {{ state.ratingsData.rateCount }} reviews</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Individual Ratings Section -->
      <div class="card">
        <div class="card-header bg-secondary text-white">
          <h2 class="h4 mb-0">Customer Reviews</h2>
        </div>
        <div class="card-body">
          <div v-if="state.ratingsData.ratings.length === 0" class="text-center py-5">
            <p class="text-muted">No reviews yet</p>
          </div>
          
          <div v-else class="row">
            <div v-for="(rating, index) in state.ratingsData.ratings" :key="index" class="col-md-6 mb-4">
              <div class="card h-100 border-light">
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <star-rating
                        :rating="rating.score"
                        :read-only="true"
                        :show-rating="false"
                        :star-size="20"
                        :increment="0.01"
                        :fixed-points="1"
                      ></star-rating>
                    </div>
                    <small class="text-muted">Customer ID: {{ rating.customerId }}</small>
                  </div>
                  <p class="card-text">{{ rating.description }}</p>
                  <div class="text-end">
                    <small class="text-muted">{{ formatDateTime(rating.createdAt) }}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import 'bootstrap/dist/css/bootstrap.css'
import StarRating from 'vue-star-rating'
import { defineComponent, onMounted, reactive, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import reportService from '@/services/reportService'
import { authState } from '@/services/auth'

// Register Chart.js components
Chart.register(...registerables)

defineComponent({
  component: StarRating
})

const state = reactive({
  restaurantId: authState.restaurantId,
  isLoading: true,
  ratingsData: {
    averageScore: 0,
    rateCount: 0,
    ratings: []
  },
  revenueData: {
    restaurantId: 0,
    revenues: []
  }
})

const fetchData = async () => {
  state.isLoading = true
  
  try {
    // Fetch ratings and revenue data in parallel
    const [ratingsData, revenueData] = await Promise.all([
      reportService.getRestaurantRatings(state.restaurantId),
      reportService.getRevenueReport(state.restaurantId)
    ])
    
    state.ratingsData = ratingsData
    state.revenueData = revenueData
  } catch (error) {
    console.error("Error fetching report data:", error)
  } finally {
    state.isLoading = false
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'long'
  }).format(date)
}

const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString)
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const calculateTotalRevenue = () => {
  return state.revenueData.revenues.reduce((total, item) => total + item.revenue, 0)
}

const calculateTotalOrders = () => {
  return state.revenueData.revenues.reduce((total, item) => total + item.numberOfOrders, 0)
}

// Watch for restaurantId changes
watch(() => authState.restaurantId, (newValue) => {
  if (newValue) {
    state.restaurantId = newValue
    fetchData()
  }
})

onMounted(() => {
  if (state.restaurantId) {
    fetchData()
  } else {
    // Redirect or show error if restaurant ID is missing
    console.error('Restaurant ID not found in localStorage')
    state.isLoading = false
  }
})
</script>

<style scoped>
.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: none;
}

.card-header {
  border-radius: 8px 8px 0 0 !important;
}

.table th {
  background-color: #f8f9fa;
}

.vue-star-rating {
  display: inline-flex;
}
</style>