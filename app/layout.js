import { Noto_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"


import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";

const inter = Noto_Serif({ subsets: ["latin"] });

export const metadata = {
    title: "Le Bofar",
    description: "Le Bofar vous accueille tous les jours au sein de son restaurant à Chambéry",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
                <Analytics />
            </body>
        </html>
    );
}
