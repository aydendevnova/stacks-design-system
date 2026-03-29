import * as React from "react"
import { cn } from "@site/src/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}
Pagination.displayName = "Pagination"

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn("flex flex-row items-center gap-1", className)}
      style={{ listStyle: "none", margin: 0, padding: 0 }}
      {...props}
    />
  )
}
PaginationContent.displayName = "PaginationContent"

function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn("", className)} style={{ listStyle: "none", margin: 0, padding: 0 }} {...props} />
}
PaginationItem.displayName = "PaginationItem"

interface PaginationLinkProps
  extends React.ComponentProps<"a"> {
  isActive?: boolean
  size?: "default" | "sm" | "lg" | "icon"
}

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium transition-colors",
        "hover:bg-ghost-hover cursor-pointer select-none",
        isActive && "bg-ghost-hover",
        className
      )}
      {...props}
    />
  )
}
PaginationLink.displayName = "PaginationLink"

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn(
        "mr-4 w-auto gap-2 px-4 text-sm font-medium uppercase tracking-wider text-muted-foreground",
        className
      )}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>Previous</span>
    </PaginationLink>
  )
}
PaginationPrevious.displayName = "PaginationPrevious"

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn(
        "ml-4 w-auto gap-2 px-4 text-sm font-medium uppercase tracking-wider text-muted-foreground",
        className
      )}
      {...props}
    >
      <span>Next</span>
      <ChevronRight className="h-4 w-4" />
    </PaginationLink>
  )
}
PaginationNext.displayName = "PaginationNext"

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      aria-label="Show more pages"
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium text-muted-foreground transition-colors",
        "hover:bg-ghost-hover cursor-pointer select-none",
        className
      )}
      {...props}
    >
      &hellip;
    </button>
  )
}
PaginationEllipsis.displayName = "PaginationEllipsis"

function generatePaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount = 1
): (number | "ellipsis")[] {
  const range: (number | "ellipsis")[] = []

  const leftSibling = Math.max(currentPage - siblingCount, 1)
  const rightSibling = Math.min(currentPage + siblingCount, totalPages)

  const showLeftEllipsis = leftSibling > 2
  const showRightEllipsis = rightSibling < totalPages - 1

  if (totalPages <= 3 + siblingCount * 2) {
    for (let i = 1; i <= totalPages; i++) range.push(i)
    return range
  }

  range.push(1)

  if (showLeftEllipsis) {
    range.push("ellipsis")
  } else {
    for (let i = 2; i < leftSibling; i++) range.push(i)
  }

  for (let i = leftSibling; i <= rightSibling; i++) {
    if (i !== 1 && i !== totalPages) range.push(i)
  }

  if (showRightEllipsis) {
    range.push("ellipsis")
  } else {
    for (let i = rightSibling + 1; i < totalPages; i++) range.push(i)
  }

  range.push(totalPages)

  return range
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  generatePaginationRange,
}
