<template>
  <div class="row">
    <div v-for="book in bookList" :key="book.id" class="col-sm-6 col-md-3">
      <div class="card" @click="$router.push({ name: 'bookshelf-detail', params: { id: book.id } })">
        <img :src="book.photo" class="card-img-top" style="height: 380px" alt="..." />
        <div class="card-body">
          <h5 class="card-title">{{ book.title }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">
            <div class="d-flex justify-content-between">
              <div><font-awesome-icon :icon="['fas', 'star']" />{{ book.rating }}</div>
              <div>
                {{ book.author }}
              </div>
            </div>
          </h6>
        </div>
      </div>
    </div>
    <div class="btn-group">
      <button :class="{ disabled: !pagination.previousPage }" class="btn btn-secondary" @click="changePage(0)">
        Назад
      </button>
      <button :class="{ disabled: !pagination.nextPage }" class="btn btn-primary" @click="changePage(1)">Вперед</button>
    </div>
  </div>
  <CreateBookButton />
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import http from '@/http-common'
import CreateBookButton from '@/views/bookshelf/components/CreateBookButton.vue'
import type { IBook } from '@/types/bookshelf/IBook'

const pagination = {
  page: 1,
  limit: 8,
  nextPage: null,
  previousPage: null,
}
const bookList = ref<[IBook]>()
let currentUserId = JSON.parse(localStorage.getItem('thisUser')).userdata.id

function changePage(direction: number) {
  if (direction) {
    pagination.page += 1
  } else {
    pagination.page -= 1
  }
  window.scrollTo(0, 0)
  getBooks(pagination.limit, pagination.page)
}

function getBooks(page_size: number, page_num: number) {
  const apiPath = `bookshelf/books/?user_created=${currentUserId}&page_size=${page_size}&page_num=${page_num}`
  http
    .get(apiPath)
    .then((response) => {
      bookList.value = response.data.results
      pagination.nextPage = response.data.next
      pagination.previousPage = response.data.previous
    })
    .catch((error) => {
      alert(error)
    })
}

onMounted(() => {
  getBooks(pagination.limit, pagination.page)
})
</script>
<style scoped></style>
