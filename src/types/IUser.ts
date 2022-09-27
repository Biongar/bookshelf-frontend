// Интерфейс данных для авторизации по логину
export interface ILoginAuth {
  login: string
  password: string
}

// Ответ сервера при получении юзера
export interface IUserResponse {
  id: number
  email: string
  first_name?: string
  last_name?: string
  username?: string
}

// Ответ сервера при авторизации
export interface ILoginResponse {
  access: string
  refresh: string
}

// Ответ сервера при Refresh Token
export interface IRefreshResponse {
  access: string
  refresh: string
}

// Интерфейс текущего юзера, который хранится в сторе и localStorage
export interface IThisUser {
  userdata: IUserResponse | null
  tokenAccess: string | null
  tokenRefresh: string | null
}

export type IUser = IUserResponse

export interface IUserObj {
  [key: number]: IUser
}

// Интерфейс объекта конфигурации AxiosInterceptorsSetup
export interface IConfigAxiosInterceptorsSetup {
  nameRouteLoginPage: string
}
