'use client'

import Link from "next/link";

import {usePathname} from "next/navigation";

export default function Navbar() {
    const url = usePathname();

    return (
        <div className="w-full flex justify-between items-center px-10 py-2 shadow-sm">
            <div className="items-center gap-2">
                <img src="/logo.png" alt="logo" className="w-20" />
            </div>

            <div className="hidden md:flex items-center gap-10">
                <Link href={"/"}>Accueil</Link>
                <Link href={"/menu"}>Menu</Link>
                <Link href={"/contact"}>Contact</Link>
            </div>
            <div className="flex md:hidden items-center gap-5">
                <Link href={"/"}>{url === "/" ? <i className={"bi bi-house-fill text-2xl"}></i> : <i className={"bi bi-house text-2xl"}></i>}</Link>
                <Link href={"/menu"}>{url === "/menu" ? <i className={"bi bi-bookmark-fill text-2xl"}></i> : <i className={"bi bi-bookmark text-2xl"}></i>}</Link>
                <Link href={"/contact"}>{url === "/contact" ? <i className={"bi bi-telephone-fill text-2xl"}></i> : <i className={"bi bi-telephone text-2xl"}></i>}</Link>
            </div>
        </div>
    )
}