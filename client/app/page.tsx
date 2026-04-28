"use client"

import Image from "next/image"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { authClient } from "@/lib/auth-client"

export default function Home() {
  const { data, isPending } = authClient.useSession()
  const router = useRouter()
  const user = data?.user
  const isAuthenticated = Boolean(data?.session && data?.user)

  useEffect(() => {
    if (!isPending && !isAuthenticated) {
      router.replace("/sign-in")
    }
  }, [isAuthenticated, isPending, router])

  if (isPending || !isAuthenticated || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-sans">
      <div className="w-full max-w-md px-4">
        <div className="space-y-8">
          <div className="rounded-2xl border-2 border-dashed border-zinc-700 bg-zinc-900/50 p-8 backdrop-blur-sm">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <Image
                  src={user.image || "/vercel.svg"}
                  alt={user.name || "User"}
                  width={120}
                  height={120}
                  unoptimized
                  className="rounded-full border-2 border-dashed border-zinc-600 object-cover"
                />
                <div className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full border-2 border-zinc-900 bg-emerald-500" />
              </div>
            </div>

            <div className="space-y-3 text-center">
              <h1 className="truncate text-3xl font-bold text-zinc-50">Welcome, {user.name || "User"}</h1>
              <p className="text-sm text-zinc-400">Authenticated User</p>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border-2 border-dashed border-zinc-700 bg-zinc-900/50 p-6 backdrop-blur-sm">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Email Address</p>
              <p className="break-all text-lg font-medium text-zinc-100">{user.email}</p>
            </div>
          </div>

          <Button
            onClick={() =>
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => router.replace("/sign-in"),
                },
              })
            }
            className="h-11 w-full rounded-lg bg-red-600 font-semibold text-white transition-colors hover:bg-red-700"
          >
            Sign Out
          </Button>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 border-t border-dashed border-zinc-700" />
            <span className="text-xs text-zinc-600">Session Active</span>
            <div className="h-px flex-1 border-t border-dashed border-zinc-700" />
          </div>
        </div>
      </div>
    </div>
  )
}
