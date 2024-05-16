"use client";

import NavbarAdmin from "@/components/NavbarAdmin";
import MenuAdmin from "@/components/MenuAdmin";

import {useEffect, useState} from "react";
import Modal from "react-modal";

export default function AdminDishes() {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenCreate, setIsOpenCreate] = useState(false)

    const [dishes, setDishes] = useState([])
    const [menus, setMenus] = useState([])
    const [types, setTypes] = useState([])

    const [id, setId] = useState(null)
    const [wording, setWording] = useState("")
    const [idMenu, setIdMenu] = useState("")
    const [idType, setIdType] = useState("")

    const fetchDishes = async () => {
        const response = await fetch("/api/v1/dishes", {
            cache: "no-cache"
        })
        const data = await response.json()
        setDishes(data)
    }
    const fetchMenus = async () => {
        const response = await fetch("/api/v1/menus", {
            cache: "no-cache"
        })
        const data = await response.json()
        setMenus(data)
    }
    const fetchTypes = async () => {
        const response = await fetch("/api/v1/types", {
            cache: "no-cache"
        })
        const data = await response.json()
        setTypes(data)
    }
    const editDish = async (id) => {
        setIsOpen(true)
        setId(id)

        dishes.map((dish) => {
            if (dish.idD === id) {
                setWording(dish.wording)
                setIdMenu(dish.idM)
                setIdType(dish.idT)
            }
        })
    }
    const createDish = async () => {
        setIsOpenCreate(true)
    }
    const deleteDish = async (id) => {
        await fetch(`/api/v1/dishes`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id
            })
        })

        fetchDishes()
    }
    const onSubmit = async (e) => {
        e.preventDefault()

        await fetch(`/api/v1/dishes/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                wording: wording,
                idM: idMenu,
                idT: idType
            })
        })

        fetchDishes()
        setIsOpen(false)
    }
    const onSubmitCreate = async (e) => {
        e.preventDefault()

        await fetch(`/api/v1/dishes/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                wording: wording,
                idM: idMenu,
                idT: idType
            })
        })

        fetchDishes()
        closeModalCreate()
    }
    const closeModal = () => {
        setIsOpen(false)
        setId(null)
    }
    const closeModalCreate = () => {
        setIsOpenCreate(false)

        setWording("")
        setIdMenu("")
        setIdType("")
    }

    useEffect(() => {
        fetchDishes()
        fetchTypes()
        fetchMenus()
    }, [])

    return (
        <main>
            <NavbarAdmin />
            <MenuAdmin />

            <div className={"w-full h-auto flex flex-col justify-start items-center"}>
                <div className={"w-full flex justify-end items-center p-4 sticky top-0 bg-white shadow-sm"}>
                    <button className={"bg-blue-500 hover:bg-blue-700 text-white rounded-md p-2"} onClick={() => createDish()}><i className={"bi bi-plus-lg mr-2"}/> Créer un plat</button>
                </div>

                <table className={"w-full"}>
                    <thead>
                        <tr>
                            <th className={"border p-2"}>Nom</th>
                            <th className={"border p-2"}>Menu</th>
                            <th className={"border p-2"}>Type</th>
                            <th className={"border p-2"}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dishes.map((dish) => {
                            return (
                                <tr key={dish.idD}>
                                    <td className={"border p-2 px-5"}>{dish.wording}</td>
                                    <td className={"border p-2 text-center"}>
                                        {menus.map((menu) => {
                                            if (menu.idM === dish.idM) {
                                                return menu.wording
                                            }
                                        })}
                                    </td>
                                    <td className={"border p-2 text-center"}>
                                        {types.map((type) => {
                                            if (type.idT === dish.idT) {
                                                return type.wording
                                            }
                                        })}
                                    </td>
                                    <td className={"border p-2 flex justify-center items-center gap-2"}>
                                        <button className={"bg-gray-100 hover:bg-yellow-500 hover:text-white duration-300 rounded-full px-3 py-2"} onClick={() => editDish(dish.idD)}><i className={"bi bi-pencil"}/></button>
                                        <button className={"bg-gray-100 hover:bg-red-500 hover:text-white duration-300 rounded-full px-3 py-2 ml-2"} onClick={() => deleteDish(dish.idD)}><i className={"bi bi-trash"}/></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} className={"w-full md:w-1/2 mx-auto my-20 p-5 bg-white rounded-md shadow-xl"} overlayClassName={"w-full h-full bg-black/80 fixed top-0 left-0"}>
                <div className={"flex justify-between items-center mb-5"}>
                    <h2 className={"text-lg font-semibold"}>Modifier un plat</h2>
                    <button onClick={() => closeModal()} className={"cursor-pointer bg-red-500 hover:bg-red-700 text-white rounded-full px-3 py-2"}><i className={"bi bi-x-lg"}/></button>
                </div>

                <form onSubmit={onSubmit} className={"flex flex-col gap-4"}>
                    <input type={"text"} placeholder={"Nom"} value={wording} onChange={(e) => setWording(e.target.value)} className={"p-2 border rounded-md"}/>
                    <select value={idMenu} onChange={(e) => setIdMenu(e.target.value)} className={"p-2 border rounded-md"}>
                        {menus.map((menu) => {
                            return (
                                <option key={menu.idM} value={menu.idM}>{menu.wording}</option>
                            )
                        })}
                    </select>
                    <select value={idType} onChange={(e) => setIdType(e.target.value)} className={"p-2 border rounded-md"}>
                        {types.map((type) => {
                            return (
                                <option key={type.idT} value={type.idT}>{type.wording}</option>
                            )
                        })}
                    </select>
                    <button type={"submit"} className={"bg-blue-500 hover:bg-blue-700 text-white rounded-md p-2"}><i className={"bi bi-pencil mr-2"}/> Modifier</button>
                </form>
            </Modal>
            <Modal isOpen={isOpenCreate} onRequestClose={() => setIsOpenCreate(false)} className={"w-full md:w-1/2 mx-auto my-20 p-5 bg-white rounded-md shadow-xl"} overlayClassName={"w-full h-full bg-black/80 fixed top-0 left-0"}>
                <div className={"flex justify-between items-center mb-5"}>
                    <h2 className={"text-lg font-semibold"}>Créer un plat</h2>
                    <button onClick={() => closeModalCreate()} className={"cursor-pointer bg-red-500 hover:bg-red-700 text-white rounded-full px-3 py-2"}><i className={"bi bi-x-lg"}/></button>
                </div>

                <form onSubmit={onSubmitCreate} className={"flex flex-col gap-4"}>
                    <input type={"text"} placeholder={"Nom"} value={wording} onChange={(e) => setWording(e.target.value)} className={"p-2 border rounded-md"}/>
                    <select value={idMenu} onChange={(e) => setIdMenu(e.target.value)} className={"p-2 border rounded-md"}>
                        <option value={""}>Choisir un menu</option>
                        {menus.map((menu) => {
                            return (
                                <option key={menu.idM} value={menu.idM}>{menu.wording}</option>
                            )
                        })}
                    </select>
                    <select value={idType} onChange={(e) => setIdType(e.target.value)} className={"p-2 border rounded-md"}>
                        <option value={""}>Choisir un type</option>
                        {types.map((type) => {
                            return (
                                <option key={type.idT} value={type.idT}>{type.wording}</option>
                            )
                        })}
                    </select>
                    <button type={"submit"} className={"bg-blue-500 hover:bg-blue-700 text-white rounded-md p-2"}><i className={"bi bi-plus-lg mr-2"}/> Créer</button>
                </form>
            </Modal>
        </main>
    )
}