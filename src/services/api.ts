import Axios from "axios";

export const api = Axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});
