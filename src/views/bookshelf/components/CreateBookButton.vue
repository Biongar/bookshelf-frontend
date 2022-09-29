<template>
  <div class="m-5 create-button" @click="$router.push({ name: 'bookshelf-create' })">
    <font-awesome-icon class="fa-4x" :icon="['fas', 'book']" />
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.create-button {
  z-index: 10;
  position: fixed;
  bottom: 0;
  right: 0;
  color: teal;
  transition: 0.3s;
}

.create-button:hover {
  color: rgb(0, 61, 61);
}
</style>
