import { PokemonApiResponseType, PokemonType } from "@/@types";
import { api } from "./api";

export async function getPokemonListService(limit: number, offset: number) {
  const {
    data: { results },
  } = await api.get<PokemonApiResponseType>(
    `/pokemon?limit=${limit}&offset=${offset}`
  );

  const pokemonDetails = await Promise.all(
    results.map(async (pokemon) => {
      const { data } = await api.get(pokemon.url);
      const abilities = data.abilities.map(
        (ability: { ability: { name: string } }) => ability.ability.name
      );
      const imageUrl = data.sprites.front_default;
      return { name: pokemon.name, imageUrl, abilities } as PokemonType;
    })
  );

  return pokemonDetails;
}
