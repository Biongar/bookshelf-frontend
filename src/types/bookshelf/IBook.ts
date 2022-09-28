import type { IUser } from './IUser'

export interface IBook {
  id: number
  user_created: IUser
  title: string
  description: string
  author: string
  photo: string
  rating: number
  is_read: boolean
  date_created: string | Date
  date_updated: string | Date
}
