<template>
  <div class="page">
    <div class="navbar">
      <div class="navbar-bg"></div>
      <div class="navbar-inner sliding">
        <div class="title">Dialog</div>
      </div>
    </div>
    <div class="page-content">
      <div class="block block-strong-ios block-outline-ios">
        <p>There are 1:1 replacements of native Alert, Prompt and Confirm modals. They support callbacks, have very easy
          api and can be combined with each other. Check these examples:</p>
        <p class="grid grid-cols-3 grid-gap">
          <button class="button button-fill" @click="openAlert">Alert</button>
          <button class="button button-fill" @click="openConfirm">Confirm</button>
          <button class="button button-fill" @click="openPrompt">Prompt</button>
        </p>
        <p class="grid grid-cols-2 grid-gap">
          <button class="button button-fill" @click="openLogin">Login</button>
          <button class="button button-fill" @click="openPassword">Password</button>
        </p>
      </div>
      <div class="block-title">Vertical Buttons</div>
      <div class="block block-strong-ios block-outline-ios">
        <p>
          <button class="button button-fill" @click="openVerticalButtons">Vertical Buttons</button>
        </p>
      </div>
      <div class="block-title">Preloader Dialog</div>
      <div class="block block-strong-ios block-outline-ios">
        <p class="grid grid-cols-2 grid-gap">
          <button class="button button-fill" @click="openPreloader">Preloader</button>
          <button class="button button-fill" @click="openCustomPreloader">Custom Text</button>
        </p>
      </div>
      <div class="block-title">Progress Dialog</div>
      <div class="block block-strong-ios block-outline-ios">
        <p class="grid grid-cols-2 grid-gap">
          <button class="button button-fill" @click="openInfiniteProgress">Infinite</button>
          <button class="button button-fill" @click="openDeterminedProgress">Determined</button>
        </p>
      </div>
      <div class="block-title">Dialogs Stack</div>
      <div class="block block-strong-ios block-outline-ios">
        <p>This feature doesn't allow to open multiple dialogs at the same time, and will automatically open next dialog
          when you close the current one. Such behavior is similar to browser native dialogs: </p>
        <p>
          <button class="button button-fill" @click="openAlerts">Open Multiple Alerts</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()

function openAlert() {
  proxy.$f7.dialog.alert('Hello!')
}
function openConfirm() {
  proxy.$f7.dialog.confirm('Are you feel good today?', () => {
    proxy.$f7.dialog.alert('Great!')
  })
}
function openPrompt() {
  proxy.$f7.dialog.prompt('What is your name?', (name) => {
    proxy.$f7.dialog.confirm('Are you sure that your name is ' + name + '?', () => {
      proxy.$f7.dialog.alert('Ok, your name is ' + name)
    })
  })
}
function openLogin() {
  proxy.$f7.dialog.login('Enter your username and password', (username, password) => {
    proxy.$f7.dialog.alert('Thank you!<br />Username:' + username + '<br />Password:' + password)
  })
}
function openPassword() {
  proxy.$f7.dialog.password('Enter your password', (password) => {
    proxy.$f7.dialog.alert('Thank you!<br />Password:' + password)
  })
}
function openAlerts() {
  proxy.$f7.dialog.alert('Alert 1')
  proxy.$f7.dialog.alert('Alert 2')
  proxy.$f7.dialog.alert('Alert 3')
  proxy.$f7.dialog.alert('Alert 4')
  proxy.$f7.dialog.alert('Alert 5')
}
function openVerticalButtons() {
  proxy.$f7.dialog.create({
    title: 'Vertical Buttons',
    buttons: [
      { text: 'Button 1' },
      { text: 'Button 2' },
      { text: 'Button 3' }
    ],
    verticalButtons: true,
  }).open()
}
function openPreloader() {
  proxy.$f7.dialog.preloader()
  setTimeout(() => {
    proxy.$f7.dialog.close()
  }, 3000)
}
function openCustomPreloader() {
  proxy.$f7.dialog.preloader('My text...')
  setTimeout(() => {
    proxy.$f7.dialog.close()
  }, 3000)
}
function openInfiniteProgress() {
  proxy.$f7.dialog.progress()
  setTimeout(() => {
    proxy.$f7.dialog.close()
  }, 3000)
}
function openDeterminedProgress() {
  let progress = 0
  const dialog = proxy.$f7.dialog.progress('Loading assets', progress)
  dialog.setText('Image 1 of 10')
  const interval = setInterval(() => {
    progress += 10
    dialog.setProgress(progress)
    dialog.setText('Image ' + (progress / 10) + ' of 10')
    if (progress === 100) {
      clearInterval(interval)
      dialog.close()
    }
  }, 300)
}
</script>