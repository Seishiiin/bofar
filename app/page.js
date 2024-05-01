'use client'

import Navbar from "@/components/Navbar";
import Link from "next/link";

import {useEffect, useState} from "react";

export default function Home() {
    const [menus, setMenus] = useState([]);
    const fetchMenus = async () => {
        const response = await fetch("/api/v1/menus", {
            cache: "no-cache",
        })
        const data = await response.json()
        setMenus(data)
    }

    useEffect(() => {
        fetchMenus()
    }, []);

    return (
        <main>
            <Navbar/>

            <div className={"w-full h-[calc(100dvh-8.5rem)]"}>
                <img src="/home_page.jpg" alt="Profile Picture" className={"w-full h-full object-cover z-0"}/>

                <div className={"absolute top-0 left-0 w-full h-[calc(100dvh-8.5rem)] mt-[8.5rem] pb-[3.25rem] flex flex-col justify-center items-center text-white bg-black/50 z-10"}>
                    <h1 className={"text-2xl sm:text-5xl md:text-7xl text-center font-bold"}>LE BOFAR - RESTAURANT</h1>
                    <p className={"text-xl sm:text-xs md:text-lg text-center"}>Ouvert 7j/7 de 18h30 à 01h00 - Événements tous les week-ends</p>
                </div>

                <div className={"absolute bottom-20 w-full z-10"}>
                    <Link href={"/reservations"} className={"w-56 flex justify-center items-center gap-2 hover:gap-4 duration-100 mx-auto px-5 py-2 text-md text-white bg-green-950 rounded"}> Réserver une table <i className={"bi bi-arrow-right"}></i></Link>
                </div>
            </div>

            <div className={"w-full grid grid-cols-1 lg:grid-cols-2 gap-4 py-20 px-5 md:px-20"}>
                {menus.map((menu, index) => (
                    <div key={index} className={"p-4 rounded-md bg-white border-2 border-gray-300 shadow-md"}>
                        <h3 className={"text-xl font-bold"}>{menu.wording.toUpperCase()}</h3>
                        <hr className={"my-2 border-gray-300"}/>
                        <ul className={"list-disc"}>
                            {menu.dishes.map((product, index) => (
                                <li key={index} className={"line-clamp-1"}>{product.wording}</li>
                            ))}
                        </ul>
                        <div className={"flex justify-between items-baseline gap-2 mt-2"}>
                            <p className={"flex justify-left items-start gap-2 line-clamp-1 text-lg font-black"}><i className="bi bi-coin"></i> {menu.price}€</p>
                            <Link href={`/menus/${menu.wording.replace("Menu ", "").toLowerCase()}`} className={"bg-green-950/80 hover:bg-green-950 flex justify-center items-center gap-2 text-white text-sm mt-5 px-3 py-2 rounded-md"}><i className={"bi bi-eye"}></i> Voir plus</Link>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
