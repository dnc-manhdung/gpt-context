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

interface SendMessageFormValues {
  content: string
}

export const useConversation = {
  getConversation: async (token: string, id: number) => {
    return await fetchData(`/message/get/${id}`, token, null, 'GET')
  },

  sendMessage: async (
    token: string,
    id: number,
    formData: SendMessageFormValues
  ) => {
    return await fetchData(`/message/send/${id}`, token, formData, 'POST')
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
  },

  deleteConversation: async (token: string, id: number) => {
    return await fetchData(`/thread/${id}`, token, null, 'DELETE')
  }
}
