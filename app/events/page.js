"use client"

import {useEffect, useState} from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {snakeCase} from "snake-case";

export default function Events() {
    const [events, setEvents] = useState([])

    const fetchEvents = async () => {
        const response = await fetch("/api/v1/events", {
            cache: "no-cache",
        })
        const data = await response.json()
        setEvents(data)
    }

    useEffect(() => {
        fetchEvents()
    }, []);

    return (
        <main>
            <Navbar/>

            <div className={"w-full grid grid-cols-1 lg:grid-cols-2 gap-4 py-20 px-5 md:px-20"}>
                {events.map((event, index) => (
                    <div key={index} className={"p-4 rounded-md bg-white border-2 border-gray-300 shadow-md"}>
                        <h3 className={"text-xl font-bold"}>{event.name.toUpperCase()}</h3>
                        <hr className={"my-2 border-gray-300"}/>
                        <p className={"line-clamp-3"}>{event.description}</p>
                        <div className={"flex justify-between items-baseline gap-2 mt-2"}>
                            <p className={"flex justify-left items-start gap-2 line-clamp-1 text-lg font-black"}><i className="bi bi-calendar"></i> {(new Date(event.daytime).toLocaleDateString())}</p>
                            <Link href={`/events/${snakeCase(event.name)}`} className={"bg-green-950/80 hover:bg-green-950 flex justify-center items-center gap-2 text-white text-sm mt-5 px-3 py-2 rounded-md"}><i className={"bi bi-eye"}></i> Voir plus</Link>
                        </div>
                    </div>
                ))}
            </div>

            <Footer/>
        </main>
    )
}