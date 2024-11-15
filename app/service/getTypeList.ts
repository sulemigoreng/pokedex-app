import { BASE_URL } from "../const";

export default async function getTypeList() {
    const res = await fetch(
        `${BASE_URL}/type`,
    );

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    
    const data = await res.json();
    return data.results;
}