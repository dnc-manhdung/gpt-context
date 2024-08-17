'use client'

import { Button, Center, Notification } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import NewModal from '~/components/chat/new-modal'
import DefaultLayout from '~/components/layouts/default'
import { notifications, Notifications } from '@mantine/notifications'

const Page = () => {
  const [opened, { open, close }] = useDisclosure(false)

  const showNotification = (message: string) => {
    notifications.show({
      message, // Nội dung thông báo
      color: 'red',
      position: 'top-center'
    })
  }

  return (
    <DefaultLayout>
      <Center className="h-screen flex flex-col gap-4">
        Choose a conversation or
        <Button ml="xs" onClick={open}>
          Start a new one
        </Button>
      </Center>
      <NewModal
        opened={opened}
        close={close}
        showNotification={showNotification}
      />
    </DefaultLayout>
  )
}

export default Page
