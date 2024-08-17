import { Button, Flex, Modal, Text } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { useUsers } from '~/hooks/useUsers'
import { RootState } from '~/store'

interface DeactivateModalProps {
  close: () => void
  opened: boolean
  id: number
}

const DeactivateModal: React.FC<DeactivateModalProps> = ({
  close,
  opened,
  id
}) => {
  const accessToken = useSelector((state: RootState) => state.auth.access_token)

  const { deactivateUser } = useUsers

  const handleSubmit = async () => {
    if (!accessToken) {
      throw new Error('Access token is required!')
    }

    await deactivateUser(accessToken, id)

    close()
  }

  const mutation = useMutation({
    mutationFn: () => handleSubmit()
  })

  return (
    <Modal opened={opened} onClose={close} withCloseButton={false}>
      <Text>Are you sure to deactivate this user?</Text>
      <Flex mt={16} gap={8} justify="flex-end">
        <Button
          color="gray"
          onClick={close}
          loading={mutation.status === 'pending'}
        >
          Cancel
        </Button>
        <Button
          color="red"
          onClick={() => mutation.mutate()}
          loading={mutation.status === 'pending'}
        >
          Deactivate
        </Button>
      </Flex>
    </Modal>
  )
}

export default DeactivateModal
