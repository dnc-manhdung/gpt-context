'use client'

import { ActionIcon, AppShell, Flex, Loader, Text } from '@mantine/core'
import { IconPencilPlus, IconLogout } from '@tabler/icons-react'
import Navbar from './navbar'
import { useEffect, useRef } from 'react'
import NewModal from '../chat/new-modal'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { RootState } from '~/store'
import { clearToken } from '~/store/slices/authSlice'
import { useConversation } from '~/hooks/useConversation'
import { useQuery } from '@tanstack/react-query'
import { ThreadType } from '~/types/conversation'

interface LayoutProps {
  children: React.ReactNode
}

const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const accessToken = useSelector((state: RootState) => state.auth.access_token)
  const newModalRef = useRef<{ open: () => void }>(null)

  const { getConversations } = useConversation

  const handleOpenModal = () => {
    newModalRef.current?.open()
  }

  const fetchConversations = async () => {
    if (!accessToken) {
      throw new Error('Access token is required')
    }

    const res = await getConversations(accessToken)
    return res
  }

  const {
    data: conversations,
    isLoading,
    refetch
  } = useQuery<ThreadType[]>({
    queryKey: ['conversations'],
    queryFn: fetchConversations
  })

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
      router.push('/login')
    }
  }, [accessToken, router])

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
          <ActionIcon size="40" onClick={handleLogout}>
            <IconLogout />
          </ActionIcon>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar>
        {isLoading ? <Loader /> : <Navbar conversations={conversations} />}
      </AppShell.Navbar>
      <AppShell.Main className="h-fit">{children}</AppShell.Main>
      <NewModal ref={newModalRef} />
    </AppShell>
  )
}

export default DefaultLayout
