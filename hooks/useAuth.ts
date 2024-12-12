import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const login = (token: string, userData: any) => {
    // Save token in cookies with a 1-day expiration
    Cookies.set("auth_token", token, { expires: 1 })

    // Save user data in localStorage
    localStorage.setItem("user", JSON.stringify(userData))

    // Update state
    setUser(userData)
    setLoading(false)

    // Trigger storage event to synchronize across tabs
    window.dispatchEvent(new Event("storage"))
  }

  const logout = () => {
    // Remove token and user data
    Cookies.remove("auth_token")
    localStorage.removeItem("user")

    // Update state
    setUser(null)
    setLoading(false)

    // Trigger storage event to synchronize across tabs
    window.dispatchEvent(new Event("storage"))

    // Redirect to login page
    router.push("/auth/login")
  }

  useEffect(() => {
    const token = Cookies.get("auth_token")
    const userStr = localStorage.getItem("user")

    if (token && userStr) {
      const userData = JSON.parse(userStr)
      setUser(userData)
    }

    setLoading(false)

    // Listen for storage events to handle login/logout across tabs
    const handleStorage = () => {
      const updatedToken = Cookies.get("auth_token")
      const updatedUserStr = localStorage.getItem("user")
      if (updatedToken && updatedUserStr) {
        const updatedUser = JSON.parse(updatedUserStr)
        setUser(updatedUser)
      } else {
        setUser(null)
      }
    }

    window.addEventListener("storage", handleStorage)

    return () => {
      window.removeEventListener("storage", handleStorage)
    }
  }, [])

  return { user, isAuthenticated: !!user, loading, login, logout }
}
