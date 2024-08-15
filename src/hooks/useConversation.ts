import { threadId } from 'worker_threads'
import { fetchData } from './fetch'

interface NewConversationFormValues {
  title: string
}

interface AddContextFormValues {
  context: string
}

export const useConversation = {
  getConversation: async (id: string | string[]) => {
    setTimeout(() => {}, 5000)

    return {
      code: 1000,
      message: 'Conversation is not existed!',
      data: {
        messages: [
          {
            id: 0,
            type: 0,
            message: 'Who is Thor?'
          },
          {
            id: 1,
            type: 1,
            message: 'Thor is me'
          },
          {
            id: 2,
            type: 0,
            message: 'Who is Thor?'
          },
          {
            id: 3,
            type: 1,
            message: 'Thor is me'
          },
          {
            id: 4,
            type: 0,
            message: 'Who is Thor?'
          },
          {
            id: 5,
            type: 1,
            message: 'Thor is me'
          },
          {
            id: 6,
            type: 0,
            message:
              'Who is Thor? Who is Thor? Who is Thor?Who is Thor?Who is Thor? Who is Thor? Who is Thor? Who is Thor?Who is Thor?Who is Thor?'
          },
          {
            id: 7,
            type: 1,
            message: 'Thor is me'
          }
        ]
      }
    }
  },

  sendQuestion: async (message: string) => {
    setTimeout(() => {}, 10000)

    if (message) {
      return {
        code: 1000,
        message: '',
        data: {
          id: Date.now() + 1,
          message: 'hehe1',
          type: 1
        }
      }
    }

    return {
      code: 1000,
      message: '',
      data: null
    }
  },

  createConversation: async (
    token: string,
    formData: NewConversationFormValues
  ) => {
    return await fetchData('/thread/create', token, formData, 'POST')
  },

  getConversations: async (token: string) => {
    return await fetchData('/thread/findOwnThreads', token, null, 'GET')
  },

  addContext: async (
    token: string,
    id: number,
    formData: AddContextFormValues
  ) => {
    return await fetchData(`/thread/addContext/${id}`, token, formData, 'POST')
  }
}
