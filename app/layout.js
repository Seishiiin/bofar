"use client"

import { Noto_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import {SessionProvider} from "next-auth/react";

import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";

const inter = Noto_Serif({ subsets: ["latin"] });

export default function RootLayout({ children }) {
    return (
        <SessionProvider>
            <html lang="en">
                <head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Le Bofar - Restaurant</title>
                </head>
                <body className={inter.className}>
                    {children}
                    <Analytics />
                </body>
            </html>
        </SessionProvider>
    );
}
