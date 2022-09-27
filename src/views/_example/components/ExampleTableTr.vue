<template>
  <tr>
    <td>{{ props.itemElement.id }}</td>
    <td>{{ props.itemElement.name }}</td>
    <td>{{ props.itemElement.status }}</td>
    <td class="table-action text-end">
      <a href="" @click.prevent="() => {}">
        <font-awesome-icon class="my-icon" :icon="['fas', 'user-check']" />
      </a>
      <a href="" @click.prevent="() => {}">
        <font-awesome-icon class="my-icon" :icon="['fas', 'edit']" />
      </a>
      <a href="" @click.prevent="() => {}">
        <font-awesome-icon class="my-icon" :icon="['fas', 'trash-alt']" />
      </a>
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { IExampleItem } from '@/types/_IExample'

const props = defineProps<{
  itemElement: IExampleItem
}>()
defineEmits<{
  (e: 'update:itemElement', itemElement: IExampleItem): void
}>()
</script>

<style lang="scss" scoped>
.my-icon {
  margin-left: 10px;
  font-size: 1rem;
}
</style>
