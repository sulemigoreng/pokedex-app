import { typeColors } from "@/app/const";
import { PokemonData } from "@/app/interface/interface";
import { capFirst, padStr } from "@/app/utils/string";
import Image from "next/image";
import Link from "next/link";

export default async function DetailPage({ params }: { params: Promise<{ id: number }> }) {
    const id = (await params).id;
    const response: PokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())

    return (
        <>
            <Link href="/" className="font-bold">
                &lt; Go Back
            </Link>
            <div className="grow bg-white rounded-xl text-black text-xl overflow-y-auto w-full p-4
                flex flex-col gap-4 content-center font-pixel">
                <div className="min-h-52 w-full flex justify-center rounded-lg relative"
                    style={{
                        backgroundColor: typeColors[response.types[0].type.name as keyof typeof typeColors] || '#000000'
                    }}
                >
                    <img src={response.sprites.front_default} alt="Pokemon Sprites" className="h-full" />
                    <Image src="../bg-detail.svg" alt="pokemonLogo" width={100} height={100}
                        className="absolute right-0" />
                </div>
                <div className="flex flex-row justify-between text-3xl">
                    <h2 className=" font-bold">
                        {capFirst(response.name)}
                    </h2>
                    <h2>#{padStr(response.order, 4)}</h2>
                </div>
                <hr />
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-8 ">
                    <div className="flex flex-col text-3xl gap-2">
                        <div className="flex lg:flex-col gap-2">
                            <span>Height : </span>
                            <span>{response.height / 10} m</span>
                        </div>
                        <div className="flex lg:flex-col gap-2">
                            <span>Weight : </span>
                            <span>{response.weight / 10} kg</span>
                        </div>
                    </div>
                    <div className="flex flex-col text-3xl gap-2">
                        <span>Abilities :</span>
                        <div className="flex flex-col gap-4">
                            {response.abilities.map((ability, index) => {
                                return (
                                    <div key={index} className="p-2 rounded-lg text-white"
                                        style={{
                                            backgroundColor: typeColors[response.types[0].type.name as keyof typeof typeColors] || '#000000'
                                        }}>
                                        {capFirst(ability.ability.name)}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="flex flex-col text-3xl gap-2 grow">
                        <div className="flex flex-col gap-2">
                            <span>Base Stats : </span>
                            <div className="flex flex-row w-full flex-wrap gap-4">
                                {
                                    response.stats.map((item, index) => {
                                        return (
                                            <div className="w-[47%] lg:w-[32%] flex justify-between p-2 bg-slate-100 rounded-lg" key={index}>
                                                <span>{capFirst(item.stat.name)}</span>
                                                <span>{item.base_stat}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}