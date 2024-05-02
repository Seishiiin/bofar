"use client"

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {useEffect, useState} from "react";
import Link from "next/link";

export default function Menus() {
    const [menus, setMenus] = useState([])

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
            <Navbar />

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
                            <p className={"flex justify-left items-start gap-2 line-clamp-1 text-lg font-black"}><i
                                className="bi bi-coin"></i> {menu.price}€</p>
                            <Link href={`/menus/${menu.url}`}
                                  className={"bg-green-950/80 hover:bg-green-950 flex justify-center items-center gap-2 text-white text-sm mt-5 px-3 py-2 rounded-md"}><i
                                className={"bi bi-eye"}></i> Voir plus</Link>
                        </div>
                    </div>
                ))}
            </div>

            <Footer/>
        </main>

    )
}