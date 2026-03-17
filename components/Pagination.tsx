import Link from "next/link";

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  basePath: string;
}

export default function Pagination({
  total,
  perPage,
  currentPage,
  basePath,
}: PaginationProps) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-10 flex items-center justify-center gap-1">
      {currentPage > 1 ? (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="flex h-8 w-8 items-center justify-center rounded text-sm transition-opacity hover:opacity-70"
          style={{ color: "var(--color-text-secondary)" }}
        >
          ←
        </Link>
      ) : (
        <span
          className="flex h-8 w-8 items-center justify-center rounded text-sm opacity-30"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          ←
        </span>
      )}

      {pageNumbers.map((n) => (
        <Link
          key={n}
          href={`${basePath}?page=${n}`}
          className="flex h-8 w-8 items-center justify-center rounded text-sm transition-opacity hover:opacity-70"
          style={{
            color:
              n === currentPage
                ? "var(--color-text-primary)"
                : "var(--color-text-secondary)",
            fontWeight: n === currentPage ? 500 : 400,
          }}
        >
          {n}
        </Link>
      ))}

      {currentPage < totalPages ? (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="flex h-8 w-8 items-center justify-center rounded text-sm transition-opacity hover:opacity-70"
          style={{ color: "var(--color-text-secondary)" }}
        >
          →
        </Link>
      ) : (
        <span
          className="flex h-8 w-8 items-center justify-center rounded text-sm opacity-30"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          →
        </span>
      )}
    </div>
  );
}
