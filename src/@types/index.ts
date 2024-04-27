export type PokemonType = {
  name: string;
  imageUrl: string;
  abilities: string[];
};

export type PokemonApiResponseType = {
  results: { name: string; url: string }[];
};
