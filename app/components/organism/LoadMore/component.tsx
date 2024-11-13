'use client'

import { useState } from "react";
import { CardPokemon } from "../../moleculs";
import { PokemonData } from "@/app/interface/interface";
import getPokemonList from "@/app/service/getPokemonList";

interface LoadMoreComponentProps {
    initialData: PokemonData[];
}
export const revalidate = 60;

export default function LoadMoreComponent({ initialData }: LoadMoreComponentProps) {
    const [items, setItems] = useState(initialData);
    const [offset, setOffset] = useState(20);

    const fetchMore = async () => {
        const response = await getPokemonList({ offset: offset });
        setOffset((prev) => prev + 15);
        const results = await response;
        setItems((prev: any) => [...prev, ...results]);
    };

    return (
        <>
            <div className="grow bg-white rounded-xl text-black text-xl overflow-y-auto w-full p-4">
                <div className="flex flex-wrap gap-2 w-full relative">
                    {
                        items.length > 0 ?
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