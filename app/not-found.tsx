"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"

const NotFound = () => {
  const email = "vietcao10@gmail.com"
  const subject = "Phản hồi từ trang 404"
  const body = "Xin vui lòng nhập phản hồi của bạn ở đây."

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-8 dark:bg-gray-900">
      <div className="flex w-full max-w-2xl flex-col items-center justify-center rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800">
        <div className="space-y-6 p-6 text-center">
          <Image
            src="/images/error/404-error-img.svg"
            alt="404 Error"
            width={600}
            height={600}
            className="mx-auto"
          />
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-4xl">
            Trang không tồn tại
          </h1>
          <p className="text-base font-light text-gray-500 dark:text-gray-400">
            Chúng tôi rất tiếc, nhưng trang bạn đang tìm kiếm không tồn tại. Hãy
            kiểm tra lại URL hoặc quay lại trang chủ.
          </p>

          <Link href="/" legacyBehavior>
            <a className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-blue-900">
              Quay lại trang chủ
            </a>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default NotFound
