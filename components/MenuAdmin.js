"use client"

import Link from "next/link";
import {usePathname} from "next/navigation";

export default function MenuAdmin() {
    const url = usePathname();

    return (
        <div className={"w-full flex justify-around items-center p-4 bg-green-950 text-white"}>
            <Link href={"/administration"} className={"flex justify-center items-center gap-2"}><i className={url === "/administration" ? "bi bi-house-door-fill" : "bi bi-house-door"}></i> <span className={"hidden md:block"}>Accueil</span></Link>
            <Link href={"/administration/events"} className={"flex justify-center items-center gap-2"}><i className={url === "/administration/events" ? "bi bi-calendar2-week-fill" : "bi bi-calendar2-week"}></i> <span className={"hidden md:block"}>Événements</span></Link>
            <Link href={"/administration/reservations"} className={"flex justify-center items-center gap-2"}><i className={url === "/administration/reservations" ? "bi bi-calendar2-check-fill" : "bi bi-calendar2-check"}></i> <span className={"hidden md:block"}>Réservations</span></Link>
            <Link href={"/administration/menus"} className={"flex justify-center items-center gap-2"}><i className={url === "/administration/menus" ? "bi bi-bookmark-fill" : "bi bi-bookmark"}></i> <span className={"hidden md:block"}>Menus</span></Link>
            <Link href={"/administration/dishes"} className={"flex justify-center items-center gap-2"}><i className={url === "/administration/dishes" ? "bi bi-egg-fill" : "bi bi-egg"}></i> <span className={"hidden md:block"}>Plats</span></Link>
        </div>
    )
}