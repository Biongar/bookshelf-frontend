//import http from '@/http-common'

interface IExampleDataServiceBase {
  id: number
  name: string
  status: 'new' | 'in_work' | 'archive'
}

export interface IExampleDataServiceAllResponse {
  data: IExampleDataServiceBase[]
}

export interface IExampleDataServiceSingleResponse {
  data: IExampleDataServiceBase
}

class ExampleDataServiseClass {
  apipath = '/example-dataset'
  getAll(): Promise<IExampleDataServiceAllResponse> {
    //return http.get(`${this.apipath}/`)
    const ExampleDataSet = new ExampleDataSetClass()
    return Promise.resolve({ data: ExampleDataSet.getExampleDataList() })
  }

  get(id: number): Promise<IExampleDataServiceSingleResponse> {
    //return http.get(`${this.apipath}/${id}/`)
    const ExampleDataSet = new ExampleDataSetClass()
    return Promise.resolve({ data: ExampleDataSet.getExampleDataSingle(id) })
  }
}
export const ExampleDataServise = new ExampleDataServiseClass()

class ExampleDataSetClass {
  getExampleDataList(): IExampleDataServiceBase[] {
    const list: IExampleDataServiceBase[] = [
      { id: 1, name: 'Наименование 1', status: 'new' },
      { id: 2, name: 'Наименование 2', status: 'new' },
      { id: 3, name: 'Наименование 3', status: 'new' },
      { id: 4, name: 'Наименование 4', status: 'new' },
      { id: 5, name: 'Наименование 5', status: 'new' },
      { id: 6, name: 'Наименование 6', status: 'new' },
      { id: 7, name: 'Наименование 7', status: 'new' },
      { id: 8, name: 'Наименование 8', status: 'new' },
      { id: 9, name: 'Наименование 9', status: 'new' },
      { id: 10, name: 'Наименование 10', status: 'new' },
      { id: 11, name: 'Наименование 11', status: 'new' },
      { id: 12, name: 'Наименование 12', status: 'new' },
      { id: 13, name: 'Наименование 13', status: 'new' },
      { id: 14, name: 'Наименование 14', status: 'new' },
      { id: 15, name: 'Наименование 15', status: 'new' },
      { id: 16, name: 'Наименование 3434534543', status: 'new' },
      { id: 17, name: 'Наименование 17', status: 'new' },
      { id: 18, name: 'Наименование 18', status: 'new' },
      { id: 19, name: 'Наименование 19', status: 'new' },
    ]
    return list
  }

  getExampleDataSingle(id: number): IExampleDataServiceBase {
    let itemElement = this.getExampleDataList().find((item) => item.id === id)
    if (itemElement === undefined) {
      itemElement = {} as IExampleDataServiceBase
    }
    return itemElement
  }
}
