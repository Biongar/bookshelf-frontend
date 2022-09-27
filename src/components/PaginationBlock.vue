<template>
  <nav class="center mt-3" aria-label="entry-list">
    <p>Страница {{ pagination.this_page }} из {{ pagination.total_pages }}. Всего записей {{ pagination.count }}.</p>
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: pagination.previous === null }">
        <a
          class="page-link"
          :href="pagination.idScrollAnchor ? pagination.idScrollAnchor : `#`"
          aria-label="Назад"
          @click="goPrevPage()"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li
        v-for="n in pagination.total_pages"
        :key="n"
        class="page-item"
        v-bind="{
          class: { active: n === pagination.this_page },
        }"
      >
        <a
          class="page-link"
          :href="pagination.idScrollAnchor ? pagination.idScrollAnchor : `#`"
          @click="goNumPage(Number(n))"
          >{{ n }}</a
        >
      </li>
      <li class="page-item" :class="{ disabled: pagination.next === null }">
        <a
          class="page-link"
          :href="pagination.idScrollAnchor ? pagination.idScrollAnchor : `#`"
          aria-label="Вперед"
          @click="goNextPage()"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { IPaginationData, IPaginationResponse } from '@/types/IPagination'
import { reactive, watch } from 'vue'

const props = defineProps<{
  paginationData: IPaginationData
}>()

const emits = defineEmits<{
  (e: 'getItemsListPages', page_num: number, page_size: number): void
}>()

interface Pagination {
  this_page: number
  total_pages: number
  page_size: number
  count: number
  next: string | null
  previous: string | null
  this_url: string | number
  idScrollAnchor: string | null
}

const pagination = reactive<Pagination>({
  this_page: 0,
  total_pages: 0,
  page_size: props.paginationData.defaultPageSize,
  count: 0,
  next: null,
  previous: null,
  this_url: '',
  idScrollAnchor: props.paginationData.idScrollAnchor,
})

watch(
  () => props.paginationData.triggerRefrash,
  async () => {
    await goRefreshPage(Boolean(props.paginationData.refrashReset))
  }
)

watch(
  () => props.paginationData.triggerPageGenerate,
  () => {
    pageGenerate(props.paginationData.pageGenerateData, props.paginationData.thisPage)
  }
)

const pageGenerate = (responsePageInfo: IPaginationResponse, thisPage: number): void => {
  pagination.count = responsePageInfo.count
  pagination.next = responsePageInfo.next
  pagination.previous = responsePageInfo.previous
  pagination.this_url = thisPage
  pagination.total_pages = Math.ceil(responsePageInfo.count / pagination.page_size)
  const url_str = `?page_num=${thisPage}&page_size=${pagination.page_size}`
  if (url_str.indexOf('page_num') !== -1) {
    const arrayRegExp: string[] | null = url_str.match(/page_num=(\d*)/)
    if (arrayRegExp) {
      pagination.this_page = Number(arrayRegExp[1])
    }
  } else {
    pagination.this_page = 1
  }
}

const goNextPage = (): void => {
  if (pagination.next !== null) {
    emits('getItemsListPages', pagination.this_page + 1, pagination.page_size)
  } else {
    console.log('Ошибка, pagination.next === null')
  }
}

const goPrevPage = (): void => {
  if (pagination.previous) {
    emits('getItemsListPages', pagination.this_page - 1, pagination.page_size)
  } else {
    console.log('Ошибка, pagination.previous === null')
  }
}

const goNumPage = (num: number): void => {
  if (num > 0) {
    emits('getItemsListPages', num, pagination.page_size)
  } else {
    console.log('Ошибка, num <= 0')
  }
}

const goRefreshPage = (reset?: boolean): void => {
  if (!reset && pagination.this_page) {
    emits('getItemsListPages', pagination.this_page, pagination.page_size)
  } else {
    pagination.this_url = ''
    pagination.this_page = 0
    emits('getItemsListPages', 1, pagination.page_size)
  }
}
</script>
