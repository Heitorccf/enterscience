import React from 'react';
import { Artist } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { Users } from 'lucide-react';

interface ArtistCardProps {
    artist: Artist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
    return (
        <Link href={`/booking/${artist.id}`} className="group relative block h-full">
            <div className="flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl p-4 shadow-lg transition-all duration-300 hover:bg-white/10 hover:border-primary/30 hover:-translate-y-1">
                
                {/* Imagem Quadrada e Arredondada */}
                <div className="relative aspect-square w-full mb-4 overflow-hidden rounded-xl bg-gray-900 shadow-md">
                    <Image 
                        src={artist.picture_medium} 
                        alt={artist.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
                
                {/* Informações */}
                <div className="flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-white truncate mb-1" title={artist.name}>
                        {artist.name}
                    </h3>
                    
                    {artist.nb_fan && (
                        <div className="flex items-center text-gray-400 text-xs font-medium mb-4">
                            <Users size={12} className="mr-1 text-primary" />
                            <span>{new Intl.NumberFormat('pt-BR', { notation: "compact" }).format(artist.nb_fan)} fãs</span>
                        </div>
                    )}

                    {/* Botão Fixo (Estilo Novo) */}
                    <div className="mt-auto">
                        <button className="w-full py-2 px-4 bg-primary/10 hover:bg-primary text-primary hover:text-dark border border-primary/50 hover:border-primary rounded-lg text-sm font-bold uppercase tracking-wide transition-all duration-300">
                            Contratar
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}