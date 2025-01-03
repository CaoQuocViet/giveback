import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

interface PaginationProps {
  total: number
  page: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({
  total,
  page,
  itemsPerPage,
  onPageChange,
  className,
}: PaginationProps) {
  const totalPages = Math.ceil(total / itemsPerPage)

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >
        <ChevronLeft className="size-4" />
      </Button>
      <div className="text-sm">
        Trang {page} / {totalPages}
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  )
}
