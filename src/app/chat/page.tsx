'use client'

import { Button, Center, Text } from '@mantine/core'
import { useRef } from 'react'
import NewModal from '~/components/chat/new-modal'
import DefaultLayout from '~/components/layouts/default'

const Page = () => {
  const newModalRef = useRef<{ open: () => void }>(null)

  const handleOpenModal = () => {
    newModalRef.current?.open()
  }

  return (
    <DefaultLayout>
      <Center className="h-screen">
        Choose a conversation or{' '}
        <Button ml="xs" onClick={handleOpenModal}>
          Start a new one
        </Button>
      </Center>
      <NewModal ref={newModalRef} />
    </DefaultLayout>
  )
}

export default Page
