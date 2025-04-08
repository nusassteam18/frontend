import { constants } from '../../constants.js'
import { authState } from '@/services/auth'


export default {
    async getOrdersByRestaurantId(restaurantId) {
        try {
          const response = await fetch(constants.API_GATEWAY_URL.concat('/orders/restaurant/', restaurantId), { 
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
          console.error(error.message);
        }
      },

    async updateOrderStatus(orderId, status) {
        try {
          console.log("orderId: " + orderId + ". status: " + status)

          const restaurantId = authState.restaurantId

          if (restaurantId === null)
            throw 'restaurantId is null'

          const response = await fetch(constants.API_GATEWAY_URL.concat('/orders'), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: orderId,
              status: status,
              restaurantId: restaurantId
            })
          }).then(res => {
          if (res.ok) {
            return res
          } else if(res.status === 404) {
            return Promise.reject(404)
          } else {
            return Promise.reject(res)
          }
        })
      
        console.log('updateOrderStatus success')
        
        const data = await response.json()
        
        return data
      
        } catch (error) {
          console.error('Order Status Update error:', error)
          alert('An error occurred during order status update.')
          return null
        }
      },
}