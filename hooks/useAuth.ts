import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export function useAuth() {
  const router = useRouter()

  const login = (token: string, user: any) => {
    // Lưu token vào cookie với thời hạn 24h
    Cookies.set('auth_token', token, { expires: 1 })
    // Lưu user info vào localStorage
    localStorage.setItem('user', JSON.stringify(user))
  }

  const logout = () => {
    // Xóa token và user info
    Cookies.remove('auth_token')
    localStorage.removeItem('user')
    router.push('/auth/login')
  }

  return { login, logout }
} 