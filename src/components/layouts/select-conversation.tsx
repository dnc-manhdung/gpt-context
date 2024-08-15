import { useState } from 'react'
import { ActionIcon, Container, Text, TextInput } from '@mantine/core'
import { IconDots } from '@tabler/icons-react'
import ConversationOptions from './conversation-options'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import ContextModal from '../chat/context-modal'

interface SelectConversationProps {
  id: number
  title: string
  isSelected: boolean
  context: string
  refetchConversation: () => void
}

interface FormValues {
  title: string
}

const SelectConversation: React.FC<SelectConversationProps> = ({
  id,
  title,
  isSelected,
  context,
  refetchConversation
}) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false)
  const [isChangingTitle, setIsChangingTitle] = useState<boolean>(false)

  const form = useForm<FormValues>({
    initialValues: {
      title
    }
  })

  const [opened, { open, close }] = useDisclosure(false)

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

  const openChangeName = () => {
    toggleOptions()
    setIsChangingTitle(true)
  }

  const handleChangeName = () => {
    console.log(form.getValues().title)
    setIsChangingTitle(false)
  }

  return (
    <Container
      key={id}
      className={`text-md w-full px-1 py-1.5 ${
        isSelected ? 'bg-gray-200' : 'hover:bg-gray-100'
      } rounded-md relative group`}
    >
      {isChangingTitle ? (
        <form onSubmit={form.onSubmit(() => handleChangeName())}>
          <TextInput {...form.getInputProps('title')} />
        </form>
      ) : (
        <Text
          component="a"
          href={`/chat/${id}`}
          className="block w-full h-full flex flex-col"
        >
          <span>{title}</span>
          <span className="text-xs text-gray-800">
            {context || 'No context'}
          </span>
        </Text>
      )}
      <ActionIcon
        color="transparent"
        className={`${isChangingTitle && 'hidden'} absolute right-0 top-1/4 rounded-full hover:bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
        onClick={handleIconClickWithEvent}
      >
        <IconDots color="black" size={16} />
      </ActionIcon>
      <ConversationOptions
        isOpen={isOptionsOpen}
        onClose={handleIconClick}
        changeName={openChangeName}
        openContextModal={open}
      />
      <ContextModal
        opened={opened}
        close={close}
        id={id}
        currentContext={context}
        title={title}
        refetchConversation={refetchConversation}
      />
    </Container>
  )
}

export default SelectConversation
