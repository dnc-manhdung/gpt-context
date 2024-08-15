import { fetchData } from './fetch'

interface RegisterFormValues {
  email: string
  username: string
  password: string
  role: string
}

export const useUsers = {
  getUsers: async (token: string) => {
    return await fetchData('/user', token, null)
  },

  createUser: async (token: string, formData: RegisterFormValues) => {
    return await fetchData('/user/register', token, formData, 'POST')
  }
}
