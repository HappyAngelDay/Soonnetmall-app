<template>
    <div class="frame">
        <div class="frame-content">
            <div class="frame-content-header">
                <!-- 狀態列/頂部區域 -->
                <div class="frame-header">
                    <div class="frame-header-speaker"></div>
                    <div class="frame-header-camera"></div>
                </div>
                <div class="container">
                    <div class="header-bars">
                        <div class="header-bars-block">
                            <span>{{ currentTime }}</span>
                        </div>
                        <div class="header-bars-block">
                            <i class="fa fa-signal" aria-hidden="true"></i>
                            <i class="fa fa-wifi" aria-hidden="true"></i>
                            <i class="fa fa-battery-full" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 直接 slot，不要 frame-content-body -->
            <slot></slot>
            <div class="frame-content-bottom">
                <div class="bottom-shape"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentTime = ref('')

function updateTime() {
    const now = new Date()
    const h = now.getHours().toString().padStart(2, '0')
    const m = now.getMinutes().toString().padStart(2, '0')
    currentTime.value = `${h}:${m}`
}

let timer = null
onMounted(() => {
    updateTime()
    timer = setInterval(updateTime, 1000 * 10) // 每10秒更新一次
})
onUnmounted(() => {
    clearInterval(timer)
})
</script>

<style scoped>
.frame {
    height: 655px;
    background-color: #ffffff;
    position: relative;
    margin: 0px auto;
    border: 6px solid #bdbbbb;
    border-radius: 55px;
    box-shadow: 14px 21px 42px 10px rgba(0, 0, 0, .2);
    font-family: 'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', Arial, Helvetica, system-ui, Avenir, sans-serif;
}

.frame-content {
    position: relative;
    width: 292px;
    height: 622px;
    background-color: #ffffff;
    border: 16px solid #202020;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 47px;
    overflow: hidden;
    font-family: inherit;
}

.frame-header {
    position: absolute;
    width: 140px;
    height: 24px;
    top: -2px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #202020;
    border-radius: 0 0 23px 23px;
    z-index: 999;
}

.container {
    position: absolute;
    top: 3px;
    left: 20px;
    width: 90%;
    z-index: 999;
}

.frame-header-speaker {
    margin-top: 6px;
    width: 40px;
    height: 4px;
    background-color: #404040;
    margin-left: auto;
    margin-right: auto;
}

.frame-header-camera {
    position: absolute;
    width: 7px;
    height: 7px;
    right: 40px;
    top: 2px;
    background-color: #090A50;
    border: 3px solid #404040;
    border-radius: 50%;
}

.header-bars {
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #ffffff;
}

.header-bars-block {
    display: flex;
    align-items: center;
    font-size: 12px;
}

.header-bars-block i {
    margin-right: 5px;
}
</style>
