<template>
  <div class="breadcrumb">
    <ul>
      <li
        v-for="(breadcrumb, idx) in breadcrumbList"
        :key="idx"
        :class="{ linked: !!breadcrumb.link }"
        @click="routeTo(idx)"
      >
        {{ breadcrumb.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

interface Breadcrumb {
  name: string
  link?: string
}

const breadcrumbList = ref<Breadcrumb[]>([])

const routeTo = (pRouteTo: number): void => {
  if (breadcrumbList.value[pRouteTo].link) router.push({ name: breadcrumbList.value[pRouteTo].link })
}

const updateList = (): void => {
  if (typeof route.meta.breadcrumb == 'undefined') {
    breadcrumbList.value = [{ name: 'Главная' }]
  } else {
    breadcrumbList.value = route.meta.breadcrumb as Breadcrumb[]
  }
}
updateList()

watch(
  () => route.meta.breadcrumb,
  () => {
    updateList()
  }
)
</script>
<style lang="scss" scoped>
.breadcrumb {
  margin-bottom: 10px;
}
ul {
  display: flex;
  justify-content: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
}
ul > li {
  display: flex;
  float: left;
  height: 10px;
  width: auto;
  // color: $default;
  font-weight: bold;
  font-size: 0.8em;
  cursor: default;
  align-items: center;
}
ul > li:not(:last-child)::after {
  content: '/';
  float: right;
  font-size: 0.8em;
  margin: 0 0.5em;
  // color: $light-default;
  cursor: default;
}
.linked {
  cursor: pointer;
  font-size: 1em;
  font-weight: normal;
}
</style>
