'use client'

import { ActionIcon, Flex, Loader, Text } from '@mantine/core'
import { IconDots } from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'
import { MessageType } from '~/types/conversation'

interface ConversationProps {
  messages: MessageType[] | undefined
  pendingMessage: string
  streamMessage: string
  refetch: () => void
  isLastPage: boolean
}

const Conversation: React.FC<ConversationProps> = ({
  messages,
  pendingMessage,
  streamMessage,
  refetch,
  isLastPage
}) => {
  const conversationRef = useRef<HTMLDivElement>(null)
  const windowRef = useRef<HTMLDivElement>(null)
  const [prevScrollHeight, setPrevScrollHeight] = useState<number | null>(null)

  useEffect(() => {
    if (conversationRef.current && !prevScrollHeight) {
      conversationRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [pendingMessage, messages, prevScrollHeight])

  useEffect(() => {
    if (windowRef.current && streamMessage) {
      windowRef.current.scrollTop = windowRef.current.scrollHeight
    }
  }, [streamMessage])

  useEffect(() => {
    const handleScroll = () => {
      if (windowRef.current) {
        if (windowRef.current.scrollTop === 0 && !isLastPage) {
          setPrevScrollHeight(windowRef.current.scrollHeight)
          refetch()
        }
      }
    }

    const container = windowRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [isLastPage, refetch])

  useEffect(() => {
    if (windowRef.current && prevScrollHeight) {
      const newScrollHeight = windowRef.current.scrollHeight
      const scrollDifference = newScrollHeight - prevScrollHeight

      windowRef.current.scrollTop += scrollDifference

      setPrevScrollHeight(null)
    }
  }, [messages, prevScrollHeight])

  return (
    <Flex
      direction="column"
      className="w-full max-w-[700px] mb-6 overflow-y-scroll conversation mt-[120px]"
      gap={24}
      ref={windowRef}
    >
      {!isLastPage && (
        <Flex direction="column" className="mx-auto" align="center" gap={8}>
          <Loader />
          <Text className="text-gray-500">
            Waiting for loading previous messages
          </Text>
        </Flex>
      )}
      {messages &&
        messages.map((message) => {
          return (
            <Flex
              ref={conversationRef}
              key={message.id}
              className={`${message.replyTo ? 'self-start' : 'self-end'} group`}
              direction={message.replyTo ? 'row' : 'row-reverse'}
              align="center"
              gap={4}
            >
              <div
                className={`${message.replyTo ? 'bg-gray-600 text-white' : 'bg-gray-100'} px-5 py-3 rounded-3xl max-w-[450px]`}
              >
                {message.content}
              </div>
              <ActionIcon
                color="white"
                className="hover:bg-transparent opacity-0 group-hover:opacity-100"
              >
                <IconDots size={16} className="text-gray-500" />
              </ActionIcon>
            </Flex>
          )
        })}
      {pendingMessage && (
        <>
          <div className="self-end bg-gray-100 px-5 py-3 rounded-3xl max-w-[450px]">
            {pendingMessage}
          </div>
          {streamMessage ? (
            <div className="self-start bg-gray-600 text-white px-5 py-3 rounded-3xl max-w-[450px]">
              {streamMessage}
            </div>
          ) : (
            <span className="mx-auto text-gray-400">Wait a minute...</span>
          )}
        </>
      )}
    </Flex>
  )
}

export default Conversation
