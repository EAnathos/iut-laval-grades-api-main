import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { Toaster } from '@web/components/ui/sonner';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IUT de Laval',
  description: "Permet de gérer les étudiants et les cours de l'IUT de Laval",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Toaster />
        <NuqsAdapter>
          <>{children}</>
        </NuqsAdapter>
      </body>
    </html>
  );
}
