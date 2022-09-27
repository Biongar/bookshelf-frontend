<template>
  <nav class="sidebar js-sidebar" :class="{ collapsed: !store.getVisibleSidebar }">
    <div class="sidebar-content">
      <router-link class="sidebar-brand" :to="{ name: 'index' }">
        <span class="align-middle">VinAuto</span>
      </router-link>
      <ul class="sidebar-nav">
        <li class="sidebar-header">Разделы</li>
        <router-link
          v-for="link in menuDataList"
          :key="link.name_url"
          v-slot="{ navigate, href, isExactActive }"
          custom
          :to="{ name: link.name_url }"
        >
          <li
            class="sidebar-item"
            :class="[isExactActive ? 'active' : '', indexActivClass(link.name_url), subActivClass(link.name_url)]"
          >
            <a class="sidebar-link" :href="href" @click="navigate">
              <font-awesome-icon :icon="['fas', link.icon]" />
              <span class="align-middle">{{ link.title }}</span>
            </a>
          </li>
        </router-link>
        <hr />
        <router-link :to="{ name: 'login' }">
          <li>
            <a class="sidebar-link" href="#" @click="logout()">
              <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
              <span class="align-middle">Выход</span>
            </a>
          </li>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useUserStore } from '@/stores/users'
import { useStore } from '@/stores/index'
import { useRoute } from 'vue-router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faClipboard, faRightFromBracket, faBook } from '@fortawesome/free-solid-svg-icons'
library.add(faHome, faClipboard, faRightFromBracket, faBook)

export default defineComponent({
  name: 'NavbarComponentLayout',
  components: {},
  props: {
    title: {
      type: String,
      required: true,
    },
  },

  setup() {
    const userStore = useUserStore()
    const store = useStore()
    const route = useRoute()

    const menuDataList = [
      {
        title: 'Главная',
        name_url: 'index',
        icon: 'home',
        exact: true,
      },
      {
        title: 'Пример',
        name_url: 'example-index',
        icon: 'book',
      },
    ]

    if (import.meta.env.VITE_ENV_TYPE == 'stage') {
      // const devMenuDataList = [
      //   {
      //     title: 'Журнал запросов ИТ',
      //     name_url: 'it-journal',
      //     icon: 'clipboard',
      //   },
      // ]
      // menuDataList.push(...devMenuDataList)
    } else if (import.meta.env.VITE_ENV_TYPE == 'dev' && import.meta.env.DEV) {
      // const devMenuDataList = [
      //   {
      //     title: 'Журнал запросов ИТ',
      //     name_url: 'it-journal',
      //     icon: 'clipboard',
      //   },
      // ]
      // menuDataList.push(...devMenuDataList)
    }

    const logout = (): void => {
      userStore.logout()
    }

    const subActiveLinks = ref<string[]>([])
    const subActivClass = (name_url: string): string => {
      const res = subActiveLinks.value.find((key) => key === name_url)
      if (res) return 'active'
      return ''
    }

    const indexActivClass = (name_url: string): string => {
      const res = name_url == 'index' && route.name == 'dashboard'
      if (res) return 'active'
      return ''
    }

    watch(
      () => route.name,
      () => {
        if (typeof route.meta.breadcrumb != 'undefined') {
          const breadcrumb: [] = route.meta.breadcrumb ? (route.meta.breadcrumb as []) : []
          subActiveLinks.value = breadcrumb.map((data: { link: string }) => {
            return data.link && data.link !== 'index' ? data.link : ''
          })
        }
      }
    )

    return {
      menuDataList,
      subActivClass,
      indexActivClass,
      logout,
      store,
    }
  },
})
</script>

<style lang="sass"></style>
