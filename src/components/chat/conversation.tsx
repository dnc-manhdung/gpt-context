import { Flex } from '@mantine/core'
import { ConversationType } from '~/types/conversation'

interface ConversationProps {
  conversation: ConversationType
}

const Conversation: React.FC<ConversationProps> = ({ conversation }) => {
  return (
    <Flex direction="column" className="w-full max-w-[700px] mb-6" gap={24}>
      {conversation.messages.map((message) => {
        return (
          <div
            key={message.id}
            className={`${message.type ? 'self-start bg-gray-600 text-white' : 'self-end bg-gray-100'} px-4 py-3 rounded-full max-w-[450px]`}
          >
            {message.message}
          </div>
        )
      })}
    </Flex>
  )
}

export default Conversation
