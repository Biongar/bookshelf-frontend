// https://pinia.vuejs.org/cookbook/migration-vuex.html#converting-a-single-module

import { defineStore } from 'pinia'
import { UserDataServise } from '@/services/UserDataServise'
import type { IResponseData } from '@/types/IResponseData'
import type { IThisUser, ILoginAuth, IRefreshResponse } from '@/types/IUser'

interface State {
  AUTH_HEADER_TYPES: string
  thisUser: IThisUser
  authorizeStatus: string | null
}

export const useUserStore = defineStore('user', {
  // convert to a function
  state: (): State => ({
    // Заголовок перед токеном
    AUTH_HEADER_TYPES: 'JWT',
    // Объект авторизованного юзера
    thisUser: UserDataServise.getThisUserLocal(),
    // Статус процесса авторизации
    authorizeStatus: null,
  }),

  getters: {
    //fullName: (state) => `${state.firstName} ${state.lastName}`,
    getThisUser: (state): IThisUser => state.thisUser,
    getIsLoggedIn: (state) => !!state.thisUser.tokenAccess,
    getAuthorizeStatus: (state) => state.authorizeStatus,
    getTokenAccess: (state) => state.thisUser.tokenAccess,
    getTokenRefresh: (state) => state.thisUser.tokenRefresh,
    getTokenType: (state) => state.AUTH_HEADER_TYPES,
  },

  actions: {
    // Аутентификация пользователя в системе
    async login(dataAuthUser: ILoginAuth) {
      const user = await UserDataServise.login(dataAuthUser.login, dataAuthUser.password)
        .then(async (response: IResponseData) => {
          if (response.data.access && response.data.refresh) {
            this.thisUser.tokenAccess = response.data.access
            this.thisUser.tokenRefresh = response.data.refresh
            const user = await this.getActualThisUser()
            if (user.id) {
              this.thisUser.userdata = user
              UserDataServise.setThisUserLocal(this.getThisUser)
              return response.data
            } else {
              this.logout()
              throw new Error('Login error')
            }
          } else {
            this.logout()
            throw new Error('Login error')
          }
        })
        .catch((e: Error) => {
          //console.log(e)
          this.logout()
          throw e
        })
      //console.log('async login user ', user)
      return user
    },

    // Сброс аутентификации
    logout() {
      // Сброс аутентификации
      this.thisUser = UserDataServise.getEmptyUser()
      return UserDataServise.removeThisUserLocal()
    },

    // Обновление токенов
    async refresh(tokenData: IRefreshResponse) {
      this.thisUser.tokenAccess = tokenData.access
      this.thisUser.tokenRefresh = tokenData.refresh

      const user = await this.getActualThisUser()

      if (user.id) {
        UserDataServise.setThisUserLocal(this.getThisUser)
        return tokenData.access
      } else {
        this.logout()
        throw new Error('Refresh error')
      }
    },

    // Получить информацию об автризованном пользователе
    async getActualThisUser() {
      const user = await UserDataServise.getThisUser()
        .then((response: IResponseData) => {
          if (response.data.id) {
            //console.log(response.data)
            return response.data
          } else {
            this.logout()
            throw new Error('Get This User error')
          }
        })
        .catch((e: Error) => {
          console.log(e)
          this.logout()
          throw e
        })
      return user
    },
  },
})
