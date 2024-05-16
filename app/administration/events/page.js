"use client";

import NavbarAdmin from "@/components/NavbarAdmin";
import MenuAdmin from "@/components/MenuAdmin";

import {useEffect, useState} from "react";
import Modal from "react-modal";

export default function AdminEvents() {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenCreate, setIsOpenCreate] = useState(false)

    const [events, setEvents] = useState([])

    const [id, setId] = useState(null)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [daytime, setDaytime] = useState("")

    const fetchEvents = async () => {
        const response = await fetch("/api/v1/events", {
            cache: "no-cache"
        })
        const data = await response.json()
        setEvents(data)
    }
    const editEvent = async (id) => {
        setIsOpen(true)
        setId(id)

        events.map((event) => {
            if (event.idE === id) {
                setName(event.name)
                setDescription(event.description)
                setDaytime(new Date(event.daytime).toISOString().split("T")[0])
            }
        })
    }
    const createEvent = async () => {
        setIsOpenCreate(true)
    }
    const deleteEvent = async (id) => {
        await fetch(`/api/v1/events`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id
            })
        })

        fetchEvents()
    }
    const onSubmit = async (e) => {
        e.preventDefault()

        await fetch(`/api/v1/events/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                name: name,
                description: description,
                daytime: daytime
            })
        })

        fetchEvents();
        closeModal()
    }
    const onSubmitCreate = async (e) => {
        e.preventDefault()

        await fetch(`/api/v1/events/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                description: description,
                daytime: daytime
            })
        })

        fetchEvents();
        closeModalCreate()
    }
    const closeModal = () => {
        setIsOpen(false)

        setId(null)
        setName("")
        setDescription("")
        setDaytime("")
    }
    const closeModalCreate = () => {
        setIsOpenCreate(false)

        setName("")
        setDescription("")
        setDaytime("")
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    return (
        <main>
            <NavbarAdmin />
            <MenuAdmin />

            <div className={"w-full h-auto flex flex-col justify-start items-center"}>
                <div className={"w-full flex justify-end items-center p-4 sticky top-0 bg-white shadow-sm"}>
                    <button className={"bg-blue-500 hover:bg-blue-700 text-white rounded-md p-2"} onClick={() => createEvent()}><i className={"bi bi-plus-lg mr-2"}/> Créer un événement</button>
                </div>

                {events.length === 0 ? (
                    <div className={"w-full h-auto flex flex-col justify-center items-center"}>
                        <h2 className={"text-lg font-semibold"}>Chargement...</h2>
                    </div>
                ) : (
                    <div className={"w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"}>
                        {events.map((event, index) => (
                            <div key={index} className={"bg-white flex flex-col justify-between p-4 rounded-lg shadow-md"}>
                                <div>
                                    <div className={"w-full h-auto flex justify-between items-center"}>
                                        <h2 className={"text-lg font-semibold"}>{event.name}</h2>
                                    </div>
                                    <hr className={"my-2 border-gray-300"}/>
                                    <p className={"text-sm mb-5"}>{event.description}</p>
                                </div>
                                <div className={"flex flex-row justify-between items-center"}>
                                    <div className={"flex justify-start items-center gap-2"}>
                                        {new Date(event.daytime).toDateString() === new Date().toDateString() ? (
                                            <p className={"text-sm text-green-500 bg-green-100 rounded-full px-3"}>aujourd'hui</p>
                                        ) : new Date(event.daytime) < new Date() ? (
                                            <p className={"text-sm text-red-500 bg-red-100 rounded-full px-3"}>passé</p>
                                        ) : (
                                            <p className={"text-sm text-blue-500 bg-blue-100 rounded-full px-3"}>à venir</p>
                                        )}
                                        <p className={"text-sm"}>{new Date(event.daytime).toLocaleDateString()}</p>
                                    </div>
                                    <div className={"flex flex-row justify-end items-center"}>
                                        <button className={"bg-gray-100 hover:bg-yellow-500 hover:text-white duration-300 rounded-full px-3 py-2"} onClick={() => editEvent(event.idE)}><i className={"bi bi-pencil"}/></button>
                                        <button className={"bg-gray-100 hover:bg-red-500 hover:text-white duration-300 rounded-full px-3 py-2 ml-2"} onClick={() => deleteEvent(event.idE)}><i className={"bi bi-trash"}/></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} className={"w-full md:w-1/2 mx-auto my-20 p-5 bg-white rounded-md shadow-xl"} overlayClassName={"w-full h-full bg-black/80 fixed top-0 left-0"}>
                <div className={"flex justify-between items-center mb-5"}>
                    <h2 className={"text-lg font-semibold"}>Modifier un événement</h2>
                    <button onClick={() => closeModal()} className={"cursor-pointer bg-red-500 hover:bg-red-700 text-white rounded-full px-3 py-2"}><i className={"bi bi-x-lg"}/></button>
                </div>
                <form className={"w-full grid grid-cols-1 gap-4"} onSubmit={onSubmit}>
                    <input type={"hidden"} value={id}/>
                    <input type={"text"} className={"w-full p-2 border border-gray-300 rounded-md"} placeholder={"Nom de l'événement"} value={name} onChange={(e) => setName(e.target.value)}/>
                    <textarea className={"w-full h-48 p-2 border border-gray-300 rounded-md resize-none"} placeholder={"Description de l'événement"} value={description} onChange={(e) => setDescription(e.target.value)}/>
                    <input type={"date"} className={"w-full p-2 border border-gray-300 rounded-md"} value={daytime} onChange={(e) => setDaytime(e.target.value)}/>
                    <button type={"submit"} className={"bg-blue-500 hover:bg-blue-700 text-white rounded-md p-2"}>Modifier</button>
                </form>
            </Modal>
            <Modal isOpen={isOpenCreate} onRequestClose={() => setIsOpenCreate(false)} className={"w-full md:w-1/2 mx-auto my-20 p-5 bg-white rounded-md shadow-xl"} overlayClassName={"w-full h-full bg-black/80 fixed top-0 left-0"}>
                <div className={"flex justify-between items-center mb-5"}>
                    <h2 className={"text-lg font-semibold"}>Créer un événement</h2>
                    <button onClick={() => closeModalCreate()} className={"cursor-pointer bg-red-500 hover:bg-red-700 text-white rounded-full px-3 py-2"}><i className={"bi bi-x-lg"}/></button>
                </div>
                <form className={"w-full grid grid-cols-1 gap-4"} onSubmit={onSubmitCreate}>
                    <input type={"text"} className={"w-full p-2 border border-gray-300 rounded-md"} placeholder={"Nom de l'événement"} value={name} onChange={(e) => setName(e.target.value)}/>
                    <textarea className={"w-full h-48 p-2 border border-gray-300 rounded-md resize-none"} placeholder={"Description de l'événement"} value={description} onChange={(e) => setDescription(e.target.value)}/>
                    <input type={"date"} className={"w-full p-2 border border-gray-300 rounded-md"} value={daytime} onChange={(e) => setDaytime(e.target.value)}/>
                    <button type={"submit"} className={"bg-blue-500 hover:bg-blue-700 text-white rounded-md p-2"}>Créer</button>
                </form>
            </Modal>
        </main>
    )
}