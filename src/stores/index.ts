import { defineStore } from 'pinia'

export interface IToast {
  id: number
  type: 'success' | 'werning' | 'danger' | 'info'
  header: string
  body: string
}

interface IState {
  test: string | null
  messagesToast: IToast[]
  visibleSidebar: boolean
}

export const useStore = defineStore('main', {
  state: (): IState => {
    return {
      test: null,
      messagesToast: [],
      visibleSidebar: true,
    }
  },

  getters: {
    //fullName: (state) => `${state.firstName} ${state.lastName}`,
    getTest: (state) => state.test,
    getMessagesToast: (state) => state.messagesToast,
    getVisibleSidebar: (state) => state.visibleSidebar,
  },

  actions: {
    addMessageToast(toast: IToast) {
      console.log(toast)
      return this.messagesToast.unshift(toast)
    },
    deleteMessageToast(id: number) {
      this.messagesToast = this.messagesToast.filter((toast) => toast.id !== id)
      return this.messagesToast
    },
    toggleVisibleSidebar() {
      this.visibleSidebar = !this.visibleSidebar
      return this.visibleSidebar
    },
  },
})
