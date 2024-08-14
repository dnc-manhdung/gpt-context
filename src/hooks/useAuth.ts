import { fetchData } from './fetch'

interface LoginFormValues {
  username: string
  password: string
}

export const useAuth = {
  register: () => {
    return {
      code: 1005,
      message: 'Email is used by another account!',
      data: null
    }
  },

  login: async (formData: LoginFormValues) => {
    return fetchData('/auth/login', formData, 'POST')
  }
}
