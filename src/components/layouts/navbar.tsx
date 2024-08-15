'use client'

import { Flex, Text } from '@mantine/core'
import { useParams } from 'next/navigation'
import SelectConversation from './select-conversation'
import { ThreadType } from '~/types/conversation'

interface NavbarProps {
  conversations: ThreadType[] | undefined
  refetch: () => void
}

const Navbar: React.FC<NavbarProps> = ({ conversations, refetch }) => {
  const params = useParams()
  const { id } = params

  return (
    <Flex direction="column" mt="md" ml="sm" mr="sm">
      <Text className="text-sm text-gray-600">Recent Chat</Text>
      <Flex direction="column-reverse" className="w-full" gap="8" mt="md">
        {conversations &&
          conversations.map((conversation) => {
            return (
              <SelectConversation
                isSelected={conversation.id === Number(id)}
                key={conversation.id}
                id={conversation.id}
                title={conversation.title}
                context={conversation.context}
                refetchConversation={refetch}
              />
            )
          })}
      </Flex>
    </Flex>
  )
}

export default Navbar
