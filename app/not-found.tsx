'use client';
import React from 'react';
import Link from "next/link";
import Image from "next/image";

const NotFound = () => {
  const email = "vietcao10@gmail.com";
  const subject = "Phản hồi từ trang 404";
  const body = "Xin vui lòng nhập phản hồi của bạn ở đây.";

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center w-full max-w-2xl bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-6 text-center">
          <Image
            src="/images/error/404-error-img.svg"
            alt="404 Error"
            layout="responsive"
            width={600}
            height={600}
            className="mx-auto"
          />
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-white">
            Trang không tồn tại
          </h1>
          <p className="text-base font-light text-gray-500 dark:text-gray-400">
            Chúng tôi rất tiếc, nhưng trang bạn đang tìm kiếm không tồn tại. Hãy kiểm tra lại URL hoặc quay lại trang chủ.
          </p>

          <Link href="/" legacyBehavior>
            <a className="mt-4 inline-block px-4 py-2 text-base font-medium text-white bg-blue-600 rounded hover:bg-blue-900 transition duration-200">
              Quay lại trang chủ
            </a>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
