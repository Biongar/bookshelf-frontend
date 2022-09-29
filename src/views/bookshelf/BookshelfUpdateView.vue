<template>
  <div>
    <h1>Изменить рецензию</h1>
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
        <div v-if="!isChangingPhoto" class="mb-3 col-sm-12 col-md-6">
          <label class="form-label">Фото</label>
          <button class="form-control btn btn-primary" @click="editPhoto">Сменить фото</button>
        </div>
        <div v-else class="mb-3 col-sm-12 col-md-6">
          <label class="form-label">Фото</label>
          <input ref="photo" type="file" :required="isChangingPhoto" class="form-control" @change="onFileChange" />
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
          <button type="submit" class="btn btn-primary" @click="updateBook">Изменить рецензию</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import http from '@/http-common'
import type { IBook } from '@/types/bookshelf/IBook'

interface IRating {
  name: number
  value: number
}

const route = useRoute()
const router = useRouter()

const currentUser = JSON.parse(localStorage.getItem('thisUser')).userdata
const photo = ref<any>(null)
const isChangingPhoto = ref<boolean>(false)

const isError = ref<boolean>(false)

function getRatingChoices(): IRating[] {
  const ratingChoices = []
  for (let i = 1; i < 11; i++) {
    ratingChoices.push({ name: i, value: i })
  }
  return ratingChoices
}

const book = ref<IBook>({
  title: '',
  description: '',
  author: '',
  rating: 1,
  is_read: false,
})

function editPhoto() {
  isChangingPhoto.value = true
  book.value.photo = ''
}

function onFileChange(e: any) {
  book.value.photo = e.target.files[0] || e.dataTransfer.files[0]
}

function updateBook() {
  if (!book.value.title || !book.value.author || (!book.value.photo && isChangingPhoto.value)) {
    isError.value = true
    setInterval(() => {
      isError.value = false
    }, 5000)
  } else {
    const apiPath = `bookshelf/books/${route.params.id}/`
    const formdata = new FormData()
    formdata.append('title', book.value.title)
    formdata.append('description', book.value.description)
    formdata.append('author', book.value.author)
    if (book.value.photo) {
      formdata.append('photo', book.value.photo)
    }
    formdata.append('rating', book.value.rating)
    formdata.append('is_read', book.value.is_read)
    http
      .patch(apiPath, formdata)
      .then((response) => {
        router.push({ name: 'bookshelf-detail', params: { id: response.data.id } })
      })
      .catch((error) => {
        alert(error)
      })
  }
}

function checkPermissions(obj: IBook) {
  if (obj.user_created.id !== currentUser.id) {
    router.push({ name: 'page404' })
  }
}

function getBook() {
  const apiPath = `bookshelf/books/${route.params.id}`
  http
    .get(apiPath)
    .then((response) => {
      checkPermissions(response.data)
      book.value = response.data
      delete book.value.photo
    })
    .catch((error) => {
      alert(error)
    })
}

onMounted(() => {
  getBook()
})
</script>
<style scoped></style>
