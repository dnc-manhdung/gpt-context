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
  const [pendingMessage, setPendingMessage] = useState<string>('')
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

  return (
    <DefaultLayout>
      {isLoading ? (
        <Center>
          <Loader size={48} />
        </Center>
      ) : messages ? (
        <Flex
          className="h-dvh -mt-[100px]"
          direction="column"
          justify="flex-end"
          align="center"
        >
          <Conversation
            messages={messages}
            pendingMessage={pendingMessage}
          ></Conversation>
          <QuestionForm
            id={Number(id)}
            refetchConversation={refetch}
            setPendingMessage={setPendingMessage}
          />
        </Flex>
      ) : (
        <></>
      )}
    </DefaultLayout>
  )
}

export default Page
