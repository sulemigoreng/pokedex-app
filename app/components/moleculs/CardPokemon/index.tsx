import { PokemonData } from "@/app/interface/interface"
import { TypeBadge } from "../../atoms"
import Link from "next/link"
import { capFirst, padStr } from "@/app/utils/string"

export default function CardPokemon({ item }: { item: PokemonData }) {
    return (
        <>
            <Link href={`/detail/${item.id}`} className="p-4 bg-zinc-100 rounded-xl flex flex-col gap-2 w-[48%] lg:w-[12%] items-center cursor-pointer">
                <div><img src={item.sprites.front_default} alt="Pokemon Sprites" className="w-full" /></div>
                <div className="flex flex-col items-center">
                    <span className="text-sm font-pixel text-zinc-500">#{padStr(item.order, 4)}</span>
                    <span className="text-2xl font-bold font-pixel">{capFirst(item.name)}</span>
                </div>
                <div >
                    
                </div>
                <div className="flex gap-2 justify-center">
                    {
                        item.types.map(type => {
                            return (
                                <TypeBadge type={type.type.name} key={type.slot} />
                            )
                        })
                    }
                </div>
            </Link>
        </>
    )
}