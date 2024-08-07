import { Button, Center } from '@mantine/core'
import Link from 'next/link'

export default function Page() {
  return (
    <Center className="text-4xl h-screen flex flex-col gap-4">
      Welcome to GPT-Context
      <Button size="lg" component={Link} href="/login">
        Start Now
      </Button>
    </Center>
  )
}
