const baseUrl = 'https://pokeapi.co/api/v2';
const BASE_STATIC_ASSET_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
type PokemonListResult = {
    count: number;
    next: string;
    previous: string;
    results: PokemonListResultItem[];
}

type PokemonListResultItem = {
    name: string;
    url: string;
}

type ThumbnailedPokemonListResultItem = PokemonListResult & {
    thumbnail: string;
}

type PaginationInfo = {
    offset: number;
    limit: number;
}

const extractOffsetAndLimit = (url: string | null) => {
    if (!url) {
        return null;
    }
    const params = new URL(url).search;
    return params;
}

const extractPaginationInfo = (paginationInfo: PaginationInfo, data: PokemonListResult) => {
    const nextUrl = data.next;
    const prevUrl = data.previous;

    return {
        next: extractOffsetAndLimit(nextUrl),
        prev: extractOffsetAndLimit(prevUrl),
    }
}

const makeThumbnail =
    (listResult: PokemonListResultItem) => {
        // regex out the id from the url
        const result = /\/v2\/pokemon\/(\d+)/.exec(listResult.url);
        if (!result) {
            throw new Error(`unable to extract pokemon # from url ${listResult.url}`);
        }
        const id = result[1];
        return {...listResult, thumbnail: `${BASE_STATIC_ASSET_URL}/${id}.png`}
    }

export async function listPokemon(paginationInfo: PaginationInfo) {
    const result = await fetch(`${baseUrl}/pokemon?limit=${paginationInfo.limit}&offset=${paginationInfo.offset}`);
    if (result.status > 299) {
        throw new Error('Error fetching Pokemon List');
    }
    const data = await result.json();
    const results = data.results.map(makeThumbnail);
    const updatedPaginationInfo = extractPaginationInfo(paginationInfo, data);
    return {pokemon: results, paginationInfo: updatedPaginationInfo};

}

export async function getPokemon(nameOrId: string) {
    const result = await fetch(`${baseUrl}/pokemon/${nameOrId}`);
    if (result.status > 299) {
        throw new Error(`Error fetching Pokemon ${nameOrId}`);
    }
    return result.json();
}
