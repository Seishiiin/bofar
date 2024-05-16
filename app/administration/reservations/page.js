"use client";

import NavbarAdmin from "@/components/NavbarAdmin";
import MenuAdmin from "@/components/MenuAdmin";

import {useEffect, useState} from "react";
import Modal from "react-modal";

export default function AdminReservations() {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenCreate, setIsOpenCreate] = useState(false)

    const [reservations, setReservations] = useState([])

    const [id, setId] = useState(null)
    const [name, setName] = useState("")
    const [people, setPeople] = useState(null)
    const [daytime, setDaytime] = useState("")
    const [phone, setPhone] = useState("")

    const fetchReservations = async () => {
        const response = await fetch("/api/v1/reservations", {
            cache: "no-cache"
        })
        const data = await response.json()
        setReservations(data)
    }
    const editReservation = async (id) => {
        setIsOpen(true)
        setId(id)

        reservations.map((reservation) => {
            if (reservation.idR === id) {
                setName(reservation.name)
                setPeople(reservation.people)
                setDaytime(new Date(reservation.daytime).toISOString().split("T")[0])
                setPhone(reservation.phone)
            }
        })
    }
    const createReservation = async () => {
        setIsOpenCreate(true)
    }
    const deleteReservation = async (id) => {
        await fetch(`/api/v1/reservations`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id
            })
        })

        fetchReservations()
    }
    const onSubmit = async (e) => {
        e.preventDefault()


        await fetch(`/api/v1/reservations/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                name: name,
                people: people,
                daytime: daytime,
                phone: phone
            })
        })

        fetchReservations()
        closeModal()
    }
    const onSubmitCreate = async (e) => {
        e.preventDefault()

        await fetch(`/api/v1/reservations/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                people: people,
                daytime: daytime,
                phone: phone
            })
        })

        fetchReservations()
        closeModalCreate()
    }
    const closeModal = () => {
        setIsOpen(false)

        setId(null)
        setName("")
        setPeople(null)
        setDaytime("")
        setPhone("")
    }
    const closeModalCreate = () => {
        setIsOpenCreate(false)

        setName("")
        setPeople(null)
        setDaytime("")
        setPhone("")
    }

    useEffect(() => {
        fetchReservations()
    }, [])

    return (
        <main>
            <NavbarAdmin/>
            <MenuAdmin/>

            <div className={"w-full h-auto flex flex-col justify-start items-center"}>
                <div className={"w-full flex justify-between items-center p-4 sticky top-0 bg-white shadow-sm"}>
                    <input type={"text"} placeholder={"Rechercher par nom..."} className={"w-1/3 p-2 border rounded-md"} value={name} onChange={(e) => setName(e.target.value)}/>
                    <button className={"bg-blue-500 hover:bg-blue-700 text-white rounded-md p-2"} onClick={() => createReservation()}><i className={"bi bi-plus-lg mr-2"}/> Créer une réservation</button>
                </div>

                <table className={"w-full"}>
                    <thead>
                        <tr>
                            <th className={"border p-2"}>Nom</th>
                            <th className={"border p-2"}>Personnes</th>
                            <th className={"border p-2"}>Date</th>
                            <th className={"border p-2"}>Téléphone</th>
                            <th className={"border p-2"}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.filter((reservations) => reservations.daytime >= new Date().toISOString()).filter((reservations) => reservations.name.toLowerCase().includes(name.toLowerCase())).map((reservation) => (
                            <tr key={reservation.idR}>
                                <td className={"border p-2 text-center"}>{reservation.name.toUpperCase()}</td>
                                <td className={"border p-2 text-center"}>{reservation.people}</td>
                                <td className={"border p-2 text-center"}>{new Date(reservation.daytime).toLocaleDateString()}</td>
                                <td className={"border p-2 text-center"}>{reservation.phone}</td>
                                <td className={"border p-2 flex justify-center items-center gap-2"}>
                                    <button className={"bg-gray-100 hover:bg-yellow-500 hover:text-white duration-300 rounded-full px-3 py-2"} onClick={() => editReservation(reservation.idR)}><i className={"bi bi-pencil"}/></button>
                                    <button className={"bg-gray-100 hover:bg-red-500 hover:text-white duration-300 rounded-full px-3 py-2 ml-2"} onClick={() => deleteReservation(reservations.idR)}><i className={"bi bi-trash"}/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} className={"w-full md:w-1/2 mx-auto my-20 p-5 bg-white rounded-md shadow-xl"} overlayClassName={"w-full h-full bg-black/80 fixed top-0 left-0"}>
                <div className={"flex justify-between items-center mb-5"}>
                    <h2 className={"text-lg font-semibold"}>Modifier une réservation</h2>
                    <button onClick={() => closeModal()} className={"cursor-pointer bg-red-500 hover:bg-red-700 text-white rounded-full px-3 py-2"}><i className={"bi bi-x-lg"}/></button>
                </div>

                <form onSubmit={(e) => onSubmit(e)} className={"w-full flex flex-col gap-2"}>
                    <input type={"text"} value={id}/>
                    <input type={"text"} placeholder={"Nom"} value={name} onChange={(e) => setName(e.target.value)} className={"w-full p-2 border rounded-md"} required/>
                    <input type={"number"} placeholder={"Personnes"} value={people} onChange={(e) => setPeople(e.target.value)} className={"w-full p-2 border rounded-md"} required/>
                    <input type={"date"} placeholder={"Date"} value={daytime} onChange={(e) => setDaytime(e.target.value)} className={"w-full p-2 border rounded-md"} required/>
                    <input type={"tel"} placeholder={"Téléphone"} value={phone} onChange={(e) => setPhone(e.target.value)} className={"w-full p-2 border rounded-md"} required/>
                    <button type={"submit"} className={"bg-blue-500 hover:bg-blue-700 text-white rounded-md p-2"}>Modifier</button>
                </form>
            </Modal>
            <Modal isOpen={isOpenCreate} onRequestClose={() => setIsOpenCreate(false)} className={"w-full md:w-1/2 mx-auto my-20 p-5 bg-white rounded-md shadow-xl"} overlayClassName={"w-full h-full bg-black/80 fixed top-0 left-0"}>
                <div className={"flex justify-between items-center mb-5"}>
                    <h2 className={"text-lg font-semibold"}>Créer une réservation</h2>
                    <button onClick={() => closeModalCreate()} className={"cursor-pointer bg-red-500 hover:bg-red-700 text-white rounded-full px-3 py-2"}><i className={"bi bi-x-lg"}/></button>
                </div>

                <form onSubmit={(e) => onSubmitCreate(e)} className={"w-full flex flex-col gap-2"}>
                    <input type={"text"} placeholder={"Nom"} value={name} onChange={(e) => setName(e.target.value)} className={"w-full p-2 border rounded-md"} required/>
                    <input type={"number"} placeholder={"Personnes"} value={people} onChange={(e) => setPeople(e.target.value)} className={"w-full p-2 border rounded-md"} required/>
                    <input type={"date"} placeholder={"Date"} value={daytime} onChange={(e) => setDaytime(e.target.value)} className={"w-full p-2 border rounded-md"} required/>
                    <input type={"tel"} placeholder={"Téléphone"} value={phone} onChange={(e) => setPhone(e.target.value)} className={"w-full p-2 border rounded-md"} required/>
                    <button type={"submit"} className={"bg-blue-500 hover:bg-blue-700 text-white rounded-md p-2"}>Créer</button>
                </form>
            </Modal>
        </main>
)
}