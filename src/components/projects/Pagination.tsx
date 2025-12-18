import React from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = [] as number[];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <nav className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md border border-border bg-card text-card-foreground"
      >
        Prev
      </button>

      {start > 1 && (
        <button
          onClick={() => onPageChange(1)}
          className="px-3 py-1 rounded-md text-foreground"
        >
          1
        </button>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded-md ${
            p === currentPage
              ? "font-semibold underline text-primary"
              : "text-foreground"
          }`}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <button
          onClick={() => onPageChange(totalPages)}
          className="px-3 py-1 rounded-md text-foreground"
        >
          {totalPages}
        </button>
      )}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md border border-border bg-card text-card-foreground"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
