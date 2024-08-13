'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import DefaultLayout from '~/components/layouts/default'
import { useConversation } from '~/hooks/useConversation'
import { ConversationType } from '~/types/conversation'
import { useQuery } from '@tanstack/react-query'
import { ActionIcon, Flex, Text, Textarea } from '@mantine/core'
import Conversation from '~/components/chat/conversation'
import { IconSend2 } from '@tabler/icons-react'
import { useForm } from '@mantine/form'
import QuestionForm from '~/components/chat/question-form'

interface FormValues {
  question: string
}

const Page = () => {
  const params = useParams()
  const { id } = params
  const router = useRouter()
  const [conversationData, setConversationData] = useState<ConversationType>({
    messages: []
  })
  const [sequence, setSequence] = useState<number>(0)

  const { getConversation } = useConversation

  const fetchConversation = async () => {
    const data = await getConversation(id)
    setConversationData(data.data)
    setSequence(data.data.messages.slice(-1)[0].id)
    console.log(1)
    return data
  }

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['conversation'],
    queryFn: fetchConversation
  })

  return (
    <DefaultLayout>
      {isLoading ? (
        <Text>Loading...........</Text>
      ) : conversationData ? (
        <Flex
          className="h-dvh -mt-[100px]"
          direction="column"
          justify="flex-end"
          align="center"
        >
          <Conversation conversation={conversationData}></Conversation>
          <QuestionForm
            conversationData={conversationData}
            setConversationData={setConversationData}
            sequence={sequence}
            setSequence={setSequence}
          />
        </Flex>
      ) : (
        <></>
      )}
    </DefaultLayout>
  )
}

export default Page
