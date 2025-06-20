<template>
  <div class="steps">
    <p>訂單建立</p>
    <p>訂單確認</p>
    <p>確認支付</p>
    <div class="steps-progress"></div>
    <div class="steps-dot"></div>
  </div>
</template>
<script>
</script>
<style scoped>
.steps {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 15px;
  margin-top: 75px;
  position: relative;
  border-bottom: 1px solid #eee;
  background: #fff;
}

.steps p {
  font-size: 15px;
  color: #bbb;
  margin: 7px 0;
}

.steps-progress {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 2px;
  background: #eee;
  z-index: 1;
}
</style>
