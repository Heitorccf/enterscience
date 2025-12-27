import { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import api from '@/services/api';
import { Artist } from '@/types';
import ArtistCard from '@/components/ArtistCard';
import { Search, Sparkles, Filter, Music4, Zap, Mic2, Drum } from 'lucide-react';
import clsx from 'clsx';

// Mapeamento de Gêneros da Deezer
const GENRES = [
    { id: 0, name: 'Tudo', icon: Sparkles },
    { id: 132, name: 'Pop', icon: Zap },
    { id: 152, name: 'Rock', icon: Drum },
    { id: 116, name: 'Rap/Hip Hop', icon: Mic2 },
    { id: 129, name: 'Jazz', icon: Music4 },
    { id: 165, name: 'R&B', icon: Music4 },
    { id: 98, name: 'Clássica', icon: Music4 },
    { id: 173, name: 'Electro', icon: Zap },
];

export default function Home() {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState(0); // 0 = Tudo
    const [loading, setLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchArtists = useCallback(async (resetList = false, query = '', genreId = 0) => {
        setLoading(true);
        try {
            const currentCount = resetList ? 0 : artists.length;
            let endpoint = '';

            if (query) {
                endpoint = `/artists/search?q=${query}&index=${currentCount}&limit=15`;
            } else {
                endpoint = `/artists/trending?index=${currentCount}&limit=15&genre_id=${genreId}`;
            }

            const response = await api.get(endpoint);
            const newData = response.data.data ? response.data.data : response.data;

            if (resetList) {
                setArtists(newData);
            } else {
                setArtists(prev => [...prev, ...newData]);
            }
            
            setHasMore(newData.length >= 15);

        } catch (error) {
            console.error('Error fetching artists:', error);
        } finally {
            setLoading(false);
        }
    }, [artists.length]);

    useEffect(() => {
        fetchArtists(true, '', 0);
    }, []); 

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm.trim()) {
                setIsSearching(true);
                setSelectedGenre(0); 
                fetchArtists(true, searchTerm);
            } else if (searchTerm === '' && isSearching) {
                setIsSearching(false);
                fetchArtists(true, '', selectedGenre);
            }
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const handleGenreClick = (id: number) => {
        if (isSearching) {
            setSearchTerm('');
            setIsSearching(false);
        }
        setSelectedGenre(id);
        fetchArtists(true, '', id);
    };

    const handleLoadMore = () => {
        fetchArtists(false, searchTerm, selectedGenre);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-primary selection:text-dark">
            <Head>
                <title>EnterScience Booking</title>
            </Head>

            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-green-900/20 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px]" />
            </div>

            <div className="relative z-10">
                
                {/* --- MENU DE NAVEGAÇÃO --- */}
                <nav className="flex justify-between items-center px-6 lg:px-12 py-6 max-w-7xl mx-auto">
                    <div className="font-bold text-xl tracking-tighter">
                        Enter<span className="text-primary">Science</span>
                    </div>
                    <Link href="/history" className="group flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium">
                        <span className="group-hover:text-primary transition-colors">Meus Shows</span>
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    </Link>
                </nav>

                {/* Hero Section */}
                <header className="pt-8 pb-12 px-6 lg:px-12 max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="max-w-2xl">
                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                                Descubra e <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">
                                    Contrate Talentos.
                                </span>
                            </h1>
                            <p className="text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed">
                                A plataforma definitiva para conectar artistas incríveis ao seu evento. Sem burocracia.
                            </p>
                        </div>
                        
                        {/* Search Bar Moderno */}
                        <div className="w-full md:w-auto min-w-[350px]">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                <div className="relative flex items-center bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-full p-2 shadow-2xl">
                                    <Search className="ml-4 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 px-4 py-3 text-base outline-none"
                                        placeholder="Buscar artista..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    {loading && (
                                        <div className="pr-4">
                                            <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Genre Filters - CORRIGIDO O CORTE DOS BOTÕES */}
                    {/* Adicionado padding vertical (py-8) e horizontal (px-2) para a sombra não cortar */}
                    <div className="mt-12 w-full overflow-x-auto py-8 px-2 scrollbar-hide">
                        <div className="flex space-x-3 items-center min-w-max">
                            {GENRES.map((genre) => {
                                const Icon = genre.icon;
                                const isActive = selectedGenre === genre.id;
                                return (
                                    <button
                                        key={genre.id}
                                        onClick={() => handleGenreClick(genre.id)}
                                        className={clsx(
                                            "flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap border",
                                            isActive 
                                                ? "bg-primary text-dark border-primary shadow-[0_0_25px_rgba(29,185,84,0.5)] scale-110 translate-y-[-2px] z-10" 
                                                : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/30"
                                        )}
                                    >
                                        <Icon size={16} />
                                        <span>{genre.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
                    <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-4">
                        <h2 className="text-3xl font-bold text-white flex items-center">
                            {isSearching ? 'Resultados da busca' : GENRES.find(g => g.id === selectedGenre)?.name === 'Tudo' ? 'Tendências Globais' : `Top ${GENRES.find(g => g.id === selectedGenre)?.name}`}
                        </h2>
                        <span className="text-gray-500 text-sm hidden md:block">
                            Mostrando {artists.length} resultados
                        </span>
                    </div>

                    {artists.length === 0 && !loading ? (
                        <div className="flex flex-col items-center justify-center py-32 text-gray-500">
                            <Filter size={48} className="mb-4 opacity-50" />
                            <p className="text-xl font-medium">Nenhum artista encontrado.</p>
                            <p className="text-sm mt-2">Tente buscar por outro termo ou gênero.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-6 gap-y-10">
                            {artists.map((artist, index) => (
                                <ArtistCard key={`${artist.id}-${index}`} artist={artist} />
                            ))}
                        </div>
                    )}
                    
                    {/* Botão Carregar Mais */}
                    {artists.length > 0 && hasMore && (
                        <div className="mt-20 flex justify-center">
                            <button
                                onClick={handleLoadMore}
                                disabled={loading}
                                className="group relative px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-full overflow-hidden transition-all duration-300 disabled:opacity-50"
                            >
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                <span className="relative flex items-center">
                                    {loading ? 'Carregando...' : 'Carregar Mais Artistas'}
                                </span>
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}