import '@/styles/globals.css'; // <--- O IMPORTANTE ESTÁ AQUI
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}