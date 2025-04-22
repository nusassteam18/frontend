<template>
  <div class="p-4 overflow-x-auto">
    <h2 class="text-xl font-bold mb-4">Order Management</h2>
    <div class="max-w-[1200px] max-h-[500px] overflow-auto w-full mx-auto">
      <table class="w-full border-collapse border border-gray-300 text-xs">
        <thead>
          <tr class="bg-gray-200">
            <th class="border px-1 py-0.5">Order ID</th>
            <th class="border px-1 py-0.5">Customer</th>
            <th class="border px-1 py-0.5">Email</th>
            <th class="border px-1 py-0.5">Contact Number</th>
            <th class="border px-1 py-0.5">Order Items</th>
            <th class="border px-1 py-0.5">Total Amount</th>
            <th class="border px-1 py-0.5">Status</th>
            <th class="border px-1 py-0.5">Action</th>
            <th class="border px-1 py-0.5">Created At</th>
            <th class="border px-1 py-0.5">Updated At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id" class="border">
            <td class="border px-1 py-0.5">{{ order.id }}</td>
            <td class="border px-1 py-0.5">{{ order.firstName }} {{ order.lastName }}</td>
            <td class="border px-1 py-0.5">{{ order.email }}</td>
            <td class="border px-1 py-0.5">{{ order.contactNo }}</td>
            <td class="border px-1 py-0.5">
              <ul>
                <li v-for="item in order.orderItemDTOs" :key="item.id" class="mb-0.5">
                  <strong>{{ item.dish }}</strong>
                  <br />
                  Quantity: {{ item.quantity }}
                  <br />
                  Subtotal: ${{ item.subtotal.toFixed(2) }}
                  <br />
                  <em>Instructions: {{ item.specialInstructions || 'None' }}</em>
                </li>
              </ul>
            </td>
            <td class="border px-1 py-0.5">${{ order.total.toFixed(2) }}</td>
            <td class="border px-1 py-0.5">
              <select v-model="order.status" class="border px-1 py-0.5 text-xs">
                <option v-for="status in statuses" :key="status" :value="status">
                  {{ status }}
                </option>
              </select>
            </td>
            <td class="border px-1 py-0.5">
              <button @click="updateOrderStatus(order)" class="submit-button">
                Submit
              </button>
            </td>
            <td class="border px-1 py-0.5">{{ order.createdAt }}</td>
            <td class="border px-1 py-0.5">{{ order.updatedAt }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, onUpdated } from 'vue'
import orderService from '@/services/orderService';
import { authState } from "@/services/auth";
import { constants } from '../../constants.js'

// const state = reactive({
//   orders: [],
//   isLoading: true,
// });

const orders = ref([]);
const isLoading = ref(true);
const statuses = ref(["Pending", "Ready", "Completed", "Cancelled"]);

const fetchOrders = async () => {
  isLoading.value = true;

  try {
    const rawOrders = await orderService.getOrdersByRestaurantId(authState.restaurantId);

    orders.value = rawOrders.map(rawOrder => {
          return {...rawOrder, createdAt: formatDateTime(rawOrder.createdAt),  updatedAt: formatDateTime(rawOrder.updatedAt)}
      })
    
    // console.log(orders.value);
  } catch (error) {
    console.error("Error fetching orders!", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await fetchOrders();
});

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

const updateOrderStatus = async (order) => {

  const response = await orderService.updateOrderStatus(order.id, order.status)
  // console.log(`response -> orderId: ${response.orderId}, status: ${response.status}, updatedAt: ${response.updatedAt}`)
  if (response !== null) {
    if (response.returnCode === constants.SAME_ORDER_STATUS)
      alert(`Nothing changed. Order ${order.id} status is already set to ${order.status}`)
    else {
      // returnCode === SUCCESS or SUCCESS_BUT_SEND_EMAIL_FAILED
      orders.value = orders.value.map(order => {
          if (order.id === response.orderId) {
            return {...order, orderId: response.orderId, status: response.status, updatedAt: formatDateTime(response.updatedAt)}
          } else {
            return order
          }
      })
      // console.dir(orders.value)
      if (response.returnCode === constants.SUCCESS) {
          alert(`Order ${response.orderId} status updated to ${response.status} at ${formatDateTime(response.updatedAt)}. Order update email is sent successfully.`)
      } else {
        console.error("An error has occurred. Error code: " + response.returnCode + ". Error message: " + response.errorMessage)
        alert(`Order ${response.orderId} status updated to ${response.status} at ${formatDateTime(response.updatedAt)} but failed to send email.`)
      } 
    }
  }
}

</script>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid gray;
    padding: 2px;
    text-align: left;
    font-size: 10px;
  }
  th {
    background-color: #f4f4f4;
  }
  @media (max-width: 768px) {
    th, td {
      font-size: 9px;
      padding: 2px;
    }
    button {
      font-size: 9px;
      padding: 1px 3px;
    }
  }

  .submit-button {
    background-color: #22c55e; /* Tailwind green-500 */
    color: white;
    padding: 2px 4px;
    border-radius: 4px;
    border-color: transparent;
    font-size: 10px;
  }
  .submit-button:hover {
    background-color: #ef4444; /* Tailwind red-500 */
  }
</style>