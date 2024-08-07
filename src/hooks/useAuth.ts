export const useAuth = {
  register: () => {
    return {
      code: 1005,
      message: 'Email is used by another account!',
      data: null
    }
  },

  login: () => {
    return {
      code: 1005,
      message: 'Wrong password!',
      data: null
    }
  }
}
