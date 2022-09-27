<template>
  <div class="card-header">
    <h5 class="card-title">Пример компонент списка в таблице</h5>
  </div>
  <div id="top-item-list" class="table-responsive">
    <table class="table table-bordered table-hover text-center">
      <thead>
        <tr>
          <th class="text-start" style="width: 10%">ID</th>
          <th class="text-start" style="width: 50%">Наименование</th>
          <th class="text-start" style="width: 40%">Статус</th>
          <th style="min-width: 120px"></th>
        </tr>
      </thead>
      <tbody>
        <ExampleTableTrVue v-for="(item, index) in dataList" :key="index" v-model:itemElement="dataList[index]" />
        <tr v-if="loadingList">
          <td class="text-center" colspan="5">
            <div class="spinner-border" style="width: 1.3rem; height: 1.3rem" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { ExampleDataServise, type IExampleDataServiceAllResponse } from '@/services/_ExampleDataServise'
import type { IExampleItem } from '@/types/_IExample'

import type { IResponseError } from '@/types/IResponseData'
import { ErrorFunc } from '@/utils/ErrorFunc'

import ExampleTableTrVue from './ExampleTableTr.vue'

const dataList = ref<IExampleItem[]>([])
const loadingList = ref<boolean>(false)

const getItemsDataList = () => {
  loadingList.value = true
  ExampleDataServise.getAll()
    .then((response: IExampleDataServiceAllResponse) => {
      dataList.value = response.data
    })
    .catch((err: IResponseError) => {
      ErrorFunc.setDefaultErrorMessage(err, 'Не удалось загрузить список!')
    })
    .finally(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      loadingList.value = false
    })
}

// const deleteElement = (id: number): void => {
//   const indexItem = dataList.value.findIndex((item) => item.id === id)
//   if (indexItem !== -1) dataList.value.splice(indexItem, indexItem + 1)
// }

onMounted(() => getItemsDataList())
</script>

<style lang="scss" scoped></style>
