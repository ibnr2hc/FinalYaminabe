import Navigation from '@/app/components/navigation/navigation';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FINAL YAMINABE',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center pt-8 md:p-24 bg-slate-200 justify-center">
          {/* Title */}
          <div className="flex pb-10">
            <span className="text-3xl font-bold text-slate-700">FINAL YAMINABE<span className="text-sm"> [beta]</span></span>
          </div>

          {/* Navigation */}
          <div className="md:my-10 md:py-8">
            <Navigation />
          </div>

          {/* Contents */}
          <div className="px-8 w-full flex justify-center mb-12 lg:mb-0">
            <div className="flex items-center justify-center shadow-md container w-full rounded bg-slate-50 py-8 px-6 md:py-14">
              {children}
            </div>
          </div>

          {/* Notify */}
          <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
          />
        </main>
        <Analytics />
      </body>
    </html>
  )
}
