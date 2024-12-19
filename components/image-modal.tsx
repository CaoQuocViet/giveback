import { useEffect } from "react"
import Image from "next/image"

import { addBodyNoScroll, removeBodyNoScroll } from "./news/utils/utils"

interface ImageModalProps {
  imageUrl: string
  onClose: () => void
}

export default function ImageModal({ imageUrl, onClose }: ImageModalProps) {
  useEffect(() => {
    // Thêm event listener để đóng modal khi bấm ESC
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    // Prevent body scroll when modal is open
    addBodyNoScroll()

    return () => {
      window.removeEventListener("keydown", handleEsc)
      removeBodyNoScroll()
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity"
      onClick={onClose}
    >
      <div className="relative max-h-[90vh] max-w-[90vw] scale-100 transition-transform duration-300">
        <Image
          src={imageUrl}
          alt="License Preview"
          className="max-h-[90vh] max-w-full cursor-zoom-out object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  )
}
