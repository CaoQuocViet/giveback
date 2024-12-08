import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface Comment {
  id: string
  content: string
  user: {
    name: string
    role: string
  }
  createdAt: string
}

function getRoleBadgeStyle(role: string) {
  switch (role) {
    case "ADMIN":
      return "bg-red-100 text-red-800 border-red-200"
    case "CHARITY":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "DONOR":
      return "bg-green-100 text-green-800 border-green-200"
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
          {/* Avatar placeholder */}
          <div className="flex size-10 items-center justify-center rounded-full bg-muted">
            <span className="text-lg font-medium">
              {comment.user.name.charAt(0).toUpperCase()}
            </span>
          </div>

          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <span className="font-medium">{comment.user.name}</span>
              <Badge className={`${getRoleBadgeStyle(comment.user.role)}`}>
                {getRoleLabel(comment.user.role)}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {formatDate(comment.createdAt)}
              </span>
            </div>

            <p className="whitespace-pre-wrap text-sm">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
