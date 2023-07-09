import './globals.css';
import clsx from 'clsx';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import { ClerkProvider } from '@clerk/nextjs/app-beta';
import { ptBR } from '@clerk/localizations';
import Hydrate from './components/Hydrate';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next E-Commerce 13',
  description: 'Next E-Commerce utilizando a versão 13',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang='en'>
        <body className={clsx(inter.className, 'bg-slate-700')}>
          <Hydrate>
            <Navbar />
            <main className='h-screen p-16'>{children}</main>
          </Hydrate>
        </body>
      </html>
    </ClerkProvider>
  );
}
