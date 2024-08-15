'use client'

import { ActionIcon, Flex } from '@mantine/core'
import { IconDots } from '@tabler/icons-react'
import { useEffect, useRef } from 'react'
import { MessageType } from '~/types/conversation'

interface ConversationProps {
  messages: MessageType[] | undefined
  pendingMessage: string
}

const Conversation: React.FC<ConversationProps> = ({
  messages,
  pendingMessage
}) => {
  const conversationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [pendingMessage, messages])

  return (
    <Flex
      direction="column"
      className="w-full max-w-[700px] mb-6 overflow-y-scroll conversation mt-[120px]"
      gap={24}
    >
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
          <span className="mx-auto text-gray-400">Wait a minute...</span>
        </>
      )}
    </Flex>
  )
}

export default Conversation
