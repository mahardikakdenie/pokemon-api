import { Request as ExpressRequest, Response } from 'express';
import { getPokemonService } from '../service/pokemonService';

export const getPokemons = async (req: ExpressRequest, res: Response) => {
  const { limit, offset } = req.query;
    const limitNumber = Number(limit) || 10; // Default limit to 10 if not provided
    const offsetNumber = Number(offset) || 0; // Default offset to 0 if not provided
    let cachedPokemonList: any[] | null = null; // Cache untuk menyimpan data Pokémon

    try {
        cachedPokemonList = await getPokemonService(limitNumber, offsetNumber);
        const result = {
          meta: {
            totalData: cachedPokemonList.length,
          },
          data: cachedPokemonList,
        };
         // Ambil data Pokémon dari cache atau API
       res.status(200).json(result); 
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Pokémon data' });
    }
}
