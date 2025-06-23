<template>
    <div class="photo-card">
        <img :src="photo.url" :alt="`Photo ${photo.id}`" />
        <div class="actions fit-content">
            <button @click="toggleFavorite">
                <span :class="{ active: isFavorite }">
                    <i
                        :class="isFavorite ? 'fa fa-heart' : 'fa fa-heart-o'"
                        aria-hidden="true"
                    ></i>
                </span>
            </button>
            <button @click="addToCart">
                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
    photo: Object
});

const emit = defineEmits(['add-to-cart', 'toggle-favorite']);

// 本地 isFavorite 狀態，確保點擊即時變色
const isFavorite = ref(props.photo.isFavorite);

watch(() => props.photo.isFavorite, (val) => {
    isFavorite.value = val;
});

const router = useRouter();

function addToCart() {
    // 儲存購物車資料到 localStorage
    let cart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    // 檢查是否已存在
    if (!cart.find(item => item.id === props.photo.id)) {
        cart.push({
            ...props.photo,
            eventName: props.photo.eventName || '',
            photographer: props.photo.photographer || '',
            price: props.photo.price || 169
        });
        localStorage.setItem('cartItems', JSON.stringify(cart));
    }
    // 跳轉到購物車頁面
    router.push({ name: 'CartView' });
}

function toggleFavorite() {
    isFavorite.value = !isFavorite.value;
    emit('toggle-favorite', props.photo.id);
}
</script>

<style scoped>
.photo-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.photo-card img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    display: block;
}

.meta {
    padding: 0.5rem;
    font-size: 0.875rem;
    color: #333;
}

.actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-right: 10px;
}

.actions button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    padding: 0;
    color: #333;
    outline: none;
    box-shadow: none;
}

.actions button:focus {
    outline: none;
    box-shadow: none;
}

.actions .active, .actions button:hover {
    color: #32A45D;
}
</style>
