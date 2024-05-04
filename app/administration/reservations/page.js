"use client"

import NavbarAdmin from "@/components/NavbarAdmin";
import MenuAdmin from "@/components/MenuAdmin";
import Modal from "react-modal"

import {useEffect, useState} from "react";

export default function AdministrationReservations() {
    const [reservations, setReservations] = useState([])

    const [idR, setIdR] = useState(null)
    const [name, setName] = useState("")
    const [people, setPeople] = useState(null)
    const [date, setDate] = useState("")
    const [phone, setPhone] = useState("")

    const [isOpen, setIsOpen] = useState(false)

    const fetchReservations = async () => {
        const response = await fetch("/api/v1/reservations", {
            cache: "no-cache",
        })
        const data = await response.json()
        setReservations(data)
    }

    const editReservation = async (id) => {
        setIsOpen(true)

        setIdR(id)
        reservations.map((reservation) => {
            if (reservation.idR === id) {
                setName(reservation.name)
                setPeople(reservation.people)
                setDate(new Date(reservation.daytime).toISOString().split("T")[0])
                setPhone(reservation.phone)
            }
        })
    }

    const closeModal = () => {
        setIsOpen(false)

        setName("")
        setPeople(null)
        setDate("")
        setPhone("")
    }

    const deleteReservation = async (id) => {
        const response = await fetch(`/api/v1/reservations/${id}`, {
            method: "DELETE",
            cache: "no-cache",
        })
        const data = await response.json()
        setReservations(data)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`/api/v1/reservations/${idR}`, {
            method: "PUT",
            cache: "no-cache",
        })

        setIsOpen(false)

        setName("")
        setPeople(null)
        setDate("")
        setPhone("")
    }

    useEffect(() => {
        fetchReservations()
    }, []);

    return (
        <main>
            <NavbarAdmin />
            <MenuAdmin />

            <div className="w-full p-4">
                <h1 className={"text-4xl font-black mb-5"}>Ensemble des réservations</h1>
                <div className="block md:flex gap-4 mb-3">
                    <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Rechercher par nom..." onChange={(e) => setName(e.target.value)}/>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Rechercher par numéro de téléphone..." onChange={(e) => setPhone(e.target.value)}/>
                </div>
                <hr className={"my-2 border-gray-300"}/>
                <table className="w-full table-auto text-lg mb-3">
                    <thead className={"border-b border-gray-300"}>
                    <tr className={"border-b border-gray-300"}>
                        <th className="text-left">Nom</th>
                        <th className="text-center">Personnes</th>
                        <th className="text-center">Téléphone</th>
                        <th className={"text-right hidden md:block"}>Date</th>
                        <th className={"text-right"}></th>
                        <th className={"text-right"}></th>
                    </tr>
                    </thead>
                    <tbody className={"divide-y divide-gray-300"}>
                    {reservations.filter(reservation => new Date(reservation.daytime) >= new Date()).filter(reservation => reservation.name.toLowerCase().includes(name.toLowerCase())).filter(reservation => reservation.phone.includes(phone)).length === 0 && (
                        <tr key={0} className={"hover:bg-gray-100"}>
                            <td colSpan={6} className="text-center">Aucune réservation trouvée</td>
                        </tr>
                    )}
                    {reservations.filter(reservation => new Date(reservation.daytime) >= new Date()).filter(reservation => reservation.name.toLowerCase().includes(name.toLowerCase())).filter(reservation => reservation.phone.includes(phone)).map((reservation => (
                        <tr key={reservation.idR} className={"hover:bg-gray-100"}>
                            <td className="text-left">{reservation.name}</td>
                            <td className="text-center">{reservation.people}</td>
                            <td className="text-center">{reservation.phone}</td>
                            <td className="text-right hidden md:block">{new Date(reservation.daytime).toLocaleDateString()}</td>
                            <td className="text-right" onClick={() => editReservation(reservation.idR)}><i className="bi bi-pencil text-blue-500 cursor-pointer"></i></td>
                            <td className="text-right" onClick={() => deleteReservation(reservation.idR)}><i className="bi bi-trash text-red-500 cursor-pointer"></i></td>
                        </tr>
                    )))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} className={"w-full md:w-1/2 mx-auto my-20 p-5 bg-white rounded-md border-2 border-black"}>
                <div className={"flex justify-between items-center mb-3"}>
                    <h1 className={"text-2xl font-black"}>Modifier une réservation</h1>
                    <button onClick={() => closeModal()}><i className="bi bi-x-lg text-2xl cursor-pointer"></i></button>
                </div>
                <form className="w-full md:w-1/2 mx-auto my-20 grid grid-cols-1 gap-4" onSubmit={onSubmit}>
                    <input type="text" name={"name"} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)}/>
                    <input type="number" name={"people"} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Nombre de personnes" value={Number.parseInt(people)} onChange={(e) => setPeople(e.target.value)}/>
                    <input type="date" name={"daytime"} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)}/>
                    <input type="text" name={"phone"} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Téléphone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                    <input type="text" name={"idR"} value={idR}/>
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">Modifier</button>
                </form>
            </Modal>
        </main>
    )
}