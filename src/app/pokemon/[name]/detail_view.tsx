'use client';

import {useCallback, useState} from "react";

export default function DetailView({pokemon, icons}) {
    // thumbnail switcher
    const [selectedMainImage, setSelectedMainImage] = useState(pokemon?.sprites?.front_default);
    const handleImageClick = useCallback((e: any) => {
        const src = e.currentTarget.querySelector('img').src
        setSelectedMainImage(src);
    }, [setSelectedMainImage]);
    return (
        <div className="flex justify-center flex-col p-10 min-w-[600px] items-center">
            <h1 className="font-bold text-3xl capitalize">{pokemon.name}</h1>
            <img src={selectedMainImage as string} alt={pokemon.name} className="h-[300px] w-"/>
            <div>Alternate Images</div>
            <div className="flex flex-wrap p-5">
                {icons.map((icon: string, index) => (
                    <button key={icon}
                            className={`p-1 m-1 border-solid border-2 rounded-md ${selectedMainImage === icon ? 'border-black' : 'border-transparent'}`}
                            onClick={handleImageClick}>
                        <img src={icon} className="w-[100px]" alt="Alternative image"/>
                    </button>
                ))}
            </div>
        </div>
    )
};
