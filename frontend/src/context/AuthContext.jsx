import { createContext, useContext, useState } from "react"

import * as authApi from "@/api/auth"

// AUTH-01·02 인증 상태 — 우선 메모리 상태만 (새로고침 시 초기화)
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = async (provider) => {
    const nextUser =
      provider === "kakao"
        ? await authApi.loginWithKakao()
        : await authApi.loginWithGoogle()
    setUser(nextUser)
    return nextUser
  }

  const logout = async () => {
    await authApi.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth는 AuthProvider 안에서만 사용할 수 있습니다")
  return ctx
}
