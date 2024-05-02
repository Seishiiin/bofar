'use client'

import Navbar from "@/components/Navbar";

import {useEffect, useState} from "react";
import Footer from "@/components/Footer";

export default function Menu() {
    const [dishes, setDishes] = useState([]);

    const fetchDishes = async () => {
        const response = await fetch("/api/v1/dishes", {
            cache: "no-cache",
        })
        const data = await response.json()
        setDishes(data)
    }

    useEffect(() => {
        fetchDishes()
    }, []);

    return (
        <main>
            <Navbar />

            <div className={"w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-20 px-5 md:px-20"}>
                {dishes.map((dish, index) => (
                    <div key={index} className={"p-4 rounded-md bg-white border-2 border-gray-300 shadow-md"}>
                        <h3 className={"text-xl font-bold line-clamp-1"}>{dish.wording.toUpperCase()}</h3>
                        <hr className={"my-2 border-gray-300"}/>
                        <img src={dish.picture + ".jpg"} alt={dish.wording} className={"w-full h-52 mb-4 object-cover"}/>
                    </div>
                ))}
            </div>

            <Footer />
        </main>
    );
}