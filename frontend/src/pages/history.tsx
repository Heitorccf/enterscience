import { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Search, Filter, CalendarClock, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '@/services/api';
import { Booking, PaginatedResponse } from '@/types';
import BookingCard from '@/components/BookingCard';
import toast from 'react-hot-toast';

export default function HistoryPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    // Fetch bookings from API
    const fetchBookings = useCallback(async (page = 1, query = '') => {
        setLoading(true);
        try {
            // Laravel endpoint: /bookings?page=1&q=search
            const response = await api.get<PaginatedResponse<Booking>>(`/bookings`, {
                params: {
                    page: page,
                    q: query
                }
            });

            setBookings(response.data.data);
            setCurrentPage(response.data.current_page);
            setLastPage(response.data.last_page);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial load
    useEffect(() => {
        fetchBookings(1, '');
    }, [fetchBookings]);

    // Search Debounce
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchBookings(1, searchTerm);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, fetchBookings]);

    // Handlers
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= lastPage) {
            fetchBookings(newPage, searchTerm);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Tem certeza que deseja excluir este agendamento?")) return;

        try {
            await api.delete(`/bookings/${id}`);
            toast.success("Show excluído com sucesso!");
            // Recarregar a lista mantendo a página atual se possível
            fetchBookings(currentPage, searchTerm);
        } catch (error) {
            console.error("Erro ao excluir", error);
            toast.error("Erro ao excluir o show.");
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-primary selection:text-dark">
            <Head>
                <title>Histórico de Contratações | EnterScience</title>
            </Head>

            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
            </div>

            <main className="max-w-7xl mx-auto px-6 lg:px-12 py-10 relative z-10">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                    <div>
                        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-primary transition-colors mb-4">
                            <ArrowLeft size={20} className="mr-2" />
                            Voltar para o início
                        </Link>
                        <h1 className="text-4xl font-bold flex items-center">
                            <CalendarClock className="mr-3 text-primary" size={36} />
                            Histórico de Shows
                        </h1>
                        <p className="text-gray-400 mt-2">Gerencie e visualize todos os eventos contratados.</p>
                    </div>

                    {/* Barra de Busca */}
                    <div className="w-full md:w-96">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                                <Search size={20} />
                            </div>
                            <input
                                type="text"
                                className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-gray-600"
                                placeholder="Buscar por artista ou contratante..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Lista de Contratações */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-3xl border border-white/10 border-dashed">
                        <Filter size={48} className="mb-4 text-gray-600" />
                        <h3 className="text-xl font-bold text-gray-400">Nenhuma contratação encontrada</h3>
                        <p className="text-gray-500 mt-2">Tente buscar por outro termo ou faça uma nova contratação.</p>
                        <Link href="/" className="mt-6 px-6 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full hover:bg-primary hover:text-dark transition-all font-bold">
                            Contratar Artista
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {bookings.map((booking) => (
                                <BookingCard 
                                    key={booking.id} 
                                    booking={booking} 
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>

                        {/* Controles de Paginação */}
                        {lastPage > 1 && (
                            <div className="flex justify-center items-center space-x-4">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                
                                <span className="text-gray-400 font-medium">
                                    Página <span className="text-white">{currentPage}</span> de {lastPage}
                                </span>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === lastPage}
                                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}