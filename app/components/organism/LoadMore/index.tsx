import { getPokemonList } from "@/app/service/getPokemonList";
import LoadMoreComponent from "./component";

export default async function LoadMore() {
    const initialData = await getPokemonList();
    return (
        <LoadMoreComponent initialData={initialData} />
    )
}