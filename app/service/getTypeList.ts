export default async function getTypeList() {
    const res = await fetch(
        `https://pokeapi.co/api/v2/type`,
    );

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    
    const data = await res.json();
    return data.results;
}