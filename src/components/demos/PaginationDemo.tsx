import * as React from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  generatePaginationRange,
} from "@site/src/components/ui/pagination"

export function PaginationDemo() {
  const [currentPage, setCurrentPage] = React.useState(1)
  const totalPages = 20

  const range = generatePaginationRange(currentPage, totalPages)

  function goTo(page: number) {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => goTo(currentPage - 1)}
            style={{ opacity: currentPage === 1 ? 0.4 : 1, pointerEvents: currentPage === 1 ? "none" : undefined }}
          />
        </PaginationItem>
        {range.map((item, i) =>
          item === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis
                onClick={() => goTo(i < range.length / 2 ? currentPage - 5 : currentPage + 5)}
              />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                onClick={() => goTo(item)}
                isActive={item === currentPage}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext
            onClick={() => goTo(currentPage + 1)}
            style={{ opacity: currentPage === totalPages ? 0.4 : 1, pointerEvents: currentPage === totalPages ? "none" : undefined }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
