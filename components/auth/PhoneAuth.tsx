"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PhoneAuthProps {
  phone: string
  onVerificationSuccess: (code: string) => void
}

export default function PhoneAuth({
  phone,
  onVerificationSuccess,
}: PhoneAuthProps) {
  const [verificationCode, setVerificationCode] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleVerifyOTP = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone,
            code: verificationCode,
          }),
        }
      )

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message)
      }

      onVerificationSuccess(verificationCode)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Mã xác thực OTP</Label>
        <Input
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          placeholder="123456"
          maxLength={6}
        />
        <Button
          onClick={handleVerifyOTP}
          className="mt-2 w-full"
          disabled={isLoading}
        >
          {isLoading ? "Đang xác thực..." : "Xác nhận"}
        </Button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  )
}
