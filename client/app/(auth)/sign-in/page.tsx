"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { LoginForm } from "@/components/login-form"
import { Spinner } from "@/components/ui/spinner"
import { authClient } from "@/lib/auth-client"

const Page = () => {
  const { data, isPending } = authClient.useSession()
  const router = useRouter()
  const isAuthenticated = Boolean(data?.session && data?.user)

  useEffect(() => {
    if (!isPending && isAuthenticated) {
      router.replace("/")
    }
  }, [isAuthenticated, isPending, router])

  if (isPending || isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return <LoginForm />
}

export default Page
