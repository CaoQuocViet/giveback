import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  total: number
  page: number
  onPageChange: (page: number) => void
  itemsPerPage: number
}

export function Pagination({
  total,
  page,
  onPageChange,
  itemsPerPage,
}: PaginationProps) {
  const totalPages = Math.ceil(total / itemsPerPage)

  // Tính toán range của các trang hiển thị
  const getPageRange = () => {
    const range = []
    const maxVisible = 5 // Số nút trang tối đa hiển thị
    
    if (totalPages <= maxVisible) {
      // Hiển thị tất cả các trang nếu tổng số trang ít hơn maxVisible
      for (let i = 1; i <= totalPages; i++) range.push(i)
    } else {
      // Logic hiển thị trang với dấu ...
      let start = Math.max(1, page - 2)
      let end = Math.min(totalPages, start + maxVisible - 1)
      
      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1)
      }

      if (start > 1) range.push(1, '...')
      for (let i = start; i <= end; i++) range.push(i)
      if (end < totalPages) range.push('...', totalPages)
    }
    
    return range
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="h-8 w-8 bg-white hover:bg-blue-50"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-1">
        {getPageRange().map((p, idx) => (
          typeof p === 'number' ? (
            <Button
              key={idx}
              variant={p === page ? "default" : "outline"}
              size="icon"
              onClick={() => onPageChange(p)}
              className={`h-8 w-8 ${
                p === page 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "bg-white text-gray-700 hover:bg-blue-50"
              }`}
            >
              {p}
            </Button>
          ) : (
            <span key={idx} className="px-1 text-gray-500">
              {p}
            </span>
          )
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="h-8 w-8 bg-white hover:bg-blue-50"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
