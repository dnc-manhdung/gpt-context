'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import DefaultLayout from '~/components/layouts/default'
import { useConversation } from '~/hooks/useConversation'
import { ConversationType, MessageType } from '~/types/conversation'
import { useQuery } from '@tanstack/react-query'
import { Center, Flex, Loader } from '@mantine/core'
import Conversation from '~/components/chat/conversation'
import QuestionForm from '~/components/chat/question-form'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'

const Page = () => {
  const params = useParams()
  const { id } = params
  const [conversationData, setConversationData] = useState<ConversationType>({
    messages: []
  })
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false)
  const accessToken = useSelector((state: RootState) => state.auth.access_token)

  const { getConversation } = useConversation

  const fetchConversation = async (): Promise<MessageType[]> => {
    if (!accessToken) {
      throw new Error('Access token is required')
    }

    return await getConversation(accessToken, Number(id))
  }

  const {
    data: messages,
    error,
    isLoading,
    refetch
  } = useQuery<MessageType[]>({
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
        <Center>
          <Loader size={48} />
        </Center>
      ) : conversationData ? (
        <Flex
          className="h-dvh -mt-[100px]"
          direction="column"
          justify="flex-end"
          align="center"
        >
          <Conversation
            messages={messages}
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
