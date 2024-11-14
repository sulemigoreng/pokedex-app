import { PokemonData } from "@/app/interface/interface"
import { TypeBadge } from "../../atoms"

export default function CardPokemon({ item }: { item: PokemonData }) {
    return (
        <>
            <div className="p-4 bg-zinc-100 rounded-xl flex flex-col gap-2 xl:w-[12%] sm:w-[50%] items-center cursor-pointer">
                <div><img src={item.sprites.front_default} alt="Pokemon Sprites" className="w-full"/></div>
                <div className="text-2xl font-bold font-pixel">
                    {item.name.replace(/^[a-z]/, function (m: string) { return m.toUpperCase() })}
                </div>
                <div className="flex gap-2">
                    {
                        item.types.map(type => {
                            return (
                                <TypeBadge type={type.type.name} key={type.slot}/>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}