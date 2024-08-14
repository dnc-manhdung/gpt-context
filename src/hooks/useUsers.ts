import { fetchData } from './fetch'

export const useUsers = {
  getUsers: async (token: string) => {
    return fetchData('/user', token, null)
  }
}
