'use client'

import { ActionIcon, AppShell, Flex, Text } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '~/store'
import { clearToken } from '~/store/slices/authSlice'

interface LayoutProps {
  children: React.ReactNode
}

const AdminLayout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const accessToken = useSelector((state: RootState) => state.auth.access_token)

  const layout = {
    header: { height: 80 },
    navbar: { width: 300, breakpoint: 'sm' }
  }

  const handleLogout = () => {
    dispatch(clearToken())
    router.push('/')
  }

  useEffect(() => {
    if (!accessToken) {
      router.push('/')
    }
  }, [accessToken, router])

  return (
    <AppShell {...layout}>
      <AppShell.Header>
        <Flex className="h-full px-10" align="center" justify="space-between">
          <Flex gap={64}>
            <Text
              component="a"
              className="text-cyan-500 hover:text-cyan-600"
              href="/manage/users"
            >
              Manage Users
            </Text>
            <Text
              component="a"
              className="text-cyan-500 hover:text-cyan-600"
              href="/manage/conversations"
            >
              Manage Conversations
            </Text>
          </Flex>
          <ActionIcon size="40" onClick={handleLogout}>
            <IconLogout />
          </ActionIcon>
        </Flex>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}

export default AdminLayout
