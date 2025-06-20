<template>
    <div class="frame-content">
        <img class="welcome-logo" src="/public/img/logo-13.svg" alt="Logo">
        <div class="welcome-button">
            <router-link to="/register">
                <button class="sign-up-button">Sign Up</button>
            </router-link>
            <router-link to="/login">
                <button class="login-button">LOGIN</button>
            </router-link>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
.frame-content {
    background-image: linear-gradient(#000000b3, #000000b3), url(https://www.soonnetmall.com/img/category-1.BZOxzEFL.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    width: 100%;
    position: absolute;
    font-family: 'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', Arial, Helvetica, system-ui, Avenir, sans-serif;
}

.welcome-logo {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: auto;
}

.welcome-button {
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.welcome-button button {
    border-radius: 5px;
    padding: 10px 20px;
    margin: 0 10px;
    cursor: pointer;
    font-size: 16px;
    width: 200px;
    margin-bottom: 10px;
}

.welcome-button button:hover {
    opacity: 0.8;
    border: 1px solid #198654;
}

.login-button {
    background-color: transparent;
    border: 1px solid #fff;
}

</style>
