import http from '@/http-common'
import type { AxiosInstance } from 'axios'
import type { IConfigAxiosInterceptorsSetup, IThisUser } from '@/types/IUser'

// Работа с юзером
class UserDataServiseClass {
  login(login: string, password: string): Promise<any> {
    return http.post('/account/jwt/create/', {
      email: login,
      password: password,
    })
  }

  getThisUser(): Promise<any> {
    return http.get('/account/users/me/')
  }

  refresh(token: any): Promise<any> {
    return http.post('/account/jwt/refresh/', {
      refresh: token,
    })
  }

  // Шаблон объекта юзера
  getEmptyUser(): IThisUser {
    return {
      userdata: null,
      tokenAccess: null,
      tokenRefresh: null,
    }
  }

  // Получить объект юзера в localStorage или шаблон объекта
  getThisUserLocal(): IThisUser {
    //console.log('getThisUserLocal')
    return JSON.parse(localStorage.getItem('thisUser') || JSON.stringify(this.getEmptyUser()))
  }

  // Сохранить объект юзера в localStorage
  setThisUserLocal(thisUser: IThisUser): void {
    //console.log('setThisUserLocal: ', thisUser)
    localStorage.setItem('thisUser', JSON.stringify(thisUser))
  }

  // Очистить объект юзера в localStorage
  removeThisUserLocal(): void {
    //console.log('removeThisUserLocal: ', this.getEmptyUser())
    localStorage.setItem('thisUser', JSON.stringify(this.getEmptyUser()))
    //localStorage.removeItem('thisUser')
  }
}
export const UserDataServise = new UserDataServiseClass()

class AxiosInterceptorsSetupClass {
  configClass: IConfigAxiosInterceptorsSetup
  store: any
  router: any
  axiosInstance: AxiosInstance

  constructor(config: IConfigAxiosInterceptorsSetup, store: any, router: any, axiosInstance?: AxiosInstance) {
    this.configClass = config
    this.store = store
    this.router = router
    this.axiosInstance = axiosInstance || http

    this.setupRequestInterceptor()
    this.setupResponseInterceptor()
  }

  async setupRequestInterceptor(): Promise<any> {
    // Перехват запроса на сервер
    this.axiosInstance.interceptors.request.use(
      (config: any) => {
        const tokenAccess = this.store.getTokenAccess
        const tokenType = this.store.getTokenType

        if (tokenAccess) {
          const nConfig = {
            ...config,
            headers: {},
          }

          nConfig.headers.Authorization = `${tokenType} ${tokenAccess}`
          nConfig.headers['Content-type'] = 'application/json'

          return nConfig
        }
        return config
      },
      (error: any) => {
        return Promise.reject(error)
      }
    )
  }

  async setupResponseInterceptor(): Promise<any> {
    // Перехват ответа от сервера
    let refreshRequest: any = null
    this.axiosInstance.interceptors.response.use(
      (config: any) => {
        //console.log('config ', config)
        return config
      },
      async (error: any) => {
        const {
          config,
          response: { status, data },
        } = error

        const tokenRefresh = this.store.getTokenRefresh
        const tokenType = this.store.getTokenType

        if (status !== 401 || config._retry) {
          return Promise.reject(error)
        }
        if (config.url.includes('/account/jwt/create/') || config.url.includes('/account/jwt/refresh/')) {
          //console.log('UserDataServises 131')
          return Promise.reject(error)
        }

        if (!tokenRefresh) {
          //console.log('UserDataServises 136')
          this.store.logout()
          this.router.push({ name: this.configClass.nameRouteLoginPage })
          return Promise.reject(error)
        }

        if (!refreshRequest) {
          refreshRequest = this.axiosInstance
            .post('/account/jwt/refresh/', { refresh: tokenRefresh })
            .then(async (response) => {
              const resultRefresh = await this.store.refresh({
                access: response.data.access,
                refresh: response.data.refresh,
              })
              if (resultRefresh) {
                return Promise.resolve(response)
              } else {
                //console.log('UserDataServises 156')
                this.store.logout()
                return Promise.reject(error)
              }
            })
            .catch((e: Error) => {
              //console.log('UserDataServises 162: ', e)
              this.store.logout()
              this.router.push({ name: this.configClass.nameRouteLoginPage })
              return Promise.reject(e)
            })
        }

        const responseRefreshData = await refreshRequest

        if (!responseRefreshData.data.access || !responseRefreshData.data.refresh) {
          //console.log('UserDataServises 175')
          this.store.logout()
          this.router.push({ name: this.configClass.nameRouteLoginPage })
          return Promise.reject(error)
        }

        const nConfig = {
          ...config,
          _retry: true,
          headers: {},
        }

        nConfig.headers.Authorization = `${tokenType} ${responseRefreshData.data.access}`
        nConfig.headers['Content-type'] = 'application/json'

        refreshRequest = null

        const _response = await this.axiosInstance(nConfig)
        console.log('Обновление токена успешно!', _response)
        return _response
      }
    )
  }
}
export const AxiosInterceptorsSetup = AxiosInterceptorsSetupClass
