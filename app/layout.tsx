import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Time Tracking',
    description: 'Track the time you worked',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <AuthProvider>
            <body className={inter.className}>{children}</body>
        </AuthProvider>
        </html>
    )
}
