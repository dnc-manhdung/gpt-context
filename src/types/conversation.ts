import { UserType } from './user'

export type MessageType = {
  id: number
  type: number
  message: string
}

export type ConversationType = {
  messages: MessageType[]
}

export type ThreadType = {
  title: string
  creator: UserType
  context: string
  id: number
  created_at: Date
  updated_at: Date
  deleted_at: Date
}
