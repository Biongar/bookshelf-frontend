import { useStore } from '@/stores/index'
import type { IResponseError } from '@/types/IResponseData'

class ErrorFuncClass {
  setDefaultErrorMessage(err: IResponseError, body?: string): void {
    const store = useStore()
    if (err.response) {
      // клиент получил ответ об ошибке (5xx, 4xx)
      store.addMessageToast({
        id: Date.now(),
        type: 'danger',
        header: 'Ошибка!',
        body: body ? body : 'Не выполнено, так как имеются ошибки.',
      })
    } else if (err.request) {
      // клиент так и не получил ответа, или запрос так и не ушел
      // console.log(err.request)
      store.addMessageToast({
        id: Date.now(),
        type: 'danger',
        header: 'Ошибка!',
        body: 'Ошибка соединения с API.',
      })
    } else {
      // что-нибудь еще
      //console.log('anything else')
      store.addMessageToast({
        id: Date.now(),
        type: 'danger',
        header: 'Ошибка!',
        body: 'Отсутствует соединение с API.',
      })
    }
  }
}
export const ErrorFunc = new ErrorFuncClass()
