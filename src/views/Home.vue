<template>
  Главная страница<br /><br />

  {{ message }}
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { onMounted } from 'vue'
export default defineComponent({
  name: 'HomePage',
  setup() {
    const message = ref('Тестовое сообщение')
    onMounted(async () => {
      const response = await fetch('https://reqres.in/api/users/2', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        //credentials: "include",
      })
      const content = await response.json()
      console.log(content)
      message.value = `Привет! ${content.data.first_name}!`
    })
    return {
      message,
    }
  },
})
</script>
