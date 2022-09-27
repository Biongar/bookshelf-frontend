import type { ComputedRef } from 'vue'

export interface IPaginationsRequest {
  page_num: number
  page_size: number
}

export interface IPaginationResponse {
  count: number
  next: string | null
  previous: string | null
}

export interface IPaginationData {
  // Количество записей на страницу
  defaultPageSize: number
  // ID элемента, на который прокурчивать при смене страницы, например #top-item-list
  idScrollAnchor: string
  // Триггер запуска обновления страницы (добавлять +1)
  triggerRefrash: number | ComputedRef<number>
  // Флаг необходимости сброса на 1 страницу
  refrashReset: boolean | ComputedRef<boolean>
  // Триггер генерации страницы (добавлять +1)
  triggerPageGenerate: number
  // Объект с параметрами пагинации для текущей страницы с бэкенда
  pageGenerateData: IPaginationResponse
  // Номер текущей страницы
  thisPage: number
}
