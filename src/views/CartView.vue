<template>
  <AppHeader />
  <div class="cart-view">
    <div class="steps">
      <p class="active">訂單建立</p>
      <p>訂單確認</p>
      <p>確認支付</p>
      <div class="steps-progress"></div>
      <div class="steps-dot" style="left: 15%"></div>
    </div>
    <div class="cart-list">
      <template v-if="cartItems.length > 0">
        <div class="cart-item" v-for="(item, index) in cartItems" :key="index">
          <img :src="item.url" alt="photo" class="photo" />
          <div class="info">
            <p>{{ item.eventName }}</p>
            <p>攝影師: {{ item.photographer }}</p>
            <div class="price-info">
              <p class="price">NT${{ item.price }}</p>
              <button class="fit-content delete" @click="removeItem(index)"><i class="fa fa-trash-o"
                  aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="cart-empty">
          購物車沒有相片<br>
          <router-link to="/home"><a>尋找活動相片</a></router-link>
        </div>
      </template>
    </div>
    <footer class="footer">
      <div>
        <p>典藏費用: NT${{ cartItems.length > 0 ? 50 : 0 }}元</p>
        <p>相片共計: NT${{ totalPrice + (cartItems.length > 0 ? 50 : 0) }}元</p>
      </div>
      <div>
        <button class="next-step" :disabled="cartItems.length === 0" @click="goToConfirm">結算</button>
        <span>已選擇 {{ cartItems.length }} 張相片</span>
      </div>
    </footer>
    <FooterMenu />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import photosData from '../data/photos.js'
import activities from '../data/activities.js'
import AppHeader from '../components/AppHeader.vue'
import FooterMenu from '../components/FooterMenu.vue'

const router = useRouter()

// 取得所有活動的所有相片，並補齊 eventName 及 photographer
const allPhotos = photosData.flatMap(entry =>
  (entry.photos || []).map(photo => ({
    ...photo,
    url: photo.url || '',
    eventName: (activities.find(a => a.id === entry.id) || {}).name || '',
    photographer: (activities.find(a => a.id === entry.id) || {}).totalPhotographer || '',
    price: 169
  }))
)

const cartItems = ref([])

onMounted(() => {
  // 從 localStorage 載入購物車資料
  const localCart = JSON.parse(localStorage.getItem('cartItems') || '[]')
  // 若 localStorage 沒有資料，預設加入前兩張有圖的相片
  if (localCart.length) {
    // 修正：補齊 eventName 及 photographer
    cartItems.value = localCart.map(item => {
      const match = allPhotos.find(p => p.id === item.id)
      return {
        ...item,
        eventName: item.eventName || (match ? match.eventName : ''),
        photographer: item.photographer || (match ? match.photographer : '')
      }
    })
  } else {
    cartItems.value = allPhotos.filter(p => p.url).slice(0, 2)
  }
})

const removeItem = (index) => {
  cartItems.value.splice(index, 1)
  localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
}

const totalPrice = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price, 0)
)

function goToConfirm() {
  router.push({ name: 'CartConfirm' })
}
</script>

<style scoped>
.cart-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.cart-list {
  height: calc(100vh - 422px);
  overflow-y: auto;
  padding: 1rem;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ccc;
}

.cart-item:last-child {
  border-bottom: none;
  margin-bottom: 0px;
}

.photo {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 1rem;
}

.info {
  flex: 1;
}

.info p {
  margin: 0;
  font-size: 14px;
  text-align: left;
}

.price-info {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.price {
  color: red;
  font-weight: bold;
}

.delete {
  background: none;
  color: #ccc;
  font-size: 14px;
  padding: 5px 10px;
  border: none;
  outline: none;
  box-shadow: none;
}

.delete:hover {
  color: #32A45D;
}

.footer {
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  background: #eee;
  align-items: center;
}

.footer div {
  display: grid;
}

.footer p {
  text-align: left;
  font-size: 14px;
  margin: 0px;
}

.footer span {
  font-size: 12px;
  color: #888;
}

.next-step {
  background: green;
  color: white;
  padding: 8px;
  margin-bottom: 3px;
  border: none;
  font-size: 1rem;
  border-radius: 0.5rem;
}

.cart-empty {
  text-align: center;
  color: #888;
  font-size: 16px;
  padding: 40px 0 20px 0;
}

.cart-empty a {
  color: #32A45D;
  text-decoration: underline;
  cursor: pointer;
}

.next-step:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
