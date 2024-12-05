import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

interface CommentListProps {
  comments: Array<{
    id: string
    content: string
    user: {
      name: string
      role: string
    }
    createdAt: string
  }>
}

export function CommentList({ comments }: CommentListProps) {
  return (
    <div className="space-y-4">
      <h4 className="font-medium">Bình luận</h4>
      <div className="space-y-3">
        {comments.map((comment) => (
          <div key={comment.id} className="text-sm">
            <div className="flex items-center gap-2">
              {comment.user && (
                <>
                  <span className="font-medium">{comment.user.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {comment.user.role}
                  </Badge>
                </>
              )}
              <span className="text-muted-foreground">
                {formatDate(comment.createdAt)}
              </span>
            </div>
            <p className="mt-1">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}