'use client'

import { useRouter, useParams } from 'next/navigation'
import DefaultLayout from '~/components/layouts/default'

const Page = () => {
  const router = useRouter()
  const params = useParams()
  const { id } = params

  return <DefaultLayout>{id}</DefaultLayout>
}

export default Page
