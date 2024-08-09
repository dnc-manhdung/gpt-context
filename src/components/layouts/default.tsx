'use client'

import { ActionIcon, AppShell, Flex, Text } from '@mantine/core'
import { IconPencilPlus, IconLogout } from '@tabler/icons-react'
import Navbar from './navbar'
import { useRef } from 'react'
import NewModal from '../chat/new-modal'

interface LayoutProps {
  children: React.ReactNode
}

const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
  const newModalRef = useRef<{ open: () => void }>(null)

  const handleOpenModal = () => {
    newModalRef.current?.open()
  }

  const layout = {
    header: { height: 80 },
    navbar: { width: 300, breakpoint: 'sm' }
  }

  const chatList = [
    {
      id: 'abcd',
      name: 'Chat 1'
    },
    {
      id: 'dbca',
      name: 'Chat 2'
    }
  ]

  return (
    <AppShell {...layout}>
      <AppShell.Header>
        <Flex className="h-full px-10" justify="space-between" align="center">
          <Flex align="center" gap="md">
            <Text className="font-bold text-cyan-500 text-2xl" component="a">
              GPT-Context
            </Text>
            <ActionIcon size="40" onClick={handleOpenModal}>
              <IconPencilPlus />
            </ActionIcon>
          </Flex>
          <ActionIcon size="40">
            <IconLogout />
          </ActionIcon>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar>
        <Navbar chatList={chatList} />
      </AppShell.Navbar>
      <AppShell.Main className="h-fit">{children}</AppShell.Main>
      <NewModal ref={newModalRef} />
    </AppShell>
  )
}

export default DefaultLayout
