"use client"

import { useState, FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"

export default function Login() {
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          identifier,
          password,
          type: identifier.includes('@') ? 'email' : 'phone'
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Đăng nhập thất bại")
      }

      login(data.data.token, data.data.user)
      router.push(`/dashboard`)
      
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
          <div className="space-y-2 text-center mb-8">
            <h1 className="text-2xl font-bold dark:text-white">Đăng nhập</h1>
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              Đăng nhập để tiếp tục
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">Email hoặc số điện thoại</Label>
              <Input
                type="text"
                id="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="abc@example.com hoặc 0912345678"
                className="transition-colors focus:ring-2 focus:ring-primary/20 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="transition-colors focus:ring-2 focus:ring-primary/20 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                required
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-4 text-red-600 dark:text-red-400">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 dark:hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>

          <p className="text-sm text-center text-muted-foreground dark:text-gray-400 mt-6">
            Bạn chưa có tài khoản?{" "}
            <Link href="/auth/register" className="text-primary dark:text-primary-400 hover:underline font-medium">
              Đăng ký ở đây
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
