'use client'

import Link from "next/link";

import {usePathname} from "next/navigation";

export default function Navbar() {
    const url = usePathname();

    return (
        <div className={"w-full flex flex-col"}>
            <div className={"w-full h-10 px-10 flex justify-center xl:justify-between items-center text-white bg-green-950/80"}>
                <p className={"hidden xl:block text-sm text-left w-1/3"}>Ouvert tous les jours de 18h30 à 01h00</p>
                <p className={"text-sm text-center w-full xl:w-1/3"}>35 Place Monge, 73000 Chambéry - <Link href={"tel:+33479611111"}>07 46 46 35 24</Link></p>
                <Link href={"/reservations"} className={"hidden xl:block text-sm text-right w-1/3"}>{"Réserver une table".toUpperCase()}</Link>
            </div>
            <div className="w-full flex justify-between items-center px-10 py-2 shadow-sm">
                <div className="items-center gap-2">
                    <img src="/logo.png" alt="logo" className="w-20" />
                </div>

                <div className="hidden md:flex items-center gap-10">
                    <Link href={"/"} className={url === "/" ? "font-bold" : ""}>Accueil</Link>
                    <Link href={"/menus"} className={url === "/menus" ? "font-bold" : ""}>Menus</Link>
                    <Link href={"/events"} className={url === "/events" ? "font-bold" : ""}>Événements</Link>
                    <Link href={"/gallery"} className={url === "/gallery" ? "font-bold" : ""}>Galerie</Link>
                </div>
                <div className="flex md:hidden items    -center gap-5">
                    <Link href={"/"}>{url === "/" ? <i className={"bi bi-house-fill text-2xl"}></i> : <i className={"bi bi-house text-2xl"}></i>}</Link>
                    <Link href={"/menus"}>{url === "/menus" ? <i className={"bi bi-card-list text-2xl"}></i> : <i className={"bi bi-card-list text-2xl"}></i>}</Link>
                    <Link href={"/events"}>{url === "/events" ? <i className={"bi bi-calendar-event-fill text-2xl"}></i> : <i className={"bi bi-calendar-event text-2xl"}></i>}</Link>
                    <Link href={"/gallery"}>{url === "/gallery" ? <i className={"bi bi-camera-fill text-2xl"}></i> : <i className={"bi bi-camera text-2xl"}></i>}</Link>
                </div>
            </div>
        </div>
    )
}