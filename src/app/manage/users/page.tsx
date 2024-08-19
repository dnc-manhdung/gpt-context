'use client'

import {
  Button,
  Center,
  Flex,
  Loader,
  Pagination,
  Table,
  Text
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconUserPlus } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import AdminLayout from '~/components/layouts/admin'
import DeactivateModal from '~/components/manage/users/deactivate-modal'
import RegisterModal from '~/components/manage/users/register-modal'
import { useUsers } from '~/hooks/useUsers'
import { RootState } from '~/store'
import { UserType } from '~/types/user'

const Page: React.FC = () => {
  const { getUsers } = useUsers
  const accessToken = useSelector((state: RootState) => state.auth.access_token)
  const [opened, { open, close }] = useDisclosure(false)
  const [deactivateId, setDeactivateId] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(1)

  const fetchUsers = async (): Promise<UserType[]> => {
    if (!accessToken) {
      throw new Error('Access token is required')
    }

    const res = await getUsers(accessToken, page)
    setTotalPage(res.meta.total_page)
    console.log(res.meta.total_page)
    return res.data
  }

  const [openedDeactivate, { open: openDeactivate, close: closeDeactivate }] =
    useDisclosure(false)

  const {
    data: users,
    error,
    isLoading,
    refetch
  } = useQuery<UserType[], Error>({
    queryKey: ['users', page],
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

  const handleOpenDeactivate = (id: number) => {
    setDeactivateId(id)
    openDeactivate()
  }

  return (
    <AdminLayout>
      <Center className="px-[100px]">
        <RegisterModal opened={opened} close={close} refetch={refetch} />
        <Flex direction="column" className="w-full mt-10" align="center">
          <Text size="xl" className="font-bold">
            Manage Users
          </Text>
          <Flex className="mt-16 self-end">
            <Button
              variant="light"
              rightSection={<IconUserPlus size={16} />}
              onClick={open}
            >
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
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {isLoading ? (
                <Table.Tr>
                  <Table.Td colSpan={6}>
                    <Loader />
                  </Table.Td>
                </Table.Tr>
              ) : (
                users &&
                users.map((user) => (
                  <>
                    <Table.Tr key={user.id}>
                      <Table.Td>{user.email}</Table.Td>
                      <Table.Td>{user.username}</Table.Td>
                      <Table.Td>{user.isVerified ? 'Yes' : 'No'}</Table.Td>
                      <Table.Td>{user.role}</Table.Td>
                      <Table.Td>{user.threadsCreated.length}</Table.Td>
                      <Table.Td>
                        <Button
                          color="red"
                          onClick={() => handleOpenDeactivate(user.id)}
                        >
                          Deactivate
                        </Button>
                      </Table.Td>
                    </Table.Tr>
                  </>
                ))
              )}
            </Table.Tbody>
          </Table>
          <Pagination
            value={page}
            onChange={setPage}
            total={totalPage}
            className="mt-4"
          />
        </Flex>
        <DeactivateModal
          opened={openedDeactivate}
          close={closeDeactivate}
          id={deactivateId}
        />
      </Center>
    </AdminLayout>
  )
}

export default Page
