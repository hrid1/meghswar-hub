"use client";

import React, { useMemo, useCallback } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight } from "lucide-react";

type PageToken = number | "ellipsis";

interface CustomPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;

  show?: boolean;

  totalItems?: number;
  itemsPerPage?: number;

  onItemsPerPageChange?: (itemsPerPage: number) => void;
  itemsPerPageOptions?: number[];
  showItemsPerPage?: boolean;

  itemsPerPageLabel?: string;
  showingLabel?: string;
  resultsLabel?: string;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function buildPages(totalPages: number, currentPage: number): PageToken[] {
  if (totalPages <= 0) return [];
  if (totalPages <= 4)
    return Array.from({ length: totalPages }, (_, i) => i + 1);

  if (currentPage <= 1) return [1, 2, "ellipsis", totalPages];
  if (currentPage === 2)
    return totalPages === 5
      ? [1, 2, 3, totalPages]
      : [1, 2, 3, "ellipsis", totalPages];
  if (currentPage >= totalPages)
    return [1, "ellipsis", totalPages - 1, totalPages];
  if (currentPage === totalPages - 1)
    return [1, "ellipsis", totalPages - 1, totalPages];

  return [1, "ellipsis", currentPage, "ellipsis", totalPages];
}

function getShowingRange(
  totalItems: number,
  page: number,
  itemsPerPage: number
) {
  if (!totalItems || totalItems <= 0) return { from: 0, to: 0 };
  const safePage = Math.max(1, page);
  const safePerPage = Math.max(1, itemsPerPage);

  const from = (safePage - 1) * safePerPage + 1;
  const to = Math.min(safePage * safePerPage, totalItems);

  return { from, to };
}

export default function CustomPagination({
  page,
  totalPages,
  onPageChange,

  show = true,

  totalItems = 0,
  itemsPerPage = 10,

  onItemsPerPageChange,
  itemsPerPageOptions = [3, 5, 10, 15, 20, 25, 30, 50],
  showItemsPerPage = false,

  itemsPerPageLabel = "Per page",
  showingLabel = "Showing",
  resultsLabel = "results",
}: CustomPaginationProps) {
  const safeTotalPages = Math.max(0, totalPages);
  const currentPage = useMemo(
    () => (safeTotalPages > 0 ? clamp(page, 1, safeTotalPages) : 1),
    [page, safeTotalPages]
  );

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < safeTotalPages;

  const pages = useMemo(
    () => buildPages(safeTotalPages, currentPage),
    [safeTotalPages, currentPage]
  );

  const showingRange = useMemo(
    () => getShowingRange(totalItems, currentPage, itemsPerPage),
    [totalItems, currentPage, itemsPerPage]
  );

  const goTo = useCallback(
    (p: number) => {
      if (safeTotalPages <= 0) return;
      const next = clamp(p, 1, safeTotalPages);
      if (next === currentPage) return;
      onPageChange(next);
    },
    [onPageChange, safeTotalPages, currentPage]
  );

  const handlePrevious = useCallback(() => {
    if (!hasPrev) return;
    goTo(currentPage - 1);
  }, [hasPrev, goTo, currentPage]);

  const handleNext = useCallback(() => {
    if (!hasNext) return;
    goTo(currentPage + 1);
  }, [hasNext, goTo, currentPage]);

  const handleItemsPerPageChange = useCallback(
    (value: string) => {
      const next = Number.parseInt(value, 10);
      if (!Number.isFinite(next) || next <= 0) return;

      onItemsPerPageChange?.(next);
      onPageChange(1);
    },
    [onItemsPerPageChange, onPageChange]
  );

  if (!show || safeTotalPages <= 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 select-none rounded-b-lg bg-white border-x border-b border-[#E9E9E9] py-4 px-5">
      {/* Left: Showing range */}
      <div className="whitespace-nowrap text-sm text-[#6B6B6B]">
        {showingLabel}{" "}
        <span className="font-semibold text-[#2B2B2B]">
          {showingRange.from}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-[#2B2B2B]">{showingRange.to}</span>{" "}
        of <span className="font-semibold text-[#2B2B2B]">{totalItems}</span>{" "}
        {resultsLabel}
      </div>

      {/* Middle: Items per page */}
      {showItemsPerPage && onItemsPerPageChange && (
        <div className="flex items-center gap-2 rounded-lg border border-[#E9E9E9] bg-white overflow-hidden">
          <p className="px-3 py-2 border-r border-[#E9E9E9] text-[#6B6B6B] text-sm font-medium">
            {itemsPerPageLabel}
          </p>

          <Select
            value={itemsPerPage.toString()}
            onValueChange={handleItemsPerPageChange}
          >
            <SelectTrigger className="h-9 border-none shadow-none bg-transparent px-3 cursor-pointer focus:ring-0">
              <SelectValue className="text-[#2B2B2B] text-sm font-semibold">
                {itemsPerPage}
              </SelectValue>
            </SelectTrigger>

            <SelectContent className="bg-white border border-[#E9E9E9] shadow-lg rounded-md">
              {itemsPerPageOptions.map((option) => (
                <SelectItem
                  key={option}
                  value={option.toString()}
                  className="text-[#2B2B2B] hover:bg-[#FFF2EC] focus:bg-[#FFF2EC] data-[state=checked]:bg-[#FFF2EC] data-[state=checked]:text-[#FE5000] px-3 py-2 cursor-pointer"
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Right: Pagination */}
      <div className="select-none">
        <Pagination>
          <PaginationContent>
            {/* Previous */}
            <PaginationItem className="mr-2">
              <div
                role="button"
                aria-disabled={!hasPrev}
                onClick={handlePrevious}
                className={`h-[36px] w-[36px] flex items-center justify-center rounded-md border border-[#E9E9E9] 
                  ${
                    !hasPrev
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:bg-[#FFF2EC]"
                  }
                `}
              >
                <ArrowLeft />
              </div>
            </PaginationItem>

            {/* Page numbers */}
            <div className="flex items-center rounded-md overflow-hidden border border-[#E9E9E9] bg-white">
              {pages.map((token, index) => {
                if (token === "ellipsis") {
                  return (
                    <PaginationItem key={`ellipsis-${index}`}>
                      <div className="min-w-[38px] h-[36px] flex items-center justify-center px-2 text-[#6B6B6B] border-r last:border-r-0 border-[#E9E9E9]  hover:bg-[#FFF2EC] ">
                        <PaginationEllipsis />
                      </div>
                    </PaginationItem>
                  );
                }

                const p = token;
                const isActive = p === currentPage;

                return (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href="#"
                      isActive={isActive}
                      aria-current={isActive ? "page" : undefined}
                      className={`
                            !min-w-[36px] !h-[36px] !px-0
                            !rounded-md !border-0 !shadow-none
                            !ring-0 !ring-offset-0 focus:!ring-0 focus-visible:!ring-0
                            hover:!bg-transparent hover:!text-black
                            ${
                            isActive
                                ? "!bg-[#FE5000] !text-white font-semibold"
                                : "!bg-transparent !text-black font-medium"
                            }
                        `}
                      onClick={(e) => {
                        e.preventDefault();
                        goTo(p);
                      }}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
            </div>

            {/* Next */}
            <PaginationItem className="ml-2">
              <div
                role="button"
                aria-disabled={!hasNext}
                onClick={handleNext}
                className={`h-9 w-9 flex items-center justify-center rounded-md border border-[#E9E9E9] bg-white
                  ${
                    !hasNext
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:bg-[#FFF2EC]"
                  }
                `}
              >
                <ArrowRight />
              </div>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
