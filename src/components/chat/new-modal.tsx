/* eslint-disable react/display-name */
'use client'

import { useDisclosure } from '@mantine/hooks'
import { Button, Flex, Modal, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { forwardRef, useImperativeHandle } from 'react'
import { useRouter } from 'next/navigation'

interface FormValues {
  title: string
  context: string
}

const NewModal = forwardRef((_, ref) => {
  const [opened, { open, close }] = useDisclosure(false)

  const router = useRouter()

  useImperativeHandle(ref, () => ({
    open
  }))

  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      context: ''
    },
    validate: {
      title: (value) => (value ? null : 'Title cannot be blank'),
      context: (value) => (value ? null : 'Context cannot be blank')
    }
  })

  const handleCreate = () => {
    console.log(form.getValues())
    router.push('/chat/1')
  }

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Create a new conversation"
      centered
    >
      <form onSubmit={form.onSubmit(() => handleCreate())}>
        <Flex direction="column" gap={8}>
          <TextInput
            {...form.getInputProps('title')}
            key={form.key('title')}
            label="Title"
            placeholder="Title"
            size="lg"
            className="w-full"
          />
          <TextInput
            {...form.getInputProps('context')}
            key={form.key('context')}
            label="Context"
            placeholder="Context"
            size="lg"
            className="w-full"
          />
          <Button type="submit" mt="lg">
            Create new conversation
          </Button>
        </Flex>
      </form>
    </Modal>
  )
})

export default NewModal
