'use client'

import { Button, Center, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'
import NewModal from '~/components/chat/new-modal'
import DefaultLayout from '~/components/layouts/default'

const Page = () => {
  const [message, setMessage] = useState<string>('')

  const [opened, { open, close }] = useDisclosure(false)

  return (
    <DefaultLayout>
      <Center className="h-screen flex flex-col gap-4">
        Choose a conversation or{' '}
        <Button ml="xs" onClick={open}>
          Start a new one
        </Button>
        <Text className="text-red-500">{message}</Text>
      </Center>
      <NewModal opened={opened} close={close} setMessage={setMessage} />
    </DefaultLayout>
  )
}

export default Page
