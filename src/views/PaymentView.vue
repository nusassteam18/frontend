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
          <strong>Restaurant:</strong> {{ restaurantName }}
        </div>

        <!-- Order Items Section -->
        <div class="order-items-section">
          <div v-for="item in cartItems" :key="productId" class="order-item">
            <img :src="item.imageId" :alt="item.name" class="item-image" />
            <div class="item-details" >
              <p><strong>Dish Name:</strong> {{ item.name }}</p>
              <!-- <p><strong>Special Instruction:</strong> {{ item.specialInstruction }}</p> -->
              <p><strong>Quantity:</strong> {{ item.quantity }}</p>
              <p><strong>Subtotal:</strong> ${{ item.price.toFixed(2) }}</p>
            </div>
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
import cartStore from "@/store/cart";
import { authState } from "@/services/auth";
import { constants } from '../../constants.js';
export default {
  created() {
    const restaurantId = parseInt(this.$route.params.restaurantId, 10)
    this.restaurantName = this.$route.params.restaurantName
    this.cartItems = cartStore.getCartItems(restaurantId)

    this.customer.email = authState.email || '',
    this.customer.firstName =  authState.firstName || '',
    this.customer.lastName =  authState.lastName || '',
    this.customer.contactNo =  authState.contactNo || '',
    this.customer.creditCardNo =  authState.creditCardNo || '',
    this.customer.creditCardName =  authState.creditCardName || '',
    this.customer.creditCardExpiryDate = authState.creditCardExpiryDate || '',
    this.customer.creditCardSecurityCode = authState.creditCardSecurityCode || '',
    this.customer.homeAddress =  authState.homeAddress || ''
    console.log("cartItems: ")
    console.dir(this.cartItems)
  },
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
      return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }
  },
  methods: {
    // Handle Pay button click
    async payOrder() {
      try {
        // console.log("test: ")
        const restaurantId = parseInt(this.$route.params.restaurantId, 10)
        // console.log("restaurantId: " + restaurantId)
        const orderItems = this.cartItems.map((item) => {
          return {
            productId: item.productId,
            quantity: item.quantity,
            description: null,
            price: item.price
          }
        })
        let requestBody = JSON.stringify({
            customerId: authState.userId,
            restaurantId: restaurantId,
            orderItems: orderItems
          })
        // console.log("requestBody: " + requestBody)
        const response = await fetch(constants.API_GATEWAY_URL.concat('/orders'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: requestBody
        }).then(res => {
        if (res.ok) {
          return res
        } else if(res.status === 404) {
          return Promise.reject(404)
        } else {
          return Promise.reject(res)
        }
      })

      const orderId = await response.json()
      console.log('Send Order response data: ')
      console.dir(orderId)

      cartStore.clearCart();
      alert('Paid! Your order id is ' + orderId);
      this.$router.push("/");

      } catch (error) {
        if (error === 404) {
          alert(`Cannot find resource.`)
        } else {
          console.error('Send order error:', error)
          alert('An error occurred.')
        }
      }
    },
    // Handle Cancel button click
    cancelOrder() {
      alert('Cancelled');
      this.$router.go(-1);
    },
  },
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

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.order-item {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  text-align: left;
  border-bottom: 1px solid #eee;
  padding: 10px 0;

  display: flex;
  gap: 5%;
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