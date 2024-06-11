<template>
  <v-card class="mx-auto mt-[200px]" text="..." height="400px" max-width="344px">
    <template #title>
      <v-card-title>注册</v-card-title>
    </template>
    <template #text>
      <v-text-field v-model="username" label="用户名"></v-text-field>
      <v-text-field v-model="password" label="密码" type="password"></v-text-field>
      <v-text-field v-model="email" label="邮箱" type="email"> </v-text-field>
    </template>
    <template #actions>
      <v-btn class="mx-auto" variant="tonal" @click="handleSubmit"> 提交 </v-btn>
    </template>
  </v-card>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const email = ref('')

const handleSubmit = () => {
  fetch('/api/user/regist', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
      email: email.value,
    }),
  })
}
</script>
<style></style>
