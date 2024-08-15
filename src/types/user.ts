import { ConversationType } from './conversation'

export type UserType = {
  id: number
  created_at: Date
  update_at: Date
  deleted_at: Date | null
  email: string
  username: string
  password: string
  isVerified: string
  verificationToken: string
  role: string
  threadsCreated: ConversationType[]
}
