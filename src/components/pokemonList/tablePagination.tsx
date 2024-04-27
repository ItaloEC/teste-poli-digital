import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { useOffsetAndLimit } from "@/hooks/useOffsetAndLimit";

export default function TablePagination() {
  const { limit, offset } = useOffsetAndLimit();
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`?offset=${offset && offset - limit}&limit=${limit}`}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>{offset / limit + 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href={`?offset=${offset + limit}&limit=${limit}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
