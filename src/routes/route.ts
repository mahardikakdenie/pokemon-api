import { Router } from 'express';
import { getPokemons } from '../controller/pokemonController';

const router = Router();

// Define the route for fetching Pokémon data
router.get('/', getPokemons);

export default router;
