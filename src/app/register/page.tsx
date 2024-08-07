'use client'

import { Button, TextInput, Text, Center } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'

interface FormValues {
  email: string
  username: string
  password: string
  confirm: string
}

const Page = () => {
  const [password, setPassword] = useState<string>()

  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirm: ''
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
      confirm: (value) =>
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

  return (
    <Center className="w-screen h-screen">
      <Center className=" p-8 flex flex-col gap-8">
        <Text span className="text-4xl">
          Start a new journey with GPT-Context
        </Text>
        <form
          className="flex flex-col items-center w-[400px]"
          onSubmit={form.onSubmit(() => console.log(1))}
        >
          <TextInput
            {...form.getInputProps('email')}
            key={form.key('email')}
            label="Email"
            placeholder="Email"
            size="lg"
            withAsterisk
            className="w-full"
          />
          <TextInput
            {...form.getInputProps('username')}
            key={form.key('username')}
            label="Username"
            placeholder="Username"
            size="lg"
            mt="lg"
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
          />
          <TextInput
            {...form.getInputProps('confirm')}
            key={form.key('confirm')}
            label="Confirm your password"
            placeholder="Confirm your password"
            size="lg"
            withAsterisk
            mt="lg"
            width={400}
            className="w-full"
          />
          <Button type="submit" mt="lg">
            Register
          </Button>
          <Text mt="lg">
            Have account?
            <Text
              ml="xs"
              component="a"
              href="/login"
              className="font-bold text-cyan-500"
            >
              Login now
            </Text>
          </Text>
        </form>
      </Center>
    </Center>
  )
}

export default Page
