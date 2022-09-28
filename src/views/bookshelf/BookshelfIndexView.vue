<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/users'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()
const ThisUser = userStore.$state.thisUser.userdata
if (!ThisUser) router.push({ name: 'login' })
</script>
