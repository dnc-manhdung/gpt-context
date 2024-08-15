import { Button, Flex } from '@mantine/core'
import { useEffect, useRef } from 'react'

interface ConversationOptionsProps {
  isOpen: boolean
  onClose: () => void
  changeName: () => void
  openContextModal: () => void
}

const ConversationOptions: React.FC<ConversationOptionsProps> = ({
  isOpen,
  onClose,
  changeName,
  openContextModal
}) => {
  const optionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
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
        <Button
          className="hover:bg-gray-50 bg-transparent text-black text-base font-normal hover:text-gray-900 p-2 rounded-md w-full text-left"
          onClick={openContextModal}
        >
          Add context
        </Button>
        <Button
          className="hover:bg-gray-50 bg-transparent text-black text-base font-normal hover:text-gray-900 p-2 rounded-md w-full text-left"
          onClick={changeName}
        >
          Change name
        </Button>
        <Button className="hover:bg-gray-50 bg-transparent text-black text-base font-normal hover:text-gray-900 p-2 rounded-md w-full text-left">
          Delete
        </Button>
        <Button className="hover:bg-gray-50 bg-transparent text-black text-base font-normal hover:text-gray-900 p-2 rounded-md w-full text-left">
          Archive
        </Button>
      </Flex>
    </div>
  )
}

export default ConversationOptions
