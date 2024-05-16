"use client";

import {useEffect, useState} from "react";

import NavbarAdmin from "@/components/NavbarAdmin";
import MenuAdmin from "@/components/MenuAdmin";
import Link from "next/link";

export default function Administration() {
    const [reservations, setReservations] = useState([])
    const [events, setEvents] = useState([])

    const fetchReservations = async () => {
        const response = await fetch("/api/v1/reservations", {
            cache: "no-cache",
        })
        const data = await response.json()
        setReservations(data)
    }
    const fetchEvents = async () => {
        const response = await fetch("/api/v1/events", {
            cache: "no-cache",
        })
        const data = await response.json()
        setEvents(data)
    }

    useEffect(() => {
        fetchReservations()
        fetchEvents()
    }, []);

    return (
        <main>
            <NavbarAdmin />
            <MenuAdmin />

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                <div className="bg-white flex flex-col justify-between p-4 rounded-lg shadow-md">
                    <div>
                        <h2 className={"text-lg font-semibold"}>Reservations du jour</h2>
                        <hr className={"my-2 border-gray-300"}/>
                        <table className="w-full table-auto text-sm mb-3 overflow-scroll">
                            <thead className={"border-b border-gray-300"}>
                            <tr className={"border-b border-gray-300"}>
                                <th className="text-left">Nom</th>
                                <th className="text-center">Personnes</th>
                                <th className="text-right">Téléphone</th>
                            </tr>
                            </thead>
                            <tbody className={"divide-y divide-gray-300"}>
                            {reservations.filter(reservation => new Date(reservation.daytime).toDateString() === new Date().toDateString()).length === 0 ? (
                                <tr>
                                    <td></td>
                                    <td className={"text-center"}>Aucune réservation</td>
                                    <td></td>
                                </tr>
                            ) : reservations.filter(reservation => new Date(reservation.daytime).toDateString() === new Date().toDateString()).map((reservation, index) => (
                                 <tr key={index}>
                                     <td className={"text-left"}>{reservation.name.toUpperCase()}</td>
                                     <td className={"text-center"}>{reservation.people}</td>
                                     <td className={"text-right"}>{reservation.phone.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5")}</td>
                                 </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className={"w-full flex justify-between items-center"}>
                        <div>
                            <p className={"text-sm text-gray-500"}>Nombre de réservations: {reservations.filter(reservation => new Date(reservation.daytime).toDateString() === new Date().toDateString()).length}</p>
                            <p className={"text-sm text-gray-500"}>Total de personnes: {reservations.filter(reservation => new Date(reservation.daytime).toDateString() === new Date().toDateString()).reduce((acc, reservation) => acc + reservation.people, 0)}</p>
                        </div>
                        <Link href={"/administration/reservations"} className={"bg-green-950 text-white px-4 py-2 rounded-lg"}>Voir plus</Link>
                    </div>
                </div>

                <div className="bg-white flex flex-col justify-between p-4 rounded-lg shadow-md">
                    <div>
                        <h2 className={"text-lg font-semibold"}>Reservations de demain</h2>
                        <hr className={"my-2 border-gray-300"}/>
                        <table className="w-full table-auto text-sm mb-3 overflow-scroll">
                            <thead className={"border-b border-gray-300"}>
                            <tr className={"border-b border-gray-300"}>
                                <th className="text-left">Nom</th>
                                <th className="text-center">Personnes</th>
                                <th className="text-right">Téléphone</th>
                            </tr>
                            </thead>
                            <tbody className={"divide-y divide-gray-300"}>
                            {reservations.filter(reservation => new Date(reservation.daytime).toDateString() === new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()).length === 0 ? (
                                <tr>
                                    <td></td>
                                    <td className={"text-center"}>Aucune réservation</td>
                                    <td></td>
                                </tr>
                            ) : reservations.filter(reservation => new Date(reservation.daytime).toDateString() === new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()).map((reservation, index) => (
                                <tr key={index}>
                                    <td className={"text-left"}>{reservation.name.toUpperCase()}</td>
                                    <td className={"text-center"}>{reservation.people}</td>
                                    <td className={"text-right"}>{reservation.phone.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5")}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className={"w-full flex justify-between items-center"}>
                        <div>
                            <p className={"text-sm text-gray-500"}>Nombre de réservations: {reservations.filter(reservation => new Date(reservation.daytime).toDateString() === new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()).length}</p>
                            <p className={"text-sm text-gray-500"}>Total de personnes: {reservations.filter(reservation => new Date(reservation.daytime).toDateString() === new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()).reduce((acc, reservation) => acc + reservation.people, 0)}</p>
                        </div>
                        <Link href={"/administration/reservations"} className={"bg-green-950 text-white px-4 py-2 rounded-lg"}>Voir plus</Link>
                    </div>
                </div>

                <div className="bg-white flex flex-col justify-between p-4 rounded-lg shadow-md">
                    <div>
                        <h2 className={"text-lg font-semibold"}>Évènement du jour</h2>
                        <hr className={"my-2 border-gray-300"}/>
                        <table className="w-full table-auto text-sm mb-3 overflow-scroll">
                            <thead className={"border-b border-gray-300"}>
                            <tr className={"border-b border-gray-300"}>
                                <th className="text-left">Nom</th>
                            </tr>
                            </thead>
                            <tbody className={"divide-y divide-gray-300"}>
                            {events.filter(event => new Date(event.daytime).toDateString() === new Date().toDateString()).length === 0 ? (
                                <tr>
                                    <td className={"text-center"}>Aucun évènement</td>
                                </tr>
                            ) : events.filter(event => new Date(event.daytime).toDateString() === new Date().toDateString()).map((event, index) => (
                                    <tr key={index}>
                                        <td className={"text-left"}>{event.name}</td>
                                    </tr>
                                )
                            )}
                            </tbody>
                        </table>
                    </div>
                    <div className={"w-full flex justify-between items-center"}>
                        <div>
                            <p className={"text-sm text-gray-500"}>Nombre d&apos;évènements: {events.filter(event => new Date(event.daytime).toDateString() === new Date().toDateString()).length}</p>
                        </div>
                        <Link href={"/administration/events"} className={"bg-green-950 text-white px-4 py-2 rounded-lg"}>Voir plus</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}