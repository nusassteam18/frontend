<template>
  <div class="p-4 overflow-x-auto">
    <h2 class="text-xl font-bold mb-4">Order Management</h2>
    <div class="max-w-[1200px] max-h-[500px] overflow-auto w-full mx-auto">
      <table class="w-full border-collapse border border-gray-300 text-xs">
        <thead>
          <tr class="bg-gray-200">
            <th class="border px-1 py-0.5">Order ID</th>
            <th class="border px-1 py-0.5">Customer</th>
            <th class="border px-1 py-0.5">Restaurant</th>
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
            <td class="border px-1 py-0.5">{{ order.customer }}</td>
            <td class="border px-1 py-0.5">{{ order.restaurant }}</td>
            <td class="border px-1 py-0.5">
              <ul>
                <li v-for="item in order.items" :key="item.id" class="mb-0.5">
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
              <select v-model="order.selectedStatus" class="border px-1 py-0.5 text-xs">
                <option v-for="status in statuses" :key="status" :value="status">
                  {{ status }}
                </option>
              </select>
            </td>
            <td class="border px-1 py-0.5">
              <button @click="updateStatus(order)" class="bg-blue-500 text-white px-1 py-0.5 rounded text-xs">
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

<script>
export default {
  data() {
    return {
      orders: [
        {
          id: 1, 
          customer: "John Doe", 
          restaurant: "Pizza Palace",
          createdAt: "2025-03-06 12:30 PM",
          updatedAt: "2025-03-06 01:00 PM",
          total: 99.99, 
          status: "Pending", 
          selectedStatus: "Pending",
          items: [
            { id: 1, dish: "Pepperoni Pizza", quantity: 1, subtotal: 19.99, specialInstructions: "Extra cheese" },
            { id: 2, dish: "Garlic Bread", quantity: 2, subtotal: 9.99, specialInstructions: "No butter" }
          ]
        },
        {
          id: 2, 
          customer: "Jane Smith", 
          restaurant: "Sushi World",
          createdAt: "2025-03-06 01:15 PM",
          updatedAt: "2025-03-06 01:45 PM",
          total: 49.5, 
          status: "Ready", 
          selectedStatus: "Ready",
          items: [
            { id: 3, dish: "Salmon Roll", quantity: 1, subtotal: 15.50, specialInstructions: "Less soy sauce" },
            { id: 4, dish: "Miso Soup", quantity: 1, subtotal: 4.00 }
          ]
        },
        {
          id: 3, 
          customer: "Mike Johnson", 
          restaurant: "Burger Haven",
          createdAt: "2025-03-06 02:00 PM",
          updatedAt: "2025-03-06 02:30 PM",
          total: 75.0, 
          status: "Completed", 
          selectedStatus: "Completed",
          items: [
            { id: 5, dish: "Cheeseburger", quantity: 1, subtotal: 12.99, specialInstructions: "No pickles" },
            { id: 6, dish: "Fries", quantity: 2, subtotal: 6.99 }
          ]
        }
      ],
      statuses: ["Pending", "Ready", "Completed", "Cancelled"],
    };
  },
  methods: {
    updateStatus(order) {
      order.status = order.selectedStatus;
      alert(`Order ${order.id} status updated to ${order.selectedStatus}`);
    },
  },
};
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
</style>