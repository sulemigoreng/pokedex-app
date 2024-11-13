import { PokemonData } from "../interface/interface";

export default async function getPokemonList({
    limit,
    offset,
}: {
    limit?: number;
    offset?: number;
} = {limit : 20, offset : 0}) {
    const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`,
    );

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    const arrOfPokemon = await getEachPokemon(data.results);
    return arrOfPokemon;
}

async function getSinglePokemon(pokemonName: string) {
    return await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(res => res.json());
}

async function getEachPokemon(pokemon: PokemonData[]) {
    const arr = await Promise.all(pokemon.map(pokemon => getSinglePokemon(pokemon.name)))
    return arr
}