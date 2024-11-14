import { typeColors } from "@/app/const";
import { PokemonData } from "@/app/interface/interface";
import { padStr } from "@/app/utils/string";
import Link from "next/link";

export default async function DetailPage({ params }: { params: Promise<{ id: number }> }) {
    const id = (await params).id;
    const response: PokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())

    return (
        <>
            <Link href="/">
                Go Back
            </Link>
            <div className="grow bg-white rounded-xl text-black text-xl overflow-y-auto w-full p-4
                flex flex-col gap-4 content-center font-pixel">
                <div className="min-h-52 w-full flex justify-center rounded-lg"
                    style={{
                        backgroundColor: typeColors[response.types[0].type.name as keyof typeof typeColors] || '#000000'
                    }}
                >
                    <img src={response.sprites.front_default} alt="Pokemon Sprites" className="h-full" />
                </div>
                <div className="flex flex-row justify-between text-3xl">
                    <h2 className=" font-bold">
                        {response.name.replace(/^[a-z]/, function (m: string) { return m.toUpperCase() })}
                    </h2>
                    <h2>#{padStr(response.order, 4)}</h2>
                </div>
                <hr />
                <div className="flex flex-row gap-8 ">
                    <div className="flex flex-col text-3xl gap-2">
                        <div className="flex flex-row gap-2">
                            <span>Height : </span>
                            <span>{response.height / 10} m</span>
                        </div>
                        <div className="flex flex-row gap-2">
                            <span>Weight : </span>
                            <span>{response.weight / 10} kg</span>
                        </div>
                        <div className="flex flex-row gap-2">
                            <span>Abilities :</span>
                            {response.abilities.map((ability, index) => {
                                return (
                                    <div key={index}>
                                        {ability.ability.name.replace(/^[a-z]/, function (m: string) { return m.toUpperCase() })}
                                        {index + 1 < response.abilities.length ? ',': ''}
                                    </div>
                                )
                            })}</div>
                    </div>
                    <div className="flex flex-col text-3xl gap-2 grow">
                        <div className="flex flex-col gap-2">
                            <span>Base Stats : </span>
                            <div className="flex flex-row w-full flex-wrap gap-4">
                                {
                                    response.stats.map((item, index) => {
                                        return (
                                            <div className="w-[30%] flex justify-between p-2 bg-slate-100 rounded-lg" key={index}>
                                                <span>{item.stat.name.replace(/^[a-z]/, function (m: string) { return m.toUpperCase() })}</span>
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