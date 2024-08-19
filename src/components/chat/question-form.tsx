'use client'

import { ActionIcon, Flex, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconSend2 } from '@tabler/icons-react'
import { useConversation } from '~/hooks/useConversation'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import { useState } from 'react'
import { MessageType } from '~/types/conversation'

interface FormValues {
  content: string
}

interface QuestionFormProps {
  id: number
  setPendingMessage: (message: string) => void
  setStreamMessage: (chunk: string) => void
  addMessages: (messages: MessageType[]) => void
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  id,
  setPendingMessage,
  setStreamMessage,
  addMessages
}) => {
  const { sendMessage } = useConversation
  const sequence = useState<number>(-1)

  const accessToken = useSelector((state: RootState) => state.auth.access_token)

  const form = useForm<FormValues>({
    initialValues: {
      content: ''
    }
  })

  const handleSubmit = async () => {
    if (!accessToken) {
      throw new Error('Access token is required')
    }

    setPendingMessage(form.getValues().content)

    const formData = form.getValues()
    form.reset()
    const res = await sendMessage(accessToken, id, formData, setStreamMessage)

    const newMessages = [
      {
        id: `new-message-${sequence}`,
        content: formData.content,
        replyTo: null
      },
      {
        id: `new-message-r-${sequence}`,
        content: res,
        replyTo: {
          id: `new-message-${sequence}`,
          content: formData.content
        }
      }
    ]

    addMessages(newMessages)

    setPendingMessage('')
    setStreamMessage('')
  }

  const mutation = useMutation({
    mutationFn: () => handleSubmit()
  })

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      mutation.mutate()
    }
  }

  return (
    <form onSubmit={form.onSubmit(() => mutation.mutate())}>
      <Flex align="flex-end" gap={16}>
        <Textarea
          {...form.getInputProps('content')}
          key={form.key('content')}
          className="w-[640px]"
          label="Ask here"
          autosize
          maxRows={6}
          onKeyDown={handleKeyDown}
        />
        <ActionIcon
          size={36}
          type="submit"
          disabled={!form.getValues().content || mutation.status === 'pending'}
        >
          <IconSend2 />
        </ActionIcon>
      </Flex>
    </form>
  )
}

export default QuestionForm
