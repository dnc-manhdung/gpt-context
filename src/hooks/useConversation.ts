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
    setTimeout(() => {}, 5000)

    if (message) {
      return {
        code: 1000,
        message: '',
        data: {
          id: 1000,
          message: 'hehe',
          type: 1
        }
      }
    }
  }
}
