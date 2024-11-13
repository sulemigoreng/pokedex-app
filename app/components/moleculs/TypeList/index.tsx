'use client'
import { typeColors } from "@/app/const";
import { useFilter } from "@/app/context/FilterContext";
import { TypeData } from "@/app/interface/interface";
import getTypeList from "@/app/service/getTypeList";
import { useEffect, useState } from "react";

export default function TypeList() {
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
        fetchData()
    }, [typeFiltered])

    const setFilter = () => {
        changeFilter(typeFiltered)
    }

    return (
        <>
            <button className="bg-red-600" onClick={setFilter}>Set Filter</button>
            <div className="flex flex-row w-full flex-wrap gap-2 cursor-pointer">
                {
                    typeFiltered ?
                        typeFiltered.map((item: string, index: number) => {
                            return (
                                <div className="p-2 rounded-lg text-white text-sm" key={index} style={{
                                    backgroundColor: typeColors[item as keyof typeof typeColors] || '#000000'
                                }} onClick={() => setTypeFiltered(prev => prev.filter(f => f !== item))}>
                                    {item}
                                </div>
                            )
                        }) : ''
                }
            </div>
            <div className="flex flex-row w-full flex-wrap gap-2 cursor-pointer">
                {
                    typeData ?
                        typeData.map((item: TypeData, index: number) => {
                            return (
                                <div className="p-2 rounded-lg text-white text-sm" key={index} style={{
                                    backgroundColor: typeColors[item.name as keyof typeof typeColors] || '#000000'
                                }} onClick={() => setTypeFiltered(prev => [...prev, item.name])}>
                                    {item.name}
                                </div>
                            )
                        }) : 'Loading'
                }
            </div>
        </>
    )
}