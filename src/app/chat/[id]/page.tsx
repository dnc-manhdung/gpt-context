'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import DefaultLayout from '~/components/layouts/default'
import { useConversation } from '~/hooks/useConversation'
import { MessageResponseType, MessageType } from '~/types/conversation'
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
  const [streamMessage, setStreamMessaage] = useState<string>('')
  const accessToken = useSelector((state: RootState) => state.auth.access_token)
  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(10000)
  const [conversationData, setConversationData] = useState<MessageType[]>([])

  const router = useRouter()

  const { getConversation } = useConversation

  const fetchConversation = async (): Promise<MessageType[]> => {
    if (!accessToken) {
      throw new Error('Access token is required')
    }

    const res =
      page <= totalPage
        ? await getConversation(accessToken, Number(id), page)
        : null

    if (res.statusCode === 404) {
      router.push('/chat')
    } else if (page <= totalPage) {
      setTotalPage(res.meta.total_page)
      setPage(page + 1)
    }
    setConversationData([...res.data, ...conversationData])

    return conversationData
  }

  const addMessages = (newMessages: MessageType[]) => {
    setConversationData([...conversationData, ...newMessages])
  }

  const {
    data: data,
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
      ) : data ? (
        <Flex
          className="h-dvh -mt-[100px]"
          direction="column"
          justify="flex-end"
          align="center"
        >
          <Conversation
            messages={conversationData}
            pendingMessage={pendingMessage}
            streamMessage={streamMessage}
            refetch={refetch}
            isLastPage={page > totalPage}
          ></Conversation>
          <QuestionForm
            id={Number(id)}
            setPendingMessage={setPendingMessage}
            setStreamMessage={setStreamMessaage}
            addMessages={addMessages}
          />
        </Flex>
      ) : (
        <></>
      )}
    </DefaultLayout>
  )
}

export default Page
