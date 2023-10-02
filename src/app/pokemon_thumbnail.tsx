import Link from "next/link";

export function PokemonThumbnail({pokemon}) {
    return (
        <Link href={`/pokemon/${pokemon.name}`}
              className="border-solid border-2 rounded-md border-zinc-200 p-5 m-5 hover:text-blue-600 hover:underline hover:border-zinc-600">
            <img src={pokemon.thumbnail} alt={pokemon.name}/>
            <div className="font-bold text-center capitalize">{pokemon.name}</div>
        </Link>
    );
};
