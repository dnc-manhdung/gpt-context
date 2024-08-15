import { ActionIcon, Flex } from '@mantine/core'
import { IconDots } from '@tabler/icons-react'
import { MessageType } from '~/types/conversation'

interface ConversationProps {
  messages: MessageType[] | undefined
  isChatLoading: boolean
}

const Conversation: React.FC<ConversationProps> = ({
  messages,
  isChatLoading
}) => {
  return (
    <Flex direction="column" className="w-full max-w-[700px] mb-6" gap={24}>
      {messages &&
        messages.map((message) => {
          return (
            <Flex
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
      {isChatLoading && (
        <span className="mx-auto text-gray-400">Wait a minute...</span>
      )}
    </Flex>
  )
}

export default Conversation
