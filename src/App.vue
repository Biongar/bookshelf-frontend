<template>
  <component :is="resolveLayout">
    <RouterView />
  </component>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/users'

import { AxiosInterceptorsSetup } from '@/services/UserDataServise'

import BlankLayout from '@/layouts/BlankLayout.vue'
import ContentLayout from '@/layouts/ContentLayout.vue'

export default defineComponent({
  name: 'App',

  components: {
    BlankLayout,
    ContentLayout,
  },

  setup() {
    const route = useRoute()
    const router = useRouter()
    const userStore = useUserStore()
    new AxiosInterceptorsSetup(
      {
        nameRouteLoginPage: 'login',
      },
      userStore,
      router
    )
    // Определение Layout для текущей страницы
    const resolveLayout = computed(() => {
      if (typeof route.meta.layout == 'undefined') {
        //console.log('Включаем лоадер undefined')
        return null
      }
      if (route.meta.layout === null) {
        //console.log('Отключаем лоадер null')
        return null
      }
      //console.log('Отключаем лоадер layout')
      return (route.meta.layout || 'blank') + '-layout'
    })

    return {
      resolveLayout,
    }
  },
})
</script>

<style lang="scss">
@import '@/styles/scss/app.scss';
</style>
