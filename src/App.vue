<template>
    <f7-app>
      <IphoneUI>
        <router-view />
      </IphoneUI>
    </f7-app>
</template>

<script setup>
import IphoneUI from './components/IphoneUI.vue'
</script>

<style>
body {
  background: #242424 !important;
}
</style>