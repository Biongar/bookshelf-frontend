// https://pinia.vuejs.org/cookbook/migration-vuex.html#converting-a-single-module

import { defineStore } from 'pinia'

interface State {
  firstName: string
  lastName: string
  userId: number | null
}

export const useAuthUserStore = defineStore('auth/user', {
  // convert to a function
  state: (): State => ({
    firstName: '',
    lastName: '',
    userId: null,
  }),

  getters: {
    fullName: (state) => `${state.firstName} ${state.lastName}`,
  },

  actions: {
    // no context as first argument, use `this` instead
    async loadUser(id: number) {
      if (this.userId !== null) throw new Error('Already logged in')
      // const res = await api.user.load(id);
      const res = {
        firstName: 'string',
        lastName: 'string',
        userId: id,
      }

      this.updateUser(res)
    },
    // mutations can now become actions, instead of `state` as first argument use `this`
    updateUser(payload: { firstName: string; lastName: string; userId: number | null }) {
      this.firstName = payload.firstName
      this.lastName = payload.lastName
      this.userId = payload.userId
    },
    // easily reset state using `$reset`
    clearUser() {
      this.$reset()
    },
  },
})
