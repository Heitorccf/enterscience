import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ArrowLeft, Calendar, MapPin, DollarSign, User, CheckCircle } from 'lucide-react';

import api from '@/services/api';
import { Artist } from '@/types';

interface BookingFormData {
    contractor_name: string;
    event_date: string;
    cache_amount: string;
    event_address: string;
}

export default function BookingPage() {
    const router = useRouter();
    const { id } = router.query;

    const [artist, setArtist] = useState<Artist | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<BookingFormData>();

    useEffect(() => {
        if (!id) return;
        const fetchArtist = async () => {
            try {
                const response = await api.get(`/artists/${id}`);
                setArtist(response.data);
            } catch (error) {
                console.error('Failed to load artist', error);
                toast.error('Erro ao carregar dados do artista.');
            } finally {
                setLoading(false);
            }
        };
        fetchArtist();
    }, [id]);

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        value = value.replace(/\D/g, "");

        if (value === "") {
            setValue("cache_amount", "");
            return;
        }

        const amount = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(parseFloat(value) / 100);

        setValue("cache_amount", amount);
    };

    const onSubmit = async (data: BookingFormData) => {
        if (!artist) return;

        setSubmitting(true);
        try {
            // Limpeza de espaços (Trim) e formatação de moeda
            const cleanName = data.contractor_name.trim();
            const cleanAddress = data.event_address.trim();
            const cleanCache = data.cache_amount 
                ? parseFloat(data.cache_amount.replace(/[^\d,]/g, '').replace(',', '.')) 
                : 0;

            const payload = {
                contractor_name: cleanName,
                artist_id: artist.id.toString(),
                artist_name: artist.name,
                artist_image_url: artist.picture_medium,
                event_date: data.event_date,
                cache_amount: cleanCache,
                event_address: cleanAddress
            };

            await api.post('/bookings', payload);
            
            setSuccess(true);
            toast.success('Contratação realizada com sucesso!');
            
        } catch (error) {
            console.error('Booking error', error);
            toast.error('Erro ao salvar contratação.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
                <div className="bg-white/5 border border-white/10 p-10 rounded-3xl text-center max-w-lg w-full backdrop-blur-md animate-fade-in">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 mb-6">
                        <CheckCircle className="h-10 w-10 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Sucesso!</h2>
                    <p className="text-gray-300 mb-8">
                        A contratação de <span className="text-primary font-bold">{artist?.name}</span> foi registrada.
                    </p>
                    <div className="flex flex-col gap-3">
                        <Link href="/" className="w-full py-3 bg-primary text-dark font-bold rounded-xl hover:bg-green-400 transition-colors">
                            Nova Contratação
                        </Link>
                        <Link href="/history" className="w-full py-3 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
                            Ver Histórico
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans py-10 px-4 md:px-8">
            <Head>
                <title>Contratar {artist?.name} | EnterScience</title>
            </Head>

            <div className="max-w-6xl mx-auto">
                <Link href="/" className="inline-flex items-center text-gray-400 hover:text-primary transition-colors mb-8">
                    <ArrowLeft size={20} className="mr-2" />
                    Voltar para a busca
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* Detalhes do Artista */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                             {artist?.picture_medium && (
                                <Image 
                                    src={artist.picture_medium} 
                                    alt={artist.name}
                                    fill
                                    className="object-cover"
                                />
                             )}
                             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                             <div className="absolute bottom-6 left-6">
                                <h1 className="text-4xl font-bold text-white mb-1">{artist?.name}</h1>
                                <p className="text-primary font-medium">Artista Selecionado</p>
                             </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                            <h3 className="text-lg font-semibold mb-4 text-gray-200">Resumo</h3>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li className="flex items-center">
                                    <CheckCircle size={16} className="mr-3 text-green-500" />
                                    Contratação segura
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle size={16} className="mr-3 text-green-500" />
                                    Pagamento direto
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Formulário */}
                    <div className="lg:col-span-8">
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-md shadow-2xl">
                            <h2 className="text-2xl font-bold mb-6 flex items-center">
                                <span className="bg-primary/20 text-primary p-2 rounded-lg mr-3">
                                    <Calendar size={24} />
                                </span>
                                Dados do Evento
                            </h2>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                
                                {/* Nome */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Seu Nome Completo *</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                                            <User size={18} />
                                        </div>
                                        <input 
                                            {...register("contractor_name", { required: "Nome é obrigatório" })}
                                            type="text" 
                                            onBlur={(e) => setValue("contractor_name", e.target.value.trim())}
                                            className="w-full bg-dark/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all capitalize placeholder-gray-600"
                                            placeholder="Ex: Matheus Carreira"
                                        />
                                    </div>
                                    {errors.contractor_name && <span className="text-red-500 text-sm mt-1">{errors.contractor_name.message}</span>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    
                                    {/* Data do Evento - CORRIGIDO */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Data do Evento *</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 z-10">
                                                <Calendar size={18} />
                                            </div>
                                            
                                            <input 
                                                {...register("event_date", { required: "Data é obrigatória" })}
                                                type="date"
                                                min={new Date().toISOString().split('T')[0]}
                                                className="w-full bg-dark/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:brightness-50"
                                                style={{
                                                    colorScheme: 'dark'
                                                }}
                                            />
                                        </div>
                                        {errors.event_date && <span className="text-red-500 text-sm mt-1">{errors.event_date.message}</span>}
                                    </div>

                                    {/* Cachê */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Proposta de Cachê (R$)</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                                                <DollarSign size={18} />
                                            </div>
                                            <input 
                                                {...register("cache_amount")}
                                                type="text"
                                                inputMode="numeric"
                                                onChange={handleCurrencyChange}
                                                className="w-full bg-dark/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-gray-600"
                                                placeholder="R$ 0,00"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Endereço */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Endereço do Local</label>
                                    <div className="relative">
                                        <div className="absolute top-4 left-4 flex items-start pointer-events-none text-gray-500">
                                            <MapPin size={18} />
                                        </div>
                                        <textarea 
                                            {...register("event_address")}
                                            rows={3}
                                            onBlur={(e) => setValue("event_address", e.target.value.trim())}
                                            className="w-full bg-dark/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none capitalize placeholder-gray-600"
                                            placeholder="Rua, Número, Cidade..."
                                        ></textarea>
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={submitting}
                                    className="w-full bg-primary text-dark font-bold text-lg py-4 rounded-xl hover:bg-green-400 transition-all duration-300 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/20"
                                >
                                    {submitting ? 'Processando...' : 'Confirmar Contratação'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}