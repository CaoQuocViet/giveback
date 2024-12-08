"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface ProfileAvatarProps {
  imageUrl?: string
  onUpload: (file: File) => void
}

export function ProfileAvatar({ imageUrl, onUpload }: ProfileAvatarProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="size-24">
        <AvatarImage src={imageUrl} alt="Avatar" />
        <AvatarFallback>
          <Icons.user className="size-12" />
        </AvatarFallback>
      </Avatar>

      <Button variant="outline" size="sm" className="w-[200px]">
        Thay đổi ảnh đại diện
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) onUpload(file)
          }}
        />
      </Button>
    </div>
  )
}
