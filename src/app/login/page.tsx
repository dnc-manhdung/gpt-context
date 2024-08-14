'use client'

import { Button, Center, TextInput, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
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
    dispatch(setToken(res.access_token))
  }

  return (
    <Center className="w-screen h-screen">
      <Center className="p-8 flex flex-col gap-4">
        <Text span className="text-4xl">
          Login
        </Text>
        <form
          onSubmit={form.onSubmit(() => handleSubmit())}
          className="flex flex-col items-center w-[300px]"
        >
          <TextInput
            {...form.getInputProps('username')}
            key={form.key('username')}
            label="Username"
            placeholder="Username"
            size="lg"
            withAsterisk
            className="w-full"
          />
          <TextInput
            {...form.getInputProps('password')}
            key={form.key('password')}
            label="Password"
            placeholder="Password"
            size="lg"
            withAsterisk
            mt="lg"
            width={400}
            className="w-full"
            type="password"
          />
          <Text mt="md" className="text-red-500">
            {message}
          </Text>
          <Button type="submit" mt="lg">
            Login
          </Button>
        </form>
      </Center>
    </Center>
  )
}

export default Page
