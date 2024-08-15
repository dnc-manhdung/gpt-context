'use client'

import { Button, Modal, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { UserRole } from '~/constants/role'
import { useUsers } from '~/hooks/useUsers'
import { RootState } from '~/store'

interface ModalProps {
  opened: boolean
  close: () => void
  refetch: () => void
}

interface FormValues {
  email: string
  username: string
  password: string
  confirmation: string
  role: UserRole
}

const RegisterModal: React.FC<ModalProps> = ({ opened, close, refetch }) => {
  const [password, setPassword] = useState<string>()
  const { createUser } = useUsers
  const [message, setMessage] = useState<string>('')

  const accessToken =
    useSelector((state: RootState) => state.auth.access_token) || ''

  const form = useForm<FormValues>({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmation: '',
      role: UserRole.user
    },
    validate: {
      email: (value) =>
        !value
          ? 'Email cannot be blank!'
          : /^\S+@\S+\.\S+$/.test(value)
            ? null
            : 'Invalid email',
      username: (value) =>
        !value
          ? 'Username cannot be blank!'
          : value.length < 6
            ? 'Username must have at least 6 characters'
            : null,
      password: (value) => (!value ? 'Password cannot be blank!' : null),
      confirmation: (value) =>
        !value
          ? 'Confirmation password cannot be blank!'
          : value !== password
            ? 'Confirmation password does not match the password'
            : null
    },
    onValuesChange: (values) => {
      setPassword(values.password)
    }
  })

  const handleSubmit = async () => {
    const formData = {
      email: form.getValues().email,
      username: form.getValues().username,
      password: form.getValues().password,
      role: form.getValues().role
    }

    const res = await createUser(accessToken, formData)

    if (res.message) {
      setMessage(res.message)
    } else {
      form.reset()
      close()
      refetch()
    }
  }

  const mutation = useMutation({
    mutationFn: () => handleSubmit()
  })

  return (
    <Modal opened={opened} onClose={close} title="Create new user">
      <form
        className="px-4 flex flex-col gap-4"
        onSubmit={form.onSubmit(() => mutation.mutate())}
      >
        <TextInput
          {...form.getInputProps('email')}
          key={form.key('email')}
          label="Email"
          className="w-full"
          disabled={mutation.status === 'pending'}
        />
        <TextInput
          {...form.getInputProps('username')}
          key={form.key('username')}
          label="Username"
          className="w-full"
          disabled={mutation.status === 'pending'}
        />
        <TextInput
          {...form.getInputProps('password')}
          key={form.key('password')}
          label="Password"
          type="password"
          className="w-full"
          disabled={mutation.status === 'pending'}
        />
        <TextInput
          {...form.getInputProps('confirmation')}
          key={form.key('confirmation')}
          label="Confirm password"
          type="password"
          className="w-full"
          disabled={mutation.status === 'pending'}
        />
        <Select
          {...form.getInputProps('role')}
          key={form.key('role')}
          label="Role"
          data={Object.values(UserRole)}
          disabled={mutation.status === 'pending'}
        />
        <span className="text-red-500 mx-auto">{message}</span>
        <Button
          type="submit"
          className="w-1/2 mx-auto"
          loading={mutation.status === 'pending'}
        >
          Create
        </Button>
      </form>
    </Modal>
  )
}

export default RegisterModal
