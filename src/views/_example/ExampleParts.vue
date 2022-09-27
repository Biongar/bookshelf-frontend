<template>
  <div class="container-fluid p-0">
    <div class="mb-3">
      <h1 class="h3 d-inline align-middle">Разделы (пример)</h1>
    </div>
    <div class="row">
      <div v-for="link in partsList" :key="link.url_name" class="col-sm-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ link.title }}</h5>
            <p class="card-text">{{ link.description }}</p>
            <router-link :to="{ name: link.url_name }" class="btn btn-primary"> Перейти </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const partsList = [
  {
    title: 'Страница с таблицей',
    description: 'Пример страницы с таблицей',
    url_name: 'example-table',
  },
  {
    title: 'Пустая страница',
    description: 'Шаблон пустой страницы',
    url_name: 'example-empty',
  },
]
</script>
