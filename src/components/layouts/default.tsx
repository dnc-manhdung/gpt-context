import { ActionIcon, AppShell, Flex, Text } from '@mantine/core'
import { IconPencilPlus, IconLogout } from '@tabler/icons-react'
import Navbar from './navbar'

interface LayoutProps {
  children: React.ReactNode
}

const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
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
            <ActionIcon size="40">
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
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}

export default DefaultLayout
