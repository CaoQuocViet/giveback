import Image from "next/image"
import { Star } from "lucide-react"

import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface Comment {
  id: string
  content: string
  user: {
    name: string
    role: string
    avatar: string
  }
  rating: number
  created_at: string
}

function getRoleBadgeStyle(role: string) {
  switch (role) {
    case "ADMIN":
      return "bg-red-100 text-red-800 border-red-200"
    case "CHARITY":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "DONOR":
      return "bg-green-100 text-green-800 border-green-200"
    case "BENEFICIARY":
      return "bg-purple-100 text-purple-800 border-purple-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

function getRoleLabel(role: string) {
  switch (role) {
    case "ADMIN":
      return "Quản trị viên"
    case "CHARITY":
      return "Tổ chức từ thiện"
    case "DONOR":
      return "Nhà hảo tâm"
    case "BENEFICIARY":
      return "Người nhận hỗ trợ"
    default:
      return role
  }
}

export function CommentList({ comments }: { comments: Comment[] }) {
  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="flex gap-4 rounded-lg border bg-card p-4"
        >
          <div className="flex size-10 items-center justify-center overflow-hidden rounded-full bg-muted">
            {comment.user.avatar ? (
              <Image
                src={comment.user.avatar}
                alt={comment.user.name}
                className="size-full object-cover"
                width={100}
                height={100}
              />
            ) : (
              // Placeholder khi không có avatar
              <span className="text-lg font-medium text-muted-foreground">
                {comment.user?.name ? comment.user.name.charAt(0) : ""}
              </span>
            )}
          </div>

          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <span className="font-medium">{comment.user.name}</span>
              <Badge className={`${getRoleBadgeStyle(comment.user.role)}`}>
                {getRoleLabel(comment.user.role)}
              </Badge>
              <div className="flex items-center gap-0.5">
                <Star className="size-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground">
                  {comment.rating}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {formatDate(comment.created_at)}
              </span>
            </div>

            <p className="whitespace-pre-wrap text-sm">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
