import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export function useAuth() {
  const router = useRouter()

  const login = (token: string, user: any) => {
    // Lưu token vào cookie với thời hạn 24h
    Cookies.set('auth_token', token, { expires: 1 })
    // Lưu user info vào localStorage
    localStorage.setItem('user', JSON.stringify(user))
    // Trigger storage event manually vì localStorage.setItem không trigger trong cùng tab
    window.dispatchEvent(new Event('storage'))
  }

  const logout = () => {
    // Xóa token và user info
    Cookies.remove('auth_token')
    localStorage.removeItem('user')
    // Trigger storage event
    window.dispatchEvent(new Event('storage'))
    router.push('/auth/login')
  }

  return { login, logout }
} 