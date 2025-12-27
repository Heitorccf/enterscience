import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      {/* Configuração global das notificações */}
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            style: {
              background: '#1DB954', // Green Primary
              color: '#fff',
            },
          },
          error: {
            style: {
              background: '#e11d48', // Red
              color: '#fff',
            },
          }
        }}
      />
    </>
  );
}