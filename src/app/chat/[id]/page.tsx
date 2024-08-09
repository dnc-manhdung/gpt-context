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

const Page = () => {
  const params = useParams()
  const { id } = params
  const router = useRouter()
  const [conversationData, setConversationData] = useState<ConversationType>()

  const { getConversation } = useConversation

  const fetchConversation = async () => {
    const data = await getConversation(id)
    setConversationData(data.data)
    return data
  }

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['conversation', conversationData],
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
          <Flex align="flex-end" gap={16}>
            <Textarea
              className="w-[500px]"
              label="Ask here"
              autosize
              maxRows={6}
            />
            <ActionIcon size={36}>
              <IconSend2 />
            </ActionIcon>
          </Flex>
        </Flex>
      ) : (
        <></>
      )}
    </DefaultLayout>
  )
}

export default Page
