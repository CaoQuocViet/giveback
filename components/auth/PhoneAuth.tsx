"use client"

import { useState } from "react"

export default function PhoneAuth({
  onVerificationSuccess,
}: {
  onVerificationSuccess: () => void
}) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [requestId, setRequestId] = useState("")

  const formatPhoneNumber = (phone: string) => {
    if (phone.startsWith("0")) {
      return "84" + phone.slice(1)
    }
    if (!phone.startsWith("84")) {
      return "84" + phone
    }
    return phone
  }

  const handleSendOTP = async () => {
    try {
      const formattedPhone = formatPhoneNumber(phoneNumber)

      const response = await fetch("/api/verify/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: formattedPhone }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setRequestId(data.requestId)
      setMessage("Đã gửi mã OTP!")
      setError("")
    } catch (err) {
      setError("Lỗi gửi OTP: " + (err as Error).message)
    }
  }

  const handleVerifyOTP = async () => {
    try {
      const response = await fetch("/api/verify/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestId,
          code: verificationCode,
        }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setMessage("Xác thực thành công!")
      setError("")
      onVerificationSuccess()
    } catch (err) {
      setError("Mã OTP không hợp lệ")
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
          Số điện thoại:
        </label>
        <div className="flex gap-2">
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="0912345678"
            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
          />
          <button
            onClick={handleSendOTP}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Gửi OTP
          </button>
        </div>
      </div>

      {message && <div className="text-green-500">{message}</div>}
      {error && <div className="text-red-500">{error}</div>}

      {requestId && (
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Nhập mã OTP:
          </label>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="123456"
            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
          />
          <button
            onClick={handleVerifyOTP}
            className="focus:ring-primary-300 mt-2 w-full rounded-lg bg-green-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-4"
          >
            Xác nhận OTP
          </button>
        </div>
      )}
    </div>
  )
}
