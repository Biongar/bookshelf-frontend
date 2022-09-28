<template>
  <div class="m-5 create-button" @click="$router.push({ name: 'bookshelf-create' })">
    <font-awesome-icon class="fa-4x" :icon="['fas', 'plus']" />
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
  border: 3px solid teal;
  border-radius: 50%;
  transition: 0.3s;
}

.create-button:hover {
  background-color: white;
}
</style>
