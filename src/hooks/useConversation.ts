import { fetchData, fetchStreamData } from './fetch'

interface NewConversationFormValues {
  title: string
}

interface UpdateConversationFormValues {
  title: string
  context?: string
}

interface SendMessageFormValues {
  content: string
}

export const useConversation = {
  getConversation: async (token: string, id: number) => {
    return await fetchData(`/threads/${id}/messages`, token, null, 'GET')
  },

  sendMessage: async (
    token: string,
    id: number,
    formData: SendMessageFormValues,
    onStreamUpdate: (chunk: string) => void
  ) => {
    console.log(formData)
    return await fetchStreamData(
      `/threads/${id}/messages`,
      token,
      formData,
      'POST',
      onStreamUpdate
    )
  },

  createConversation: async (
    token: string,
    formData: NewConversationFormValues
  ) => {
    return await fetchData('/thread/create', token, formData, 'POST')
  },

  getConversations: async (token: string) => {
    return await fetchData('/users/threads', token, null, 'GET')
  },

  updateConversation: async (
    token: string,
    id: number,
    formData: UpdateConversationFormValues
  ) => {
    return await fetchData(`/threads/${id}`, token, formData, 'PATCH')
  },

  deleteConversation: async (token: string, id: number) => {
    return await fetchData(`/threads/${id}`, token, null, 'DELETE')
  }
}
