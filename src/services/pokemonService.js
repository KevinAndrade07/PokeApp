//Obtiene una lista de Pokemon
export const getPokemonList = async (limit = 20, offset = 0) => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Error al obtener la lista de Pokémon');
  const data = await response.json();
  return data.results;
};

//Obtiene los detalles de un Pokemon
export const getPokemonDetails = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al obtener los detalles del Pokémon');
    return await response.json();
  } catch (error) {
    console.error('getPokemonDetails ERROR:', error.message);
    throw error;
  }
};

// Obtiene la cadena evolutiva de un Pokémon usando su ID
export const getPokemonEvolutionChain = async (id) => {
  try {
    // 1. Obtener species info
    const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
    const speciesData = await speciesRes.json();

    // 2. Obtener URL de la cadena evolutiva
    const evolutionRes = await fetch(speciesData.evolution_chain.url);
    const evolutionData = await evolutionRes.json();

    return evolutionData.chain;
  } catch (error) {
    console.error('getPokemonEvolutionChain ERROR:', error.message);
    return null;
  }
};
