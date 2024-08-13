import { useState } from 'react'
import { ActionIcon, Container, Text } from '@mantine/core'
import { IconDots } from '@tabler/icons-react'
import ConversationOptions from './conversation-options'

interface SelectConversationProps {
  id: string
  name: string
  isSelected: boolean
}

const SelectConversation: React.FC<SelectConversationProps> = ({
  id,
  name,
  isSelected
}) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false)

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen)
  }

  const handleIconClick = () => {
    toggleOptions()
  }

  const handleIconClickWithEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()
    handleIconClick()
  }

  return (
    <Container
      key={id}
      className={`text-md w-full px-1 py-1.5 ${
        isSelected ? 'bg-gray-200' : 'hover:bg-gray-100'
      } rounded-md relative group`}
    >
      <Text component="a" href={`/chat/${id}`} className="block w-full h-full">
        {name}
      </Text>
      <ActionIcon
        color="transparent"
        className="absolute right-0 top-1 rounded-full hover:bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        onClick={handleIconClickWithEvent}
      >
        <IconDots color="black" size={16} />
      </ActionIcon>
      <ConversationOptions isOpen={isOptionsOpen} onClose={handleIconClick} />
    </Container>
  )
}

export default SelectConversation
