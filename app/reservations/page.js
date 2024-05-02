"use client"

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {useState} from "react";

export default function Reservations() {

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [reservation, setReservation] = useState({
        name: "",
        people: "",
        daytime: "",
        phone: ""
    });

    async function onSubmit(event) {
        event.preventDefault()
        setIsLoading(true)
        setMessage(null)

        try {
            const response = await fetch("/api/v1/reservations", {
                method: "POST",
                body: JSON.stringify(reservation),
            })

            if (!response.ok) {
                throw new Error("Une erreur est survenue")
            }

            const data = await response.json()
            setMessage(data.message)
        } catch (error) {
            setMessage(error.message)
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main>
            <Navbar />

            <div className={"w-full my-20 flex flex-col justify-center items-center"}>
                <h1 className={"text-4xl font-bold"}>Réserver une table</h1>
                <hr className={"w-1/2 my-10 border-gray-300"}/>
                {message && <p className={"w-full md:w-1/2 my-2 py-2 text-center text-white font-bold bg-green-950 rounded"}>{message}</p>}

                <form onSubmit={onSubmit} className={"w-full flex flex-col justify-center items-center"}>
                    <input type="text" className={"w-1/2 p-2 mx-auto my-2 border-2 rounded-xl"} name={"name"} placeholder={"Votre nom"} required value={reservation.name} onChange={event => setReservation({...reservation, name: event.target.value})} />
                    <input type="number" className={"w-1/2 p-2 mx-auto my-2 border-2 rounded-xl"} name={"phone"} placeholder={"Le nombre de personnes"} required value={reservation.people} onChange={event => setReservation({...reservation, people: event.target.value})} />
                    <input type="date" className={"w-1/2 p-2 mx-auto my-2 border-2 rounded-xl"} name={"date"} required value={reservation.daytime} onChange={event => setReservation({...reservation, daytime: event.target.value})} />
                    <input type="text" className={"w-1/2 p-2 mx-auto my-2 border-2 rounded-xl"} name={"phone"} placeholder={"Votre numéro de téléphone"} required value={reservation.phone} onChange={event => setReservation({...reservation, phone: event.target.value})} />
                    <button type={"submit"} className={"w-1/2 p-2 mx-auto my-2 border-2 rounded-xl bg-green-950/80 text-white"} disabled={isLoading}>
                        {isLoading ? "En cours..." : "Réserver"}
                    </button>
                </form>
            </div>

            <Footer />
        </main>
    )
}