import { ActionIcon, Flex, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconSend2 } from '@tabler/icons-react'
import { ConversationType, MessageType } from '~/types/conversation'
import { useConversation } from '~/hooks/useConversation'
import { useQuery } from '@tanstack/react-query'

interface FormValues {
  question: string
}

interface QuestionFormProps {
  conversationData: ConversationType
  setConversationData: (conversation: ConversationType) => void
  startChatLoading: () => void
  stopChatLoading: () => void
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  conversationData,
  setConversationData,
  startChatLoading,
  stopChatLoading
}) => {
  const { sendQuestion } = useConversation

  const form = useForm<FormValues>({
    initialValues: {
      question: ''
    }
  })

  const fetchQuestion = async () => {
    const newMessage = {
      id: Date.now(),
      type: 0,
      message: form.getValues().question
    }

    if (newMessage.message) {
      startChatLoading()
    }

    if (newMessage.message) {
      setConversationData({
        ...conversationData,
        messages: [...conversationData.messages, newMessage]
      })
    }

    const data = await sendQuestion(form.getValues().question)
    const ans = data.data as MessageType

    if (newMessage.message) {
      stopChatLoading()
    }

    if (newMessage.message) {
      setConversationData({
        ...conversationData,
        messages: [...conversationData.messages, newMessage, ans]
      })
    }

    form.reset()

    return conversationData || null
  }

  const { isLoading } = useQuery({
    queryKey: ['question'],
    queryFn: fetchQuestion
  })

  const handleSubmit = async () => {
    await fetchQuestion()
  }

  return (
    <form onSubmit={form.onSubmit(() => handleSubmit())}>
      <Flex align="flex-end" gap={16}>
        <Textarea
          {...form.getInputProps('question')}
          className="w-[640px]"
          label="Ask here"
          autosize
          maxRows={6}
        />
        <ActionIcon
          size={36}
          type="submit"
          disabled={!form.getValues().question || isLoading}
        >
          <IconSend2 />
        </ActionIcon>
      </Flex>
    </form>
  )
}

export default QuestionForm
