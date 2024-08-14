'use client'

import { Button, Center, Flex, Loader, Table, Text } from '@mantine/core'
import { IconUserPlus } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import AdminLayout from '~/components/layouts/admin'
import { useUsers } from '~/hooks/useUsers'
import { RootState } from '~/store'
import { UserType } from '~/types/user'

const Page: React.FC = () => {
  const { getUsers } = useUsers
  const accessToken = useSelector((state: RootState) => state.auth.access_token)

  const fetchUsers = async (): Promise<UserType[]> => {
    if (!accessToken) {
      throw new Error('Access token is required')
    }

    const res = await getUsers(accessToken)
    return res
  }

  const {
    data: users,
    error,
    isLoading
  } = useQuery<UserType[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers
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
            Manage Users
          </Text>
          <Flex className="mt-16 self-end">
            <Button variant="light" rightSection={<IconUserPlus size={16} />}>
              Add new user
            </Button>
          </Flex>
          <Table withTableBorder highlightOnHover className="mt-4">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Email</Table.Th>
                <Table.Th>Username</Table.Th>
                <Table.Th>Is Verified</Table.Th>
                <Table.Th>Role</Table.Th>
                <Table.Th>Number of Conversations</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {isLoading ? (
                <Table.Tr>
                  <Table.Td colSpan={5}>
                    <Loader />
                  </Table.Td>
                </Table.Tr>
              ) : (
                users &&
                users.map((user) => (
                  <Table.Tr key={user.id}>
                    <Table.Td>{user.email}</Table.Td>
                    <Table.Td>{user.username}</Table.Td>
                    <Table.Td>{user.isVerified ? 'Yes' : 'No'}</Table.Td>
                    <Table.Td>{user.role}</Table.Td>
                    <Table.Td>{user.threadsCreated.length}</Table.Td>
                  </Table.Tr>
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
