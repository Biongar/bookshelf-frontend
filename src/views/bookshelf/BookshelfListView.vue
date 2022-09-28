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
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import http from '@/http-common'
import type { IBook } from '@/types/bookshelf/IBook'

const bookList = ref<[IBook]>()

function getBooks() {
  const apiPath = 'bookshelf/books'
  http
    .get(apiPath)
    .then((response) => {
      bookList.value = response.data.results
    })
    .catch((error) => {
      alert(error)
    })
}

onMounted(() => {
  getBooks()
})
</script>
<style scoped></style>
