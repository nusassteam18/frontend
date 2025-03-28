import { constants } from '../../constants.js'
// Dummy menu data service

// Sample menu items data
const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and basil",
    price: 12.99,
    restaurantId: 1,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Pizza_Margherita_stu_spivack.jpg/1200px-Pizza_Margherita_stu_spivack.jpg",
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    description: "Pizza topped with pepperoni slices and cheese",
    price: 14.99,
    restaurantId: 1,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Pepperoni_Pizza_%2829204589095%29.jpg/1920px-Pepperoni_Pizza_%2829204589095%29.jpg",
  },
  {
    id: 3,
    name: "Veggie Burger",
    description: "Plant-based patty with lettuce, tomato, and special sauce",
    price: 10.99,
    restaurantId: 2,
    image: "https://www.realsimple.com/thmb/z3cQCYXTyDQS9ddsqqlTVE8fnpc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/real-simple-mushroom-black-bean-burgers-recipe-0c365277d4294e6db2daa3353d6ff605.jpg",
  },
  {
    id: 4,
    name: "Classic Burger",
    description: "Beef patty with cheese, lettuce, tomato, and pickles",
    price: 11.99,
    restaurantId: 2,
    image: "https://i1.wp.com/coolfooddude.com/wp-content/uploads/2020/08/SFS_Classic_Sirloin_Blend_030-2-scaled.jpg?w=2048&ssl=1",
  },
  {
    id: 5,
    name: "Caesar Salad",
    description:
      "Romaine lettuce, croutons, parmesan cheese with Caesar dressing",
    price: 8.99,
    restaurantId: 3,
    image: "https://www.grocery.coop/sites/default/files/NCG_Dennis_Becker_Classic_Caesar_Salad_715_x_477.jpg",
  },
  {
    id: 6,
    name: "Greek Salad",
    description:
      "Cucumber, tomato, olives, feta cheese with olive oil dressing",
    price: 9.99,
    restaurantId: 3,
    image: "https://images.themodernproper.com/production/posts/GreekSalad_9.jpg?w=1200&h=1200&q=60&fm=jpg&fit=crop&dm=1718650734&s=70119bf37604d243d0729db7f4cda445",
  },
  {
    id: 7,
    name: "French Fries",
    description: "Crispy golden potato fries with salt",
    price: 4.99,
    restaurantId: 2,
    image: "https://img.apmcdn.org/4b2716626c9ff3f6e5dfebe520eb592c33cf1e7b/uncropped/941f50-splendid-table-french-fries.jpg",
  },
  {
    id: 8,
    name: "Onion Rings",
    description: "Battered and fried onion rings",
    price: 5.99,
    restaurantId: 2,
    image: "https://assets.afcdn.com/recipe/20170223/27146_w1024h768c1cx2464cy1632.jpg",
  },
];

export default {
  // Get all menu items
  async getAllMenuItems() {
    // return new Promise((resolve) => {
    //   resolve(menuItems);
    // });
        try {
          const response = await fetch(constants.API_GATEWAY_URL.concat('/restaurants/products'), { 
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

  // Get menu items by restaurant ID
  async getMenuItemsByRestaurantId(restaurantId) {
    // return new Promise((resolve) => {
    //   const filteredItems = menuItems.filter(
    //     (item) => item.restaurantId === restaurantId
    //   );
    //   resolve(filteredItems);
    // });
    try {
      const response = await fetch(constants.API_GATEWAY_URL.concat('/restaurants/products/', restaurantId), { 
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
};
