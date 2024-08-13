import { ActionIcon, Flex, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconSend2 } from '@tabler/icons-react'
import { ConversationType } from '~/types/conversation'
import { useConversation } from '~/hooks/useConversation'
import { useQuery } from '@tanstack/react-query'

interface FormValues {
  question: string
}

interface QuestionFormProps {
  conversationData: ConversationType
  setConversationData: (conversation: ConversationType) => void
  sequence: number
  setSequence: (newSequence: number) => void
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  conversationData,
  setConversationData,
  sequence,
  setSequence
}) => {
  const { sendQuestion } = useConversation

  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: {
      question: ''
    }
  })

  const fetchQuestion = async () => {
    const data = await sendQuestion(form.getValues().question)

    const newMessage = {
      id: sequence + 1,
      type: 0,
      message: form.getValues().question
    }

    setSequence(sequence + 2)

    if (newMessage.message) {
      setConversationData({
        ...conversationData,
        messages: [
          ...conversationData.messages,
          newMessage,
          {
            id: 1000,
            message: 'hehe',
            type: 1
          }
        ]
      })
    }
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
          className="w-[500px]"
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
