import { createRouter, createWebHistory } from 'vue-router'
// 改用相對路徑
import Hello from '../views/Hello.vue'
import Register from '../views/Register.vue'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import EventPhoto from '../views/EventPhoto.vue'
import UploadView from '../views/UploadView.vue'


const routes = [
  { path: '/', name: 'Hello', component: Hello },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/home', name: 'Home', component: HomeView },
  { path: '/event-photo/:id', name: 'EventPhoto', component: EventPhoto },
  { path: '/cart', name: 'CartView', component: () => import('../views/CartView.vue') },
  { path: '/cart-confirm', name: 'CartConfirm', component: () => import('../views/CartConfirm.vue') },
  { path: '/cart/pay', name: 'CartPay', component: () => import('../views/CartPay.vue') },
  { path: '/pay-success', name: 'PaySuccess', component: () => import('../views/PaySuccess.vue') },
  { path: '/atm-processing', name: 'AtmProcessing', component: () => import('../views/AtmProcessing.vue') },
  { path: '/upload', name: 'Upload', component: UploadView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
