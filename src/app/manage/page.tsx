'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import AdminLayout from '~/components/layouts/admin'

const Page: React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/manage/users')
  }, [router])

  return (
    <AdminLayout>
      <div></div>
    </AdminLayout>
  )
}

export default Page
