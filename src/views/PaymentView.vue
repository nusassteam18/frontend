<template>
  <div class="payment-page">
    <!-- Customer Details Section -->
    <div class="customer-details">
      <h2>Customer Details</h2>
      <div class="card">
        <div class="form-container">
          <div class="form-group">
            <label>Email:</label>
            <input type="email" v-model="customer.email" />
          </div>
          <div class="form-group">
            <label>First Name:</label>
            <input type="text" v-model="customer.firstName" />
          </div>
          <div class="form-group">
            <label>Last Name:</label>
            <input type="text" v-model="customer.lastName" />
          </div>
          <div class="form-group">
            <label>Contact No:</label>
            <input type="text" v-model="customer.contactNo" />
          </div>
          <div class="form-group">
            <label>Credit Card No:</label>
            <input type="text" v-model="customer.creditCardNo" />
          </div>
          <div class="form-group">
            <label>Credit Card Name:</label>
            <input type="text" v-model="customer.creditCardName" />
          </div>
          <div class="form-group">
            <label>Credit Card Expiry Date:</label>
            <input type="text" v-model="customer.creditCardExpiryDate" />
          </div>
          <div class="form-group">
            <label>Credit Card Security Code:</label>
            <input type="text" v-model="customer.creditCardSecurityCode" />
          </div>
          <div class="form-group">
            <label>Home Address:</label>
            <input type="text" v-model="customer.homeAddress" />
          </div>
        </div>
      </div>
    </div>

    <!-- Order Details Section -->
    <div class="order-details">
      <h2>Order Details</h2>
      <div class="card">
        <!-- Restaurant Name Section -->
        <div class="restaurant-section">
          <strong>Restaurant:</strong> {{ order.restaurantName }}
        </div>

        <!-- Order Items Section -->
        <div class="order-items-section">
          <div v-for="(item, index) in order.orderItems" :key="index" class="order-item">
            <p><strong>Dish Name:</strong> {{ item.dishName }}</p>
            <p><strong>Special Instruction:</strong> {{ item.specialInstruction }}</p>
            <p><strong>Quantity:</strong> {{ item.quantity }}</p>
            <p><strong>Subtotal:</strong> ${{ item.subtotal.toFixed(2) }}</p>
          </div>
        </div>

        <!-- Total Section -->
        <div class="total-section">
          <strong>Total:</strong> ${{ total.toFixed(2) }}
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="actions">
      <button class="btn cancel-btn" @click="cancelOrder">Cancel</button>
      <button class="btn pay-btn" @click="payOrder">Pay</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // Sample customer data
      customer: {
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        contactNo: '123-456-7890',
        creditCardNo: '4111 1111 1111 1111',
        creditCardName: 'John Doe',
        creditCardExpiryDate: '12/25',
        creditCardSecurityCode: '123',
        homeAddress: '123 Main St, Springfield, IL, 62701'
      },
      // Sample order data
      order: {
        restaurantName: 'The Gourmet Kitchen',
        orderItems: [
          {
            dishName: 'Spaghetti Carbonara',
            specialInstruction: 'Extra cheese',
            quantity: 2,
            subtotal: 25.98
          },
          {
            dishName: 'Caesar Salad',
            specialInstruction: 'No croutons',
            quantity: 1,
            subtotal: 12.50
          }
        ]
      }
    };
  },
  computed: {
    // Calculate the total order amount
    total() {
      return this.order.orderItems.reduce((sum, item) => sum + item.subtotal, 0);
    }
  },
  methods: {
    // Handle Pay button click
    payOrder() {
      alert('Paid');
      this.$router.push("/restaurant");
    },
    // Handle Cancel button click
    cancelOrder() {
      alert('Cancelled');
    }
  }
};
</script>
<style scoped>
.payment-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.customer-details, .order-details {
  margin-bottom: 30px;
}

.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  background-color: #f9f9f9;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the form groups */
}

.form-group {
  width: 100%;
  max-width: 400px;
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
}

/* Order Details Styling */
.restaurant-section {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.order-items-section {
  margin-bottom: 20px;
}

.order-item {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  text-align: left;
  border-bottom: 1px solid #eee;
  padding: 10px 0;
}

.order-item:last-child {
  border-bottom: none;
}

.total-section {
  font-size: 1.2em;
  font-weight: bold;
  text-align: right;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

/* Action Buttons */
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pay-btn {
  background-color: #ff6b6b; /* Soft red */
  color: #fff;
}

.pay-btn:hover {
  background-color: #ff5252; /* Slightly darker red on hover */
}

.cancel-btn {
  background-color: #66bb6a; /* Soft green */
  color: #fff;
}

.cancel-btn:hover {
  background-color: #4caf50; /* Slightly darker green on hover */
}

h2 {
  color: #333;
  margin-bottom: 15px;
}

p {
  margin: 5px 0;
}
</style>