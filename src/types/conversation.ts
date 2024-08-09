export type MessageType = {
  id: number
  type: number
  message: string
}

export type ConversationType = {
  messages: MessageType[]
}
