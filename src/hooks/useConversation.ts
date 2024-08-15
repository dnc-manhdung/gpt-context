import { fetchData } from './fetch'

interface NewConversationFormValues {
  title: string
}

interface AddContextFormValues {
  context: string
}

interface UpdateConversationFormValues {
  title: string
}

export const useConversation = {
  getConversation: async (token: string, id: number) => {
    return await fetchData(`/message/get/${id}`, token, null, 'GET')
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
  },

  updateTitle: async (
    token: string,
    id: number,
    formData: UpdateConversationFormValues
  ) => {
    return await fetchData(`/thread/update/${id}`, token, formData, 'PATCH')
  }
}
