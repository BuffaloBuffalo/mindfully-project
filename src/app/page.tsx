import {listPokemon} from "@/api";
import {PokemonThumbnail} from "@/app/pokemon_thumbnail";
import {Metadata} from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Pokemon Gen 1 List',
    description: 'List of the first 151 Pokemon',
}

const PaginationLink = ({search, label}: { search: string | undefined | null, label: string }) => {
    if (search) {
        return <Link href={`${search}`} className="hover:underline hover:text-blue-800 text-blue-600">{label}</Link>;
    } else {
        return <span>{label}</span>;
    }
}

export default async function PokemonList({searchParams}) {
    const offset = parseInt(searchParams.offset || '0');
    const limit = parseInt(searchParams.limit || '151');
    const data = await listPokemon({offset, limit});

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-10">
            <h1 className="text-2xl">Pokemon List</h1>
            <div className="flex flex-wrap">
                {data.pokemon.map(p => <PokemonThumbnail key={p.name} pokemon={p}/>)}
            </div>
            <div className="flex w-full justify-between">
                <PaginationLink label="Previous" search={data.paginationInfo.prev}/>
                <PaginationLink label="Next" search={data.paginationInfo.next}/>
            </div>
        </main>
    )
}
