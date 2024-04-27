"use client";
import { Loader } from "lucide-react";
import { usePokemon } from "@/hooks/usePokemon";
import { PokemonTable } from "./pokemonTable";
import { useOffsetAndLimit } from "@/hooks/useOffsetAndLimit";

export default function PokemonList() {
  const { offset, limit } = useOffsetAndLimit();

  const { data, isFetching, isError } = usePokemon(limit, +offset);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2">
      <h1 className="text-xl font-bold text-center">
        Teste Poli Digital - Frontend
      </h1>
      <h2 className="text-2xl font-bold text-center">Italo Alves de Lima</h2>
      <div className="w-full flex justify-center items-center">
        {isFetching ? (
          <Loader className="h-16 w-16 self-center animate-spin" />
        ) : isError ? (
          <h3>Erro ao buscar dados</h3>
        ) : (
          <PokemonTable data={data} limit={limit} offset={offset} />
        )}
      </div>
    </div>
  );
}
