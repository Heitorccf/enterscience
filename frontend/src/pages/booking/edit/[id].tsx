import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ArrowLeft, Calendar, MapPin, DollarSign, User, Save } from 'lucide-react';
import api from '@/services/api';
import { Booking } from '@/types';

interface BookingFormData {
    contractor_name: string;
    event_date: string;
    cache_amount: string;
    event_address: string;
}

export default function EditBookingPage() {
    const router = useRouter();
    const { id } = router.query;
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<BookingFormData>();

    useEffect(() => {
        if (!id) return;
        const fetchBooking = async () => {
            try {
                const response = await api.get<Booking>(`/bookings/${id}`);
                const booking = response.data;
                
                setValue('contractor_name', booking.contractor_name);
                // Formata a data para o input type="date"
                setValue('event_date', booking.event_date.split('T')[0]); 
                setValue('event_address', booking.event_address || '');
                
                // Formata valor inicial para PT-BR
                const amount = new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }).format(booking.cache_amount);
                setValue('cache_amount', amount);

            } catch (error) {
                console.error('Erro ao carregar booking', error);
                toast.error('Erro ao carregar dados.');
                router.push('/history');
            } finally {
                setLoading(false);
            }
        };
        fetchBooking();
    }, [id, setValue, router]);

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
        setSubmitting(true);
        try {
            const cleanCache = data.cache_amount 
                ? parseFloat(data.cache_amount.replace(/[^\d,]/g, '').replace(',', '.')) 
                : 0;

            const payload = {
                contractor_name: data.contractor_name,
                event_date: data.event_date,
                cache_amount: cleanCache,
                event_address: data.event_address
            };

            await api.put(`/bookings/${id}`, payload);
            toast.success('Alterações salvas com sucesso!');
            router.push('/history');
            
        } catch (error) {
            console.error('Update error', error);
            toast.error('Erro ao atualizar.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">Carregando...</div>;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans py-10 px-4 md:px-8">
            <Head><title>Editar Contratação | EnterScience</title></Head>
            <div className="max-w-2xl mx-auto">
                <Link href="/history" className="inline-flex items-center text-gray-400 hover:text-primary transition-colors mb-8">
                    <ArrowLeft size={20} className="mr-2" /> Cancelar e Voltar
                </Link>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                        <span className="bg-primary/20 text-primary p-2 rounded-lg mr-3"><Save size={24} /></span>
                        Editar Evento
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Contratante</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500"><User size={18} /></div>
                                <input {...register("contractor_name", { required: "Obrigatório" })} className="w-full bg-dark/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-primary focus:outline-none" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Data</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 z-10"><Calendar size={18} /></div>
                                    <input type="date" {...register("event_date", { required: "Obrigatório" })} className="w-full bg-dark/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-primary focus:outline-none [color-scheme:dark]" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Cachê (R$)</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500"><DollarSign size={18} /></div>
                                    <input {...register("cache_amount")} onChange={handleCurrencyChange} className="w-full bg-dark/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-primary focus:outline-none" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Endereço</label>
                            <div className="relative">
                                <div className="absolute top-4 left-4 flex items-start pointer-events-none text-gray-500"><MapPin size={18} /></div>
                                <textarea {...register("event_address")} rows={3} className="w-full bg-dark/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-primary focus:outline-none resize-none"></textarea>
                            </div>
                        </div>

                        <button type="submit" disabled={submitting} className="w-full bg-primary text-dark font-bold text-lg py-4 rounded-xl hover:bg-green-400 transition-all disabled:opacity-50">
                            {submitting ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}