<template>
    <div class="photo-card" v-show="!deleted">
        <img :src="photo.url" :alt="`Photo ${photo.id}`" />
        <div
            :class="['actions', hasPhotographerId ? 'actions-photographerId' : '']"
        >
            <template v-if="hasPhotographerId">
                <span>已售出: {{ photo.sold || 0 }}</span>
                <button class="del" @click="handleDelete">
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                </button>
            </template>
            <template v-else>
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
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
    photo: Object
});

const emit = defineEmits(['add-to-cart', 'toggle-favorite', 'delete-photo']);

const isFavorite = ref(props.photo.isFavorite);
const deleted = ref(false);

watch(() => props.photo.isFavorite, (val) => {
    isFavorite.value = val;
});

const router = useRouter();
const route = useRoute();

const hasPhotographerId = !!route.query.photographerId;

function addToCart() {
    let cart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    if (!cart.find(item => item.id === props.photo.id)) {
        cart.push({
            ...props.photo,
            eventName: props.photo.eventName || '',
            photographer: props.photo.photographer || '',
            price: props.photo.price || 169
        });
        localStorage.setItem('cartItems', JSON.stringify(cart));
    }
    router.push({ name: 'CartView' });
}

function toggleFavorite() {
    isFavorite.value = !isFavorite.value;
    emit('toggle-favorite', props.photo.id);
}

function handleDelete() {
    deleted.value = true
    emit('delete-photo', props.photo.id)
}
</script>

<style scoped>
.actions.actions-photographerId {
    justify-content: space-between;
}

.actions.actions-photographerId .del {
    font-size: 14px;
}
</style>
