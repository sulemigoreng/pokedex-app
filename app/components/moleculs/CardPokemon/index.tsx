import { typeColors } from "@/app/const"
import { PokemonData } from "@/app/interface/interface"

export default function CardPokemon({ item }: { item: PokemonData }) {
    return (
        <>
            <div className="p-4 bg-zinc-100 rounded-xl font-pixel flex flex-col gap-2 xl:w-[12%] sm:w-[50%] items-center cursor-pointer">
                <div><img src={item.sprites.front_default} alt="Pokemon Sprites" className="w-full"/></div>
                <div className="text-2xl font-bold">
                    {item.name.replace(/^[a-z]/, function (m: string) { return m.toUpperCase() })}
                </div>
                <div className="flex gap-2">
                    {
                        item.types.map(type => {
                            return (
                                <div className="p-2 rounded-lg text-white text-sm" key={type.slot} style={{
                                    backgroundColor: typeColors[type.type.name as keyof typeof typeColors] || '#000000'
                                }}>
                                    {type.type.name.toUpperCase()}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}