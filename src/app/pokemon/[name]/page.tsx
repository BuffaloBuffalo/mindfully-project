import {Metadata, ResolvingMetadata} from "next";
import {Props} from "next/script";
import {getPokemon} from "@/api";
import {useCallback, useState} from "react";
import DetailView from "@/app/pokemon/[name]/detail_view";

export async function generateMetadata(
    {params}: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const pokemon = await getPokemon(params.name);
    return {
        title: pokemon.name.length ? pokemon.name[0].toUpperCase() + pokemon.name.slice(1) : pokemon.name,
        icons: [
            pokemon?.sprites?.front_default
        ],
    }
}

/**
 * Given a sprite structure of nested thumbnail descriptor-> URL, return a flat array of all images
 * @param spriteObject
 */
function recursiveReduce(spriteObject: any) {
    return Object.entries(spriteObject).reduce((acc, [key, value]) => {
        if (value) {
            if (typeof value === 'string') {
                acc.push(value);
            } else {
                const results = recursiveReduce(value);
                acc.push(...results);
            }
        }
        return acc;
    }, []);
}

export default async function Page({params}) {
    const data = await getPokemon(params.name);
    const icons = recursiveReduce(data.sprites);
    return (
        <DetailView pokemon={data} icons={icons}/>
    );
}
