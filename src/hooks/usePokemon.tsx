import { getPokemonListService } from "@/services/getPokemonList";
import { useQuery } from "react-query";

const usePokemon = (limit: number, offset: number) => {
  return useQuery({
    queryKey: ["get-pokemon", limit, offset],
    queryFn: () => getPokemonListService(limit, offset),
  });
};

export { usePokemon };
