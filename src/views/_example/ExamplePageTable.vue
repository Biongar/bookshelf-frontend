<template>
  <div class="container-fluid p-0">
    <div class="mb-3">
      <h1 class="h3 d-inline align-middle">Страница с таблицей</h1>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <ExampleTableVue />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ExampleTableVue from './components/ExampleTable.vue'
</script>
