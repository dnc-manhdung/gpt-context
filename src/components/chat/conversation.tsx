import { ActionIcon, Flex } from '@mantine/core'
import { IconDots } from '@tabler/icons-react'
import { ConversationType } from '~/types/conversation'

interface ConversationProps {
  conversation: ConversationType
  isChatLoading: boolean
}

const Conversation: React.FC<ConversationProps> = ({
  conversation,
  isChatLoading
}) => {
  return (
    <Flex direction="column" className="w-full max-w-[700px] mb-6" gap={24}>
      {conversation.messages.map((message) => {
        return (
          <Flex
            key={message.id}
            className={`${message.type ? 'self-start' : 'self-end'} group`}
            direction={message.type ? 'row' : 'row-reverse'}
            align="center"
            gap={4}
          >
            <div
              className={`${message.type ? 'bg-gray-600 text-white' : 'bg-gray-100'} px-5 py-3 rounded-3xl max-w-[450px]`}
            >
              {message.message}
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
