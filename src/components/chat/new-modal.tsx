/* eslint-disable react/display-name */
'use client'

import { useDisclosure } from '@mantine/hooks'
import { Button, Flex, Modal, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { forwardRef, useImperativeHandle } from 'react'
import { useRouter } from 'next/navigation'
import { useConversation } from '~/hooks/useConversation'
import { RootState } from '~/store'
import { useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'

interface FormValues {
  title: string
}

const NewModal = forwardRef((_, ref) => {
  const { createConversation } = useConversation
  const accessToken =
    useSelector((state: RootState) => state.auth.access_token) || ''

  const [opened, { open, close }] = useDisclosure(false)

  const router = useRouter()

  useImperativeHandle(ref, () => ({
    open
  }))

  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: {
      title: ''
    },
    validate: {
      title: (value) => (value ? null : 'Title cannot be blank')
    }
  })

  const handleSubmit = async () => {
    const res = await createConversation(accessToken, form.getValues())

    router.push(`/chat/${res.id}`)
  }

  const mutation = useMutation({
    mutationFn: () => handleSubmit()
  })

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Create a new conversation"
      centered
    >
      <form onSubmit={form.onSubmit(() => mutation.mutate())}>
        <Flex direction="column" gap={8}>
          <TextInput
            {...form.getInputProps('title')}
            key={form.key('title')}
            label="Title"
            placeholder="Title"
            size="lg"
            className="w-full"
            disabled={mutation.status === 'pending'}
          />
          <Button
            type="submit"
            mt="lg"
            className="w-1/2 mx-auto"
            loading={mutation.status === 'pending'}
          >
            Create new conversation
          </Button>
        </Flex>
      </form>
    </Modal>
  )
})

export default NewModal
