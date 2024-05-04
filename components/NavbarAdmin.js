'use client'

import Link from "next/link";
import {usePathname} from "next/navigation";

export default function NavbarAdmin() {
    let url;
    switch(usePathname().split("/").pop()) {
        case "administration": url = "Tableau de bord"; break;
        case "events": url = "Événements"; break;
        case "reservations": url = "Réservations"; break;
        case "menus": url = "Menus"; break;
        case "dishes": url = "Plats"; break;
    }

    return (
        <div className={"w-full flex justify-between items-center p-4"}>
            <div className={"flex items-center"}>
                <img src={"/logo.png"} className={"h-12"}  alt={"Logo"} />
                <h1 className={"flex justify-center items-center gap-1 text-2xl font-bold ml-4"}>Administration <span className={"hidden md:block"}>- {url}</span></h1>
            </div>

            <div className={"flex items-center"}>
                <Link href={"/auth/signout"} className={"flex justify-center items-center gap-2 text-white bg-green-950 px-4 py-2 rounded-md"}><i className={"bi bi-box-arrow-right"}></i> <span className={"hidden md:block"}>Déconnexion</span></Link>
            </div>
        </div>
    )
}