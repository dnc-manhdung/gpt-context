'use client'

import { Button, Center, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'

interface LoginFormValues {
  username: string
  password: string
}

const Page = () => {
  const loginForm = useForm<LoginFormValues>({
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

  const [submittedValues, setSubmittedValues] = useState<
    typeof loginForm.values | null
  >(null)

  return (
    <Center className="w-screen h-screen">
      <Center className="border border-gray-300 rounded-lg p-8 flex flex-col gap-4">
        <span className="text-4xl">Login</span>
        <form
          onSubmit={loginForm.onSubmit(setSubmittedValues)}
          className="flex flex-col items-center"
        >
          <TextInput
            {...loginForm.getInputProps('username')}
            key={loginForm.key('username')}
            label="Username"
            placeholder="Username"
            size="lg"
            withAsterisk
          />
          <TextInput
            {...loginForm.getInputProps('password')}
            key={loginForm.key('password')}
            label="Password"
            placeholder="Password"
            size="lg"
            withAsterisk
            mt="lg"
            width={400}
          />
          <Button type="submit" mt="lg">
            Login
          </Button>
        </form>
      </Center>
    </Center>
  )
}

export default Page
