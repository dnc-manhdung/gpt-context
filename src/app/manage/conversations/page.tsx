'use client'

import {
  Button,
  Center,
  Flex,
  Loader,
  Table,
  Text,
  TextInput
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import AdminLayout from '~/components/layouts/admin'
import { useAdminConversations } from '~/hooks/useAdminConversations'
import { RootState } from '~/store'
import { ThreadType } from '~/types/conversation'

const Page: React.FC = () => {
  const { getConversations } = useAdminConversations

  const accessToken = useSelector((state: RootState) => state.auth.access_token)

  const form = useForm({
    initialValues: {
      username: ''
    }
  })

  const fetchConversations = async () => {
    if (!accessToken) {
      throw new Error('Access token is required!')
    }

    const res = await getConversations(accessToken, form.getValues().username)
    return res
  }

  const {
    data: conversations,
    error,
    isLoading,
    refetch
  } = useQuery<ThreadType[], Error>({
    queryKey: ['adminConversations'],
    queryFn: fetchConversations
  })

  if (error) {
    return (
      <AdminLayout>
        <Center className="px-[100px]">
          <Text className="text-red-500">{error.message}</Text>
        </Center>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <Center className="px-[100px]">
        <Flex direction="column" className="w-full mt-10" align="center">
          <Text size="xl" className="font-bold">
            Manage Conversations
          </Text>
          <form
            className="self-start"
            onSubmit={form.onSubmit(() => refetch())}
          >
            <Flex justify="flex-start" align="flex-end" gap={16}>
              <TextInput
                {...form.getInputProps('username')}
                key={form.key('username')}
                label="Find conversations by username"
                mt={8}
                className="w-[500px]"
              />
              <Button type="submit">Search</Button>
            </Flex>
          </form>
          <Table withTableBorder highlightOnHover className="mt-4">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Title</Table.Th>
                <Table.Th>Context</Table.Th>
                <Table.Th>Creator Email</Table.Th>
                <Table.Th>Creator Username</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {isLoading ? (
                <Table.Tr>
                  <Table.Td colSpan={4}>
                    <Loader />
                  </Table.Td>
                </Table.Tr>
              ) : (
                conversations &&
                conversations.map((conversation) => (
                  <>
                    <Table.Tr key={conversation.id}>
                      <Table.Td>{conversation.title}</Table.Td>
                      <Table.Td>
                        {conversation.context || 'No context'}
                      </Table.Td>
                      <Table.Td>{conversation.creator.email}</Table.Td>
                      <Table.Td>{conversation.creator.username}</Table.Td>
                    </Table.Tr>
                  </>
                ))
              )}
            </Table.Tbody>
          </Table>
        </Flex>
      </Center>
    </AdminLayout>
  )
}

export default Page
