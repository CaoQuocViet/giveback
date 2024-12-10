"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Login() {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          identifier: email || phone,
          password,
          type: email ? "email" : "phone"
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Đăng nhập thất bại")
      }

      router.push("/")
    } catch (e) {
      setError((e as Error).message)
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

          <Tabs defaultValue="email" className="space-y-6">
            <TabsList className="grid grid-cols-2 dark:bg-gray-700">
              <TabsTrigger className="dark:text-gray-300 dark:data-[state=active]:bg-gray-600" value="email">Email</TabsTrigger>
              <TabsTrigger className="dark:text-gray-300 dark:data-[state=active]:bg-gray-600" value="phone">Số điện thoại</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit} className="space-y-4">
              <TabsContent value="email">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="abc@example.com"
                    className="transition-colors focus:ring-2 focus:ring-primary/20 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  />
                </div>
              </TabsContent>

              <TabsContent value="phone">
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+84 xxx xxx xxx"
                    className="transition-colors focus:ring-2 focus:ring-primary/20 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  />
                </div>
              </TabsContent>

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

              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 dark:hover:bg-primary/90">
                Đăng nhập
              </Button>
            </form>
          </Tabs>

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
