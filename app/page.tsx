import Image from "next/image";
import { LoadMore } from "./components/organism";

export default async function Home() {
  return (
    <div className={`flex flex-col gap-4 text-white h-full`}>
      <div className="flex items-center gap-4">
        <Image src="pokemon.svg" alt="pokemonLogo" width={30} height={100} />
        <h1 className="text-2xl">Pokédex</h1>
      </div>
      <div>
        <input type="text" name="search" id="search" placeholder="Search"
          className="p-2 rounded-xl w-full text-black pl-4" />
      </div>
      <div>
        Filter
      </div>

      <LoadMore />
    </div>
  );
}
