"use client"

import {useEffect, useState} from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Event({params}) {
    const [event, setEvent] = useState()

    const fetchEvent = async () => {
        const response = await fetch(`/api/v1/events/${params.event_name}`)
        const data = await response.json()
        setEvent(data)
    }

    useEffect(() => {
        fetchEvent()
    }, []);

    if (event) return (
        <main>
            <Navbar/>

            <div className={"w-full px-10 border-b"}>
                <a href={"/"} className={"hover:underline"}>Accueil</a> / <a href={"/events"} className={"hover:underline"}>Évènements</a> / {event.name}
            </div>

            <div className={"w-full grid grid-cols-1 md:grid-cols-2 gap-4 py-10 px-5 md:px-20"}>
                <div className={"flex flex-col justify-center gap-4"}>
                    <h1 className={"text-4xl font-bold"}>{event.name}</h1>
                    <p className={"text-xl"}>{event.description}</p>
                </div>
                <img src={"/events/" + event.url + ".jpg"} alt={event.name} className={"w-full h-96 object-cover"}/>
            </div>

            <Footer/>
        </main>
    ); else return (
        <main>
            <Navbar/>

            <div className={"w-full px-10 border-b"}>
                <a href={"/"} className={"hover:underline"}>Accueil</a> / <a href={"/events"} className={"hover:underline"}>Évènements</a> / {params.event_name}
            </div>

            <div className={"w-full flex justify-center items-center h-96"}>
                <h1 className={"text-4xl font-bold"}>Évènement introuvable</h1>
            </div>

            <Footer/>
        </main>
    )
}