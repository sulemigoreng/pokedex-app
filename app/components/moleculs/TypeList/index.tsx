'use client'
import { useFilter } from "@/app/context/FilterContext";
import { TypeData } from "@/app/interface/interface";
import getTypeList from "@/app/service/getTypeList";
import { useEffect, useState } from "react";
import { Button, TypeBadge } from "../../atoms";

export default function TypeList({ showFilter }: { showFilter: () => void }) {
    const { filter, changeFilter } = useFilter();

    const [typeData, setTypeData] = useState([]);
    const [typeFiltered, setTypeFiltered] = useState<string[]>(filter);

    const fetchData = async () => {
        let res = await getTypeList();
        if (typeData) {
            res = res.filter((item: TypeData) => !typeFiltered.includes(item.name))
        }
        setTypeData(res);
    };

    useEffect(() => {
        fetchData();
    }, [typeFiltered])

    const setFilter = () => {
        changeFilter(typeFiltered);
        showFilter();
    }
    
    const clearFilter = () => {
        changeFilter([]);
        showFilter();
    }

    return (
        <>
            <Button className="bg-red-600 text-white" onClick={setFilter}>Set Filter</Button>
            <Button className="bg-white border border-red-600 text-red-600" onClick={clearFilter}>Clear Filter</Button>
            {
                typeFiltered ?
                    (
                        <div className="flex flex-col w-full gap-2
                            bg-black bg-opacity-5 p-4 rounded-md">
                            <h3 className="text-xs">Active Filter : </h3>
                            <div className="flex flex-row flex-wrap gap-2">
                                {typeFiltered.map((item: string, index: number) => {
                                    return (
                                        <TypeBadge type={item} key={index}
                                            onClick={() => setTypeFiltered(prev => prev.filter(f => f !== item))}
                                            className={`text-lg cursor-pointer`}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    ) : ''
            }
            <div className="flex flex-col w-full gap-2
                            bg-black bg-opacity-5 p-4 rounded-md">
                <h3 className="text-xs">Available Filter : </h3>
                <div className="flex flex-row flex-wrap gap-2">
                    {
                        typeData ?
                            typeData.map((item: TypeData, index: number) => {
                                return (
                                    <TypeBadge type={item.name} key={index}
                                        onClick={() => setTypeFiltered(prev => [...prev, item.name])}
                                        className={`text-lg cursor-pointer`}
                                    />
                                )
                            }) : 'Loading'
                    }
                </div>
            </div>
        </>
    )
}