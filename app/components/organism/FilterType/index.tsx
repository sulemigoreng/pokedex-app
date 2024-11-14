'use client'

import { useState } from "react";
import { TypeList } from "../../moleculs"
import { Button } from "../../atoms";

export default function FilterType() {
    const [showFilter, setShowFilter] = useState(false);

    return (
        <>
            {
                showFilter && (
                    <>
                        <div className="absolute h-full w-full bg-black bg-opacity-30 z-10 top-0 left-0" onClick={() => setShowFilter(!showFilter)}></div>
                        <div className="w-full lg:w-1/3 h-full fixed right-0 top-0 bg-white z-20 shadow-xl
                p-8 flex flex-col gap-4 text-black">
                            <div className="flex flex-row justify-between">
                                <h2>Filter Pokédex</h2>
                                <div onClick={() => setShowFilter(!showFilter)} className="cursor-pointer">X</div>
                            </div>
                            <TypeList showFilter={() => setShowFilter(!showFilter)} />
                        </div>
                    </>
                )
            }
            <Button
                onClick={() => setShowFilter(!showFilter)}
                className="border border-white text-white font-bold"
            >
                Filter
            </Button>
        </>
    )
}