import { Flex } from '@mantine/core'
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
          <div
            key={message.id}
            className={`${message.type ? 'self-start bg-gray-600 text-white' : 'self-end bg-gray-100'} px-5 py-3 rounded-full max-w-[450px]`}
          >
            {message.message}
          </div>
        )
      })}
      {isChatLoading && (
        <span className="mx-auto text-gray-400">Wait a minute...</span>
      )}
    </Flex>
  )
}

export default Conversation
