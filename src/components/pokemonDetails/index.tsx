import { PokemonType } from "@/@types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { getInicials } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface PokemonDetailsProps {
  pokemon: PokemonType | undefined;
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PokemonDetails({
  pokemon,
  open,
  setIsOpen,
}: PokemonDetailsProps) {
  return pokemon ? (
    <AlertDialog open={open} onOpenChange={setIsOpen}>
      {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
      <AlertDialogContent className="w-[90%] rounded-md">
        <AlertDialogHeader className="flex flex-col gap-2 items-center justify-center md:items-start ">
          <Avatar className="h-24 w-24 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-44 lg:w-44 bg-gray-100">
            <AvatarImage
              className="h-24 w-24 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-44 lg:w-44"
              src={pokemon.imageUrl}
            />
            <AvatarFallback>{getInicials(pokemon.name)}</AvatarFallback>
          </Avatar>
          <AlertDialogTitle className="capitalize text-lg">
            {pokemon.name}
          </AlertDialogTitle>
          <div className="flex gap-2 items-center justify-center">
            {pokemon.abilities.map((ability) => (
              <Badge key={ability} variant="outline">
                {ability}
              </Badge>
            ))}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-2">
          <Button onClick={() => setIsOpen(false)} variant={"outline"}>
            Cancelar
          </Button>
          <Button onClick={() => setIsOpen(false)} variant={"default"}>
            Ok
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ) : null;
}
