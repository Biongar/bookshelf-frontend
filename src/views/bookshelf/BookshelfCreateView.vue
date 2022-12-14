<template>
  <div>
    <h1>Создать рецензию</h1>
    <div v-if="isError" class="alert alert-danger" role="alert">Ошибка! Заполните все обязательные поля!</div>
    <form class="card" @submit.prevent>
      <div class="row p-3">
        <div class="mb-3 col-sm-12 col-md-6">
          <label class="form-label">Название книги</label>
          <input v-model="book.title" required type="text" class="form-control" />
        </div>
        <div class="mb-3 col-sm-12 col-md-6">
          <label class="form-label">Автор</label>
          <input v-model="book.author" required type="text" class="form-control" />
        </div>
        <div class="mb-3 col-sm-12 col-md-6">
          <label class="form-label">Фото</label>
          <input ref="photo" type="file" required class="form-control" @change="onFileChange" />
        </div>
        <div class="mb-3 col-sm-12 col-md-6">
          <label class="form-label">Рейтинг</label>
          <select v-model="book.rating" class="form-control">
            <option v-for="rating in getRatingChoices()" :key="rating.name" :value="rating.value">
              {{ rating.name }}
            </option>
          </select>
          <div class="form-text">Введите вашу оценку от 1 до 10, где 10 - хорошо, а 1 - плохо.</div>
        </div>
        <div class="mb-3">
          <textarea v-model="book.description" class="form-control" cols="30" rows="10"></textarea>
        </div>
        <div class="mb-3 form-check d-flex justify-content-end">
          <input v-model="book.is_read" type="checkbox" class="form-check-input" />
          <label class="form-label">Прочитано</label>
        </div>
        <div class="d-flex justify-content-end">
          <button type="submit" class="btn btn-primary" @click="createBook">Создать рецензию</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import http from '@/http-common'
import type { IBook } from '@/types/bookshelf/IBook'

interface IRating {
  name: number
  value: number
}

const router = useRouter()
const photo = ref<any>(null)
const isError = ref<boolean>(false)

function getRatingChoices(): IRating[] {
  const ratingChoices = []
  for (let i = 1; i < 11; i++) {
    ratingChoices.push({ name: i, value: i })
  }
  return ratingChoices
}

const book = reactive<IBook>({
  title: '',
  description: '',
  author: '',
  photo: '',
  rating: 1,
  is_read: false,
})

function onFileChange(e: any) {
  book.photo = e.target.files[0] || e.dataTransfer.files[0]
}

function createBook() {
  if (!book.title || !book.author || !book.photo) {
    isError.value = true
    setInterval(() => {
      isError.value = false
    }, 5000)
  } else {
    const apiPath = 'bookshelf/books/'
    const formdata = new FormData()
    formdata.append('title', book.title)
    formdata.append('description', book.description)
    formdata.append('author', book.author)
    formdata.append('photo', book.photo)
    formdata.append('rating', book.rating)
    formdata.append('is_read', book.is_read)
    http
      .post(apiPath, formdata)
      .then((response) => {
        router.push({ name: 'bookshelf-detail', params: { id: response.data.id } })
      })
      .catch((error) => {
        alert(error)
      })
  }
}

onMounted(() => {
  photo.value.focus()
})
</script>
<style scoped></style>
