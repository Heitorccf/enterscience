import React from 'react';
import { Booking } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, DollarSign, User, Music, Edit2, Trash2 } from 'lucide-react';

interface BookingCardProps {
    booking: Booking;
    onDelete?: (id: number) => void;
}

export default function BookingCard({ booking, onDelete }: BookingCardProps) {
    // Format Date to PT-BR
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        // Ajuste de fuso horário simples para exibir a data correta
        const userTimezoneOffset = date.getTimezoneOffset() * 60000;
        const offsetDate = new Date(date.getTime() + userTimezoneOffset);
        return new Intl.DateTimeFormat('pt-BR').format(offsetDate);
    };

    // Format Currency to BRL
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(amount);
    };

    return (
        <div className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 flex flex-col shadow-lg">
            {/* Header com Imagem do Artista */}
            <div className="relative h-28 bg-gray-800">
                {booking.artist_image_url ? (
                    <Image 
                        src={booking.artist_image_url} 
                        alt={booking.artist_name}
                        fill
                        className="object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-green-900 opacity-50" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                
                <div className="absolute bottom-3 left-4 flex items-center">
                    <Music size={16} className="text-primary mr-2" />
                    <h3 className="text-xl font-bold text-white truncate shadow-black drop-shadow-md">
                        {booking.artist_name}
                    </h3>
                </div>
            </div>

            {/* Corpo do Card */}
            <div className="p-5 space-y-4 flex-grow">
                
                {/* Contratante */}
                <div className="flex items-start">
                    <User size={16} className="text-gray-400 mt-1 mr-3 shrink-0" />
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Contratante</p>
                        <p className="text-gray-200 font-medium">{booking.contractor_name}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Data */}
                    <div className="flex items-start">
                        <Calendar size={16} className="text-gray-400 mt-1 mr-3 shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Data</p>
                            <p className="text-gray-200 font-medium">{formatDate(booking.event_date)}</p>
                        </div>
                    </div>

                    {/* Cachê */}
                    <div className="flex items-start">
                        <DollarSign size={16} className="text-gray-400 mt-1 mr-3 shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Cachê</p>
                            <p className="text-green-400 font-bold">{formatCurrency(booking.cache_amount)}</p>
                        </div>
                    </div>
                </div>

                {/* Endereço (se houver) */}
                {booking.event_address && (
                    <div className="flex items-start pt-2 border-t border-white/5">
                        <MapPin size={16} className="text-gray-400 mt-1 mr-3 shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Local</p>
                            <p className="text-gray-300 text-sm line-clamp-2">{booking.event_address}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Botões de Ação */}
            <div className="px-5 pb-5 pt-2 flex gap-3 mt-auto">
                <Link 
                    href={`/booking/edit/${booking.id}`}
                    className="flex-1 flex items-center justify-center py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                    <Edit2 size={16} className="mr-2" /> Editar
                </Link>
                {onDelete && (
                    <button 
                        onClick={() => onDelete(booking.id)}
                        className="flex-1 flex items-center justify-center py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
                    >
                        <Trash2 size={16} className="mr-2" /> Excluir
                    </button>
                )}
            </div>
            
            {/* Status Badge */}
            <div className="absolute top-3 right-3 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold px-2 py-1 rounded backdrop-blur-md">
                CONFIRMADO
            </div>
        </div>
    );
}