import Image from "next/image";
import { FilterType, LoadMore } from "./components/organism";
import { FilterProvider } from "./context/FilterContext";
export default async function Home() {
  return (
    <FilterProvider>
      <div className={`flex flex-col gap-4 text-white h-full p-8`}>
       
        <div className="flex items-center gap-4">
          <Image src="pokemon.svg" alt="pokemonLogo" width={30} height={100} />
          <h1 className="text-2xl">Pokédex</h1>
        </div>
        <div>
          <input type="text" name="search" id="search" placeholder="Search"
            className="p-2 rounded-xl w-full text-black pl-4" />
        </div>
        <FilterType />
        <LoadMore />
      </div>
    </FilterProvider>
  );
}
