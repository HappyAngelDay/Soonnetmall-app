<template>
<v-date-picker></v-date-picker>
</template>

<script setup> 
  import { useDate } from 'vuetify'

  const date = useDate()

  console.log(date.getMonth(new Date('March 1, 2021'))) // 2
</script>