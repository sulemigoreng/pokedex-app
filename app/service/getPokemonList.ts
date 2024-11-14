import { PokemonData } from "../interface/interface";

export async function getPokemonList({
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

export async function getPokemonListByType({type} : {type : string[]}) {
    const arr = await Promise.all(type.map(item => getSingleType(item)))
    const arrFlat = arr.flat();
    const arrOfPokemon = await getEachPokemon(arrFlat);
    return arrOfPokemon;
}

async function getSingleType(typeName: string) {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
    const data = await response.json();
    const pokemons = data.pokemon.map((item : {pokemon : any}) => item.pokemon); 
    return pokemons;
}
