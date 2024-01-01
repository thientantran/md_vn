import SessionProvider from "@/components/SessionProvider";
import TanstackProvider from "@/components/TanstackProvider";
import { getServerSession } from 'next-auth';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MDVN',
  description: 'Tan Tran',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <TanstackProvider>
            {children}
          </TanstackProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
