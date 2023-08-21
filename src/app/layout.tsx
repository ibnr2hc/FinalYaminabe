import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import './globals.css'

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
        <main className="flex min-h-screen flex-col items-center p-24 bg-slate-200 justify-center">
          {/* Title */}
          <div className="flex pb-10">
            <span className="text-3xl font-bold text-slate-700">FINAL YAMINABE</span>
          </div>

          {/* Contents */}
          <div className="flex items-center justify-center shadow-md container w-full rounded bg-slate-50 py-14">
            {children}
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
      </body>
    </html>
  )
}
