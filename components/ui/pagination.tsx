import { Button } from "@/components/ui/button"

interface PaginationProps {
  total: number
  page: number
  onPageChange: (page: number) => void
  itemsPerPage: number
}

export function Pagination({ total, page, onPageChange, itemsPerPage }: PaginationProps) {
  const totalPages = Math.ceil(total / itemsPerPage)

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >
        Trước
      </Button>
      
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Button
            key={p}
            variant={p === page ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(p)}
          >
            {p}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        Sau
      </Button>
    </div>
  )
} 