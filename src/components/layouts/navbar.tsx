import { Flex, Text, Button } from '@mantine/core'

type Chat = {
  id: string
  name: string
}

interface NavbarProps {
  chatList: Chat[]
}

const Navbar: React.FC<NavbarProps> = ({ chatList }) => {
  return (
    <Flex direction="column" mt="md" ml="sm" mr="sm">
      <Text className="text-sm text-gray-600">Recent Chat</Text>
      <Flex direction="column" className="w-full" gap="8" mt="md">
        {chatList &&
          chatList.map((chat) => {
            return (
              <Text
                key={chat.id}
                component="a"
                className="text-md hover:bg-gray-100 px-1 py-1.5 rounded-md"
                href={`/chat/${chat.id}`}
              >
                {chat.name}
              </Text>
            )
          })}
      </Flex>
    </Flex>
  )
}

export default Navbar
