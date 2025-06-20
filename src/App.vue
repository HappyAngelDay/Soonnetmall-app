<template>
  <v-app>
    <v-main>
      <v-container class="fill-height d-flex justify-center align-center">
        <f7-app>
          <IphoneUI>
            <router-view />
          </IphoneUI>
        </f7-app>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import IphoneUI from './components/IphoneUI.vue'
</script>

<style>
body {
  background: #242424 !important;
}
</style>