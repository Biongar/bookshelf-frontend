<template>
  <div class="row mt-5">
    <div class="col-sm-12 col-md-6 text-center">
      <img :src="book.photo" class="img-fluid" style="height: 380px" alt="..." />
    </div>
    <div class="col-sm-12 mt-5 mt-sm-5 mt-md-0 col-md-6">
      <table class="table mb-0">
        <tbody>
          <tr>
            <td>Название:</td>
            <td class="text-end">{{ book.title }}</td>
          </tr>
          <tr>
            <td>Автор:</td>
            <td class="text-end">{{ book.author }}</td>
          </tr>
          <tr>
            <td>Рейтинг:</td>
            <td class="text-end">
              <font-awesome-icon v-for="(n, index) in book.rating" :key="index" :icon="['fas', 'star']" />
            </td>
          </tr>
          <tr>
            <td>Прочитано:</td>
            <td v-if="book.is_read" class="text-end">Да</td>
            <td v-else class="text-end">Нет</td>
          </tr>
          <tr>
            <td>Рецензию создал(а):</td>
            <td class="text-end">{{ book.user_created.username }}</td>
          </tr>
          <tr>
            <td>Дата создания рецензии:</td>
            <td class="text-end">{{ DateFunc.getDateRus(book.date_created) }}</td>
          </tr>
          <tr>
            <td>Дата обновления рецензии:</td>
            <td class="text-end">{{ DateFunc.getDateRus(book.date_updated) }}</td>
          </tr>
          <tr v-if="book.user_created.id === currentUser.id">
            <td>Действия:</td>
            <td class="text-end">
              <div class="btn-group">
                <button class="btn btn-success" @click="updateBook">Изменить</button>
                <button class="btn btn-danger" @click="deleteBook">Удалить</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="row mt-5">
    <h2 class="text-muted text-center">Рецензия</h2>
    <p>{{ book.description }}</p>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import http from '@/http-common'
import type { IBook } from '@/types/bookshelf/IBook'
import DateFunc from '@/utils/DateFunc'

const router = useRouter()
const route = useRoute()

const currentUser = JSON.parse(localStorage.getItem('thisUser')).userdata

const book = ref<IBook>({
  id: 0,
  user_created: {
    id: 0,
    username: '',
    email: '',
    first_name: '',
    last_name: '',
  },
  title: '',
  description: '',
  author: '',
  photo: '',
  rating: 0,
  is_read: false,
  date_created: '',
  date_updated: '',
})

function getBook() {
  const apiPath = `bookshelf/books/${route.params.id}`
  http
    .get(apiPath)
    .then((response) => {
      book.value = response.data
    })
    .catch((error) => {
      alert(error)
    })
}

function deleteBook() {
  if (confirm('Вы уверены что хотите удалить книгу? Это действие невозможно будет отменить.')) {
    const apiPath = `bookshelf/books/${book.value.id}`
    http
      .delete(apiPath)
      .then(() => {
        router.push({ name: 'bookshelf-index' })
      })
      .catch((error) => {
        alert(error)
      })
  }
}

function updateBook() {
  router.push({ name: 'bookshelf-update', params: { id: book.value.id } })
}

onMounted(() => {
  getBook()
})
</script>
<style scoped></style>
