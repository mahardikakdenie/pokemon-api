import axios from "axios";

export const getPokemonService = async (limit: number, offset: number) => {
    let cachedPokemonList: any[] | null = null; // Cache untuk menyimpan data Pokémon
    try {
        if (cachedPokemonList) {
            return cachedPokemonList;
        }
    
        // Ambil list nama dan URL Pokémon
        const listResponse = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=' + limit + '&offset=' + offset);
        const pokemonList = listResponse.data.results;
    
        // Ambil detail masing-masing Pokémon
        const detailedPokemonList = await Promise.all(
          pokemonList.map(async (pokemon: any) => {
            const detailRes = await axios.get(pokemon.url);
            const data = detailRes.data;
    
            return {
              name: data.name,
              image: data.sprites.other['official-artwork'].front_default,
              abilities: data.abilities.map((ab: any) => ab.ability.name),
            };
          })
        );
    
        cachedPokemonList = detailedPokemonList;
      } catch (err) {
        console.error("Error fetching Pokémon data:", err);
        throw new Error("Failed to fetch Pokémon data");
      }

      return cachedPokemonList;
}
