import { Flex, Text, Button } from '@mantine/core'
import { useParams } from 'next/navigation'
import SelectConversation from './select-conversation'

type Chat = {
  id: string
  name: string
}

interface NavbarProps {
  chatList: Chat[]
}

const Navbar: React.FC<NavbarProps> = ({ chatList }) => {
  const params = useParams()
  const { id } = params

  return (
    <Flex direction="column" mt="md" ml="sm" mr="sm">
      <Text className="text-sm text-gray-600">Recent Chat</Text>
      <Flex direction="column" className="w-full" gap="8" mt="md">
        {chatList &&
          chatList.map((chat) => {
            return (
              <SelectConversation
                isSelected={chat.id === id}
                key={chat.id}
                id={chat.id}
                name={chat.name}
              />
            )
          })}
      </Flex>
    </Flex>
  )
}

export default Navbar
