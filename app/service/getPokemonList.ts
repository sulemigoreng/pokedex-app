import { BASE_URL } from "../const";
import { PokemonData } from "../interface/interface";

export async function getPokemonList({
    limit,
    offset,
}: {
    limit?: number;
    offset?: number;
} = {limit : 20, offset : 0}) {
    const res = await fetch(
        `${BASE_URL}/pokemon/?limit=${limit}&offset=${offset}`,
    );

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    const arrOfPokemon = await getEachPokemon(data.results);
    return arrOfPokemon;
}

export async function getSinglePokemon(pokemonName: string) {
    return await fetch(`${BASE_URL}/pokemon/${pokemonName}`).then(res => res.json());
}

export async function getEachPokemon(pokemon: PokemonData[]) {
    const arr = await Promise.all(pokemon.map(pokemon => getSinglePokemon(pokemon.name)))
    return arr
}

export async function getPokemonListByType({type} : {type : string[]}) {
    const arr = await Promise.all(type.map(item => getSingleType(item)))
    const arrFlat = arr.flat();
    const arrOfPokemon = await getEachPokemon(arrFlat);
    return arrOfPokemon;
}

export async function getSingleType(typeName: string) {
    const response = await fetch(`${BASE_URL}/type/${typeName}`);
    const data = await response.json();
    const pokemons = data.pokemon.map((item : {pokemon : {name : string, url: string}}) => item.pokemon); 
    return pokemons;
}
