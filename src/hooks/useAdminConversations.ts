import { fetchData } from './fetch'

export const useAdminConversations = {
  getConversations: async (token: string, username: string) => {
    return await fetchData(`/threads?username=${username}`, token, null, 'GET')
  }
}
