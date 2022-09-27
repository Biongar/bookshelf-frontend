import { defineStore } from 'pinia'

interface IExampleState {
  test: string | null
}

export const useStorageWarehouseStore = defineStore('Example', {
  state: (): IExampleState => {
    return {
      test: null,
    }
  },

  getters: {
    //fullName: (state) => `${state.firstName} ${state.lastName}`,
  },

  actions: {},
})
