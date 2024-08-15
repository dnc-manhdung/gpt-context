'use client'

import { Button, Center, TextInput, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAuth } from '~/hooks/useAuth'
import { setToken } from '~/store/slices/authSlice'

interface FormValues {
  username: string
  password: string
}

const Page = () => {
  const [message, setMessage] = useState<string>()
  const dispatch = useDispatch()
  const router = useRouter()

  const { login } = useAuth

  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: ''
    },
    validate: {
      username: (value) => (value ? null : 'Username cannot be blank'),
      password: (value) => (value ? null : 'Password cannot be blank')
    }
  })

  const handleSubmit = async () => {
    const res = await login(form.getValues())

    if (res.message) {
      setMessage(res.message)
    } else {
      dispatch(setToken(res.access_token))
      if (res.role === 'user') {
        router.push('/chat')
      } else {
        router.push('/manage')
      }
    }
  }

  const mutation = useMutation({
    mutationFn: () => handleSubmit()
  })

  return (
    <Center className="w-screen h-screen">
      <Center className="p-8 flex flex-col gap-4">
        <Text span className="text-4xl">
          Login
        </Text>
        <form
          onSubmit={form.onSubmit(() => mutation.mutate())}
          className="flex flex-col items-center w-[300px]"
        >
          <TextInput
            {...form.getInputProps('username')}
            key={form.key('username')}
            label="Username"
            placeholder="Username"
            size="lg"
            className="w-full"
            disabled={mutation.status === 'pending'}
          />
          <TextInput
            {...form.getInputProps('password')}
            key={form.key('password')}
            label="Password"
            placeholder="Password"
            size="lg"
            mt="lg"
            width={400}
            className="w-full"
            type="password"
            disabled={mutation.status === 'pending'}
          />
          <Text mt="md" className="text-red-500">
            {message}
          </Text>
          <Button type="submit" mt="lg" loading={mutation.status === 'pending'}>
            Login
          </Button>
        </form>
      </Center>
    </Center>
  )
}

export default Page
