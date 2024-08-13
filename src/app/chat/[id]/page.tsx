'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import DefaultLayout from '~/components/layouts/default'
import { useConversation } from '~/hooks/useConversation'
import { ConversationType } from '~/types/conversation'
import { useQuery } from '@tanstack/react-query'
import { Flex, Text } from '@mantine/core'
import Conversation from '~/components/chat/conversation'
import QuestionForm from '~/components/chat/question-form'

const Page = () => {
  const params = useParams()
  const { id } = params
  const [conversationData, setConversationData] = useState<ConversationType>({
    messages: []
  })
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false)

  const { getConversation } = useConversation

  const fetchConversation = async () => {
    const data = await getConversation(id)
    setConversationData(data.data)
    console.log(1)
    return data
  }

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['conversation'],
    queryFn: fetchConversation
  })

  const startChatLoading = () => {
    setIsChatLoading(true)
  }

  const stopChatLoading = () => {
    setIsChatLoading(false)
  }

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
          <Conversation
            conversation={conversationData}
            isChatLoading={isChatLoading}
          ></Conversation>
          <QuestionForm
            conversationData={conversationData}
            setConversationData={setConversationData}
            startChatLoading={startChatLoading}
            stopChatLoading={stopChatLoading}
          />
        </Flex>
      ) : (
        <></>
      )}
    </DefaultLayout>
  )
}

export default Page
