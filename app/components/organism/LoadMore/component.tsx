'use client'

import { useEffect, useState } from "react";
import { CardPokemon } from "../../moleculs";
import { PokemonData } from "@/app/interface/interface";
import { useFilter } from "@/app/context/FilterContext";
import { typeColors } from "@/app/const";
import { getPokemonList, getPokemonListByType } from "@/app/service/getPokemonList";

interface LoadMoreComponentProps {
    initialData: PokemonData[];
}

export const revalidate = 60;

export default function LoadMoreComponent({ initialData }: LoadMoreComponentProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState(initialData);
    const [offset, setOffset] = useState(20);
    const { filter } = useFilter();

    const filterPokemon = async () => {
        setIsLoading(true);
        const response = await getPokemonListByType({ type: filter });
        setItems(response);
        setIsLoading(false);
    }

    useEffect(() => {
        if (filter.length == 0) {
            setItems(initialData);
        } else {
            filterPokemon();
        }
    }, [filter])

    const fetchMore = async () => {
        const response = await getPokemonList({ offset: offset });
        setOffset((prev) => prev + 15);
        const results = await response;
        setItems((prev: any) => [...prev, ...results]);
    };

    return (
        <>
            <div className="grow bg-white rounded-xl text-black text-xl overflow-y-auto w-full p-4
                flex flex-col gap-4">
                {
                    filter.length > 0 && !isLoading ?
                        <div className="flex flex-row gap-4">
                            <h2>Showing results for :</h2>
                            {filter.map((item, index) => {
                                return (
                                    <div className="p-2 rounded-lg text-white text-sm" key={index} style={{
                                        backgroundColor: typeColors[item as keyof typeof typeColors] || '#000000'
                                    }}>
                                        {item.toUpperCase()}
                                    </div>
                                )
                            })}
                        </div> : ''
                }
                <div className="flex flex-wrap gap-2 w-full relative">
                    {
                        items.length > 0 && !isLoading ?
                            items.map((item: PokemonData, index: number) => {
                                return (
                                    <CardPokemon item={item} key={index} />
                                )
                            })
                            : "Loading..."
                    }
                </div>

            </div>
            <button
                onClick={fetchMore}
                className="p-2 rounded-lg bg-black bg-opacity-10 text-white font-bold"
            >
                Load More
            </button>
        </>
    )
}