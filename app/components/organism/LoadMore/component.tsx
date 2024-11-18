'use client'

import { useEffect, useState } from "react";
import { CardPokemon } from "../../moleculs";
import { PokemonData } from "@/app/interface/interface";
import { useFilter } from "@/app/context/FilterContext";
import { getPokemonList, getPokemonListByType } from "@/app/service/getPokemonList";
import { Button, TypeBadge } from "../../atoms";

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
        setItems((prev) => [...prev, ...results]);
    };

    return (
        <>
            <div className="grow bg-white rounded-xl text-black text-xl overflow-y-auto w-full p-4
                flex flex-col gap-2 content-center">
                {
                    filter.length > 0 && !isLoading ?
                        <div className="flex flex-col w-full gap-2
                            bg-black bg-opacity-5 p-4 rounded-lg">
                            <h2 className="text-lg">Showing all pokemon with type :</h2>
                            <div className="flex flex-row flex-wrap gap-2">
                                {filter.map((item, index) => {
                                    return (
                                        <TypeBadge type={item} key={index}
                                            className={`text-lg`}
                                        />
                                    )
                                })}
                            </div>
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
                            : isLoading ? "Loading..." : "No Pokemon Found"
                    }
                </div>

            </div>
            {
                filter.length > 0 ? ""
                    : <Button onClick={fetchMore} className="bg-black bg-opacity-10 text-white font-bold">
                        Load More
                    </Button>
            }
        </>
    )
}