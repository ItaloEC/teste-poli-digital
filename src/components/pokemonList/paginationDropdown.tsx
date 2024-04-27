import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useOffsetAndLimit } from "@/hooks/useOffsetAndLimit";

export default function PaginationDropdown() {
  const router = useRouter();
  const { limit, offset } = useOffsetAndLimit();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Opções</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2 bg-gray-50 shadow">
        <DropdownMenuLabel>Pokémons por página</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={limit.toString()}
          onValueChange={(value) => {
            router.push(`?offset=${offset}&limit=${value}`);
          }}
        >
          <DropdownMenuRadioItem value="5">5</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="10">10</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="20">20</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
