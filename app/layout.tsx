import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import React from "react";
import NavBar from "@/components/NavBar";
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
        <body className={inter.className}>
        <NavBar/>
        {children}
        </body>
        </AuthProvider>
        </html>
    )
}
