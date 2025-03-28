import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RestaurantView from '@/views/RestaurantView.vue'
import RestaurantEditView from '@/views/RestaurantEditView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/restaurant/:restaurantId/menu',
    name: 'restaurantMenu',
    component: () => import(/* webpackChunkName: "menu" */ '../views/MenuView.vue')
  },
  {
    path: '/cart/:restaurantId',
    name: 'restaurantCart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/CartView.vue')
  },

  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },

  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },

  {
    path: '/updateProfile',
    name: 'updateProfile',
    component: () => import(/* webpackChunkName: "update" */ '../views/UpdateUser.vue')
  },

  {
      path: '/forgot-password',
      name: 'forgotPassword',
      component: () => import(/* webpackChunkName: "forgot" */ '../views/ForgetPassword.vue')
    },
  {
    path: '/admin',
    name: 'admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "admin" */ '../views/AdminView.vue')
  },
  
  {
    path: '/payment/:restaurantId',
    name: 'payment',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "payment" */ '../views/PaymentView.vue')
  },

  {
    path: '/profile',
    name: 'profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "profile" */ '../views/ProfileView.vue')
  },

  {
    path: '/restaurant',
    name: 'restaurant',
    component: RestaurantView
  },
  {
    path: '/restaurant/edit',
    name: 'restaurantEdit',
    component: RestaurantEditView
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
