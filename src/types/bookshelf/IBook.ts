import type { IUser } from './IUser'

export interface IBook {
  id?: number
  user_created?: IUser
  title: string
  description: string
  author: string
  photo: string
  rating: number
  is_read: boolean
  date_created?: Date | string
  date_updated?: Date | string
}
