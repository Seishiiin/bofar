'use client'

import {useEffect, useState} from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Menu({params}) {
    const [menu, setMenu] = useState()

    const fetchMenu = async () => {
        const response = await fetch(`/api/v1/menus/${params.menu_name}`)
        const data = await response.json()
        setMenu(data)
    }

    useEffect(() => {
        fetchMenu()
    }, []);

    if (menu) return (
        <main>
            <Navbar/>

            <div className={"w-full px-10 border-b"}>
                <a href={"/"} className={"hover:underline"}>Accueil</a> / <a href={"/menus"}
                                                                             className={"hover:underline"}>Menus</a> / {menu.wording}
            </div>

            <div className={"w-full flex justify-between items-baseline py-10 px-5 md:px-20"}>
                <h1 className={"text-4xl font-bold"}>{menu.wording}</h1>
                <p className={"flex justify-center items-center gap-1 text-xl font-bold"}><i className={"bi bi-coin"}></i> {menu.price}€</p>
            </div>

            <div className={"w-full grid grid-cols-1 md:grid-cols-3 gap-4 py-10 px-5 md:px-20"}>
                {menu.dishes.map((dish, index) => (
                    <div key={index} className={"p-4 rounded-md bg-white border-2 border-gray-300 shadow-md"}>
                        <h3 className={"text-xl font-bold line-clamp-1"}>{dish.wording}</h3>
                        <hr className={"my-2 border-gray-300"}/>
                        <img src={dish.picture + ".jpg"} alt={dish.wording} className={"w-full h-48 object-cover"}/>
                    </div>
                ))}
            </div>

            <Footer />
        </main>
)
}