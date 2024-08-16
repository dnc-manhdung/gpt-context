'use client'

import { Button, Flex, Modal } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useConversation } from '~/hooks/useConversation'
import { RootState } from '~/store'

interface DeleteModalProps {
  id: number
  opened: boolean
  close: () => void
}

const DeleteModal: React.FC<DeleteModalProps> = ({ opened, close, id }) => {
  const accessToken = useSelector((state: RootState) => state.auth.access_token)
  const router = useRouter()

  const { deleteConversation } = useConversation

  const handleSubmit = async () => {
    if (!accessToken) {
      throw new Error('Access token is required')
    }

    await deleteConversation(accessToken, id)

    close()
    router.push('/chat')
  }

  const mutation = useMutation({
    mutationFn: () => handleSubmit()
  })

  return (
    <Modal opened={opened} onClose={close} centered withCloseButton={false}>
      Are you sure to delete this chat?
      <Flex gap={8} mt="md" justify="flex-end">
        <Button
          size="sm"
          color="gray"
          onClick={close}
          loading={mutation.status === 'pending'}
        >
          Cancel
        </Button>
        <Button
          size="sm"
          color="red"
          onClick={() => mutation.mutate()}
          loading={mutation.status === 'pending'}
        >
          Delete
        </Button>
      </Flex>
    </Modal>
  )
}

export default DeleteModal
