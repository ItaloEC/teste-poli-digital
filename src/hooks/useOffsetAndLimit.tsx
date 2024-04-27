import { useSearchParams } from "next/navigation";

export function useOffsetAndLimit() {
  const searchParams = useSearchParams();
  const offset = parseInt(searchParams.get("offset") || "0");
  const limit = parseInt(searchParams.get("limit") || "10");
  return { offset, limit };
}
