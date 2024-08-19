import { UserType } from './user'

type MessageThread = {
  id: number
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
  title: string
  context?: string
}

type RepliedMessageType = {
  id: number | string
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
  content: string
}

export type MessageType = {
  id: number | string
  created_at?: Date
  update_at?: Date
  delete_at?: Date | null
  content: string
  replyTo: RepliedMessageType | null
  thread?: MessageThread
}

export type MessageResponseType = {
  data: MessageType[]
  meta: {
    page: number
    total_page: number
  }
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
  deleted_at: Date | null
}
