<template>
  <div class="event-info">
    <h2 class="title">{{ activity.name }}</h2>
    <ul class="info-list">
      <div>
        <li>攝影師: {{ activity.totalPhotographer }}</li>
        <li>相片總數: {{ activity.totalPhotos }}</li>
        <div class="identify-info">
          <li>已識別: {{ activity.recognized }}</li>
          <li>未識別: {{ activity.unrecognized }}</li>
          <li>無法辨識: {{ activity.unidentified }}</li>
        </div>
      </div>
      <Countdown></Countdown>
    </ul>
  </div>
</template>

<script setup>
import Countdown from './Countdown.vue';

defineProps({
  activity: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.event-info {
  padding-top: 66px !important;
  padding: 1rem;
  text-align: left;
  color: #fff;
  background-color: rgb(238, 238, 238);
  background-image: linear-gradient(#00000080, #0009), url(https://www.soonnetmall.com/img/banner-2.C3Kk06-o.png);
  background-position: 80% center;
}

.title {
  font-weight: bold;
  font-size: 1.25rem;
}

.info-list {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
  display: flex;
  align-items: flex-end;
}

.info-list li {
  font-size: 14px;
}

.identify-info {
  color: #9c9c9c;
}

.identify-info li {
  font-size: 12px;
}
</style>
