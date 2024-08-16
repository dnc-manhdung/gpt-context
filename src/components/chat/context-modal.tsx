'use client'

import { Button, Modal, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import { useConversation } from '~/hooks/useConversation'

interface ContextModalProps {
  opened: boolean
  close: () => void
  id: number
  currentContext: string
  currentTitle: string
  refetchConversation: () => void
}

interface FormValues {
  title: string
  context: string
}

const ContextModal: React.FC<ContextModalProps> = ({
  opened,
  close,
  id,
  currentContext,
  currentTitle,
  refetchConversation
}) => {
  const { updateConversation } = useConversation

  const form = useForm<FormValues>({
    initialValues: {
      title: currentTitle,
      context: currentContext
    }
  })

  const accessToken = useSelector((state: RootState) => state.auth.access_token)

  const handleSubmit = async () => {
    if (!accessToken) {
      throw new Error('Access token is required')
    }

    const res = await updateConversation(accessToken, id, form.getValues())

    if (res) {
      close()
      refetchConversation()
    }
  }

  const mutation = useMutation({
    mutationFn: () => handleSubmit()
  })

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={`Update information for conversation`}
    >
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={form.onSubmit(() => mutation.mutate())}
      >
        <TextInput
          {...form.getInputProps('title')}
          key={form.key('title')}
          label="Title"
          disabled={mutation.status === 'pending'}
        />
        <TextInput
          {...form.getInputProps('context')}
          key={form.key('context')}
          label="Context"
          disabled={mutation.status === 'pending'}
        />
        <Button
          className="w-1/2 mx-auto"
          type="submit"
          loading={mutation.status === 'pending'}
        >
          Submit
        </Button>
      </form>
    </Modal>
  )
}

export default ContextModal
