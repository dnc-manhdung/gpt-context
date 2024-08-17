import { fetchData } from './fetch'

interface RegisterFormValues {
  email: string
  username: string
  password: string
  role: string
}

export const useUsers = {
  getUsers: async (token: string) => {
    return await fetchData('/users', token, null)
  },

  createUser: async (token: string, formData: RegisterFormValues) => {
    return await fetchData('/users', token, formData, 'POST')
  },

  deactivateUser: async (token: string, id: number) => {
    return await fetchData(`/users/deactivate/${id}`, token, null, 'PATCH')
  }
}
