"use client";

import NavbarAdmin from "@/components/NavbarAdmin";
import MenuAdmin from "@/components/MenuAdmin";

import {useEffect, useState} from "react";
import {snakeCase} from "snake-case";
import Modal from "react-modal";

export default function AdminMenus() {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenCreate, setIsOpenCreate] = useState(false)

    const [menus, setMenus] = useState([])

    const [id, setId] = useState(null)
    const [wording, setWording] = useState("")
    const [url, setUrl] = useState("")
    const [price, setPrice] = useState("")

    const fetchMenus = async () => {
        const response = await fetch("/api/v1/menus", {
            cache: "no-cache"
        })
        const data = await response.json()
        setMenus(data)
    }
    const editMenu = async (id) => {
        setIsOpen(true)
        setId(id)

        menus.map((menu) => {
            if (menu.idM === id) {
                setWording(menu.wording)
                setUrl(menu.url)
                setPrice(menu.price)
            }
        })
    }
    const createMenu = async () => {
        setIsOpenCreate(true)
    }
    const deleteMenu = async (id) => {
        await fetch(`/api/v1/menus`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id
            })
        })

        fetchMenus()
    }
    const onSubmit = async (e) => {
        e.preventDefault()

        await fetch(`/api/v1/menus/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                wording: wording,
                url: url,
                price: price,
            })
        })

        fetchMenus()
        setIsOpen(false)
    }
    const onSubmitCreate = async (e) => {
        e.preventDefault()

        await fetch(`/api/v1/menus/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                wording: wording,
                url: url,
                price: price,
            })
        })

        fetchMenus()
        setIsOpenCreate(false)
    }
    const closeModal = () => {
        setIsOpen(false)
        setId(null)
    }
    const closeModalCreate = () => {
        setIsOpenCreate(false)

        setWording("")
        setUrl("")
        setPrice("")
    }

    useEffect(() => {
        fetchMenus()
    }, []);

    return (
        <main>
            <NavbarAdmin/>
            <MenuAdmin/>

            <div className={"w-full h-auto flex flex-col justify-start items-center"}>
                <div className={"w-full flex justify-end items-center p-4 sticky top-0 bg-white shadow-sm"}>
                    <button className={"bg-blue-500 hover:bg-blue-700 text-white rounded-md p-2"} onClick={() => createMenu()}><i className={"bi bi-plus-lg mr-2"}/> Créer un menu</button>
                </div>

                <div className={"w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"}>
                    {menus.map((menu, index) => (
                        <div key={index} className={"bg-white flex flex-col justify-between p-4 rounded-lg shadow-md"}>
                            <div>
                                <div className={"w-full h-auto flex justify-between items-center"}>
                                    <h2 className={"text-lg font-semibold"}>{menu.wording}</h2>
                                    <p className={"text-sm font-semibold"}>{menu.price} €</p>
                                </div>
                                <hr className={"my-2 border-gray-300"}/>
                                {menu.dishes.map((dish, index) => (
                                    <div key={index} className={"w-full h-auto flex justify-start items-center"}>
                                        <p className={"text-sm"}>{dish.wording}</p>
                                    </div>
                                ))}
                            </div>
                            <div className={"flex flex-row justify-end items-center"}>
                                <button className={"bg-gray-100 hover:bg-yellow-500 hover:text-white duration-300 rounded-full px-3 py-2"} onClick={() => editMenu(menu.idM)}><i className={"bi bi-pencil"}/></button>
                                <button className={"bg-gray-100 hover:bg-red-500 hover:text-white duration-300 rounded-full px-3 py-2 ml-2"} onClick={() => deleteMenu(menu.idM)}><i className={"bi bi-trash"}/></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} className={"w-full md:w-1/2 mx-auto my-20 p-5 bg-white rounded-md shadow-xl"} overlayClassName={"w-full h-full bg-black/80 fixed top-0 left-0"}>
                <div className={"flex justify-between items-center mb-5"}>
                    <h2 className={"text-lg font-semibold"}>Modifier un menu</h2>
                    <button onClick={() => closeModal()} className={"cursor-pointer bg-red-500 hover:bg-red-700 text-white rounded-full px-3 py-2"}><i className={"bi bi-x-lg"}/></button>
                </div>

                <form onSubmit={onSubmit} className={"w-full flex flex-col gap-4"}>
                    <input type={"hidden"} value={id}/>
                    <input type={"text"} placeholder={"Libellé"} value={wording} onChange={(e) => setWording(e.target.value)} className={"w-full p-2 border border-gray-300 rounded-md"}/>
                    <input type={"hidden"} placeholder={"URL"} value={snakeCase(wording)} className={"w-full p-2 border border-gray-300 rounded-md"}/>
                    <input type={"number"} placeholder={"Prix"} value={price} onChange={(e) => setPrice(e.target.value)} className={"w-full p-2 border border-gray-300 rounded-md"}/>
                    <button type={"submit"} className={"bg-blue-500 hover:bg-blue-700 text-white rounded-md p-2"}>Modifier</button>
                </form>
            </Modal>
            <Modal isOpen={isOpenCreate} onRequestClose={() => setIsOpenCreate(false)} className={"w-full md:w-1/2 mx-auto my-20 p-5 bg-white rounded-md shadow-xl"} overlayClassName={"w-full h-full bg-black/80 fixed top-0 left-0"}>
                <div className={"flex justify-between items-center mb-5"}>
                    <h2 className={"text-lg font-semibold"}>Créer un menu</h2>
                    <button onClick={() => closeModalCreate()} className={"cursor-pointer bg-red-500 hover:bg-red-700 text-white rounded-full px-3 py-2"}><i className={"bi bi-x-lg"}/></button>
                </div>

                <form onSubmit={onSubmitCreate} className={"w-full flex flex-col gap-4"}>
                    <input type={"text"} placeholder={"Libellé"} value={wording} onChange={(e) => setWording(e.target.value)} className={"w-full p-2 border border-gray-300 rounded-md"}/>
                    <input type={"hidden"} placeholder={"URL"} value={snakeCase(wording)} className={"w-full p-2 border border-gray-300 rounded-md"}/>
                    <input type={"number"} placeholder={"Prix"} value={price} onChange={(e) => setPrice(e.target.value)} className={"w-full p-2 border border-gray-300 rounded-md"}/>
                    <button type={"submit"} className={"bg-blue-500 hover:bg-blue-700 text-white rounded-md p-2"}>Créer</button>
                </form>
            </Modal>
        </main>
    )
}