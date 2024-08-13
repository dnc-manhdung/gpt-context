import { Flex, Text } from '@mantine/core'
import { useEffect, useRef } from 'react'

interface ConversationOptionsProps {
  isOpen: boolean
  onClose: () => void
}

const ConversationOptions: React.FC<ConversationOptionsProps> = ({
  isOpen,
  onClose
}) => {
  const optionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = () => {
      onClose()
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [isOpen, onClose])

  return (
    <div
      ref={optionsRef}
      className={`${
        isOpen ? 'block' : 'hidden'
      } bg-gray-300 absolute z-10 -right-1/2 w-fit min-w-fit rounded-md p-2`}
    >
      <Flex direction="column" gap={4}>
        <Text
          component="button"
          className="hover:bg-gray-50 p-2 rounded-md w-full text-left"
        >
          Change name
        </Text>
        <Text
          component="button"
          className="hover:bg-gray-50 p-2 rounded-md w-full text-left"
        >
          Delete
        </Text>
        <Text
          component="button"
          className="hover:bg-gray-50 p-2 rounded-md w-full text-left"
        >
          Archive
        </Text>
      </Flex>
    </div>
  )
}

export default ConversationOptions
