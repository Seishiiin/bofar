'use client'

import Navbar from "@/components/Navbar";
import Link from "next/link";

import {snakeCase} from "snake-case";
import {useEffect, useState} from "react";
import Footer from "@/components/Footer";

export default function Home() {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const [menus, setMenus] = useState([]);
    const [events, setEvents] = useState([]);

    const fetchMenus = async () => {
        const response = await fetch("/api/v1/menus", {
            cache: "no-cache",
        })
        const data = await response.json()
        setMenus(data)
    }
    const fetchEvents = async () => {
        const response = await fetch("/api/v1/events", {
            cache: "no-cache",
        })
        const data = await response.json()
        setEvents(data)
    }

    useEffect(() => {
        fetchMenus()
        fetchEvents()
    }, []);

    return (
        <main>
            <Navbar/>

            <div className={"w-full h-[calc(100dvh-8.5rem)]"}>
                <img src="/home_page.jpg" alt="Profile Picture" className={"w-full h-full object-cover z-0"}/>

                <div
                    className={"absolute top-0 left-0 w-full h-[calc(100dvh-8.5rem)] mt-[8.5rem] pb-[3.25rem] flex flex-col justify-center items-center text-white bg-black/50 z-10"}>
                    <h1 className={"text-2xl sm:text-5xl md:text-7xl text-center font-bold"}>LE BOFAR - RESTAURANT</h1>
                    <p className={"text-xl sm:text-xs md:text-lg text-center"}>Ouvert 7j/7 de 18h30 à 01h00 - Événements
                        tous les week-ends</p>
                </div>

                <div className={"absolute bottom-20 w-full z-10"}>
                    <Link href={"/reservations"}
                          className={"w-56 flex justify-center items-center gap-2 hover:gap-4 duration-100 mx-auto px-5 py-2 text-md text-white bg-green-950 rounded"}> Réserver
                        une table <i className={"bi bi-arrow-right"}></i></Link>
                </div>
            </div>

            <div className={"w-full py-10 flex flex-col justify-center items-center"}>
                <div className={"mb-20"}>
                    <h2 className={"text-xl sm:text-3xl md:text-5xl text-center font-bold"}>MENUS</h2>
                    <p className={"text-xl sm:text-xs md:text-lg text-center"}>Découvrez nos plats et nos formules</p>
                </div>
                <div className={"w-full grid grid-cols-1 lg:grid-cols-2 gap-4 pb-10 px-5 md:px-20"}>
                    {menus.map((menu, index) => (
                        <div key={index} className={"p-4 rounded-md bg-white border-2 border-gray-300 shadow-md"}>
                            <h3 className={"text-xl font-bold"}>{menu.wording.toUpperCase()}</h3>
                            <hr className={"my-2 border-gray-300"}/>
                            <ul className={"list-disc"}>
                                {menu.dishes.map((product, index) => (
                                    <li key={index} className={"line-clamp-1"}>{product.wording}</li>
                                ))}
                            </ul>
                            <div className={"flex justify-between items-baseline gap-2 mt-2"}>
                                <p className={"flex justify-left items-start gap-2 line-clamp-1 text-lg font-black"}><i
                                    className="bi bi-coin"></i> {menu.price}€</p>
                                <Link href={`/menus/${menu.url}`}
                                      className={"bg-green-950/80 hover:bg-green-950 flex justify-center items-center gap-2 text-white text-sm mt-5 px-3 py-2 rounded-md"}><i
                                    className={"bi bi-eye"}></i> Voir plus</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={"w-full py-10 flex flex-col justify-center items-center text-white bg-green-950"}>
                <div className={"mb-20"}>
                    <h2 className={"text-xl sm:text-3xl md:text-5xl text-center font-bold"}>ÉVÉNEMENTS</h2>
                    <p className={"text-xl sm:text-xs md:text-lg text-center"}>Tous les week-ends, venez profiter de nos
                        événements</p>
                </div>

                <div className={"w-full grid grid-cols-1 lg:grid-cols-2 gap-4 px-5 md:px-20 text-black"}>
                    {events.map((event, index) => (
                        <div key={index} className={"p-4 rounded-md bg-white border-2 border-gray-300 shadow-md"}>
                            <h3 className={"text-xl font-bold"}>{event.name.toUpperCase()}</h3>
                            <hr className={"my-2 border-gray-300"}/>
                            <p className={"line-clamp-3"}>{event.description}</p>
                            <div className={"flex justify-between items-baseline gap-2 mt-2"}>
                                <p className={"flex justify-left items-start gap-2 line-clamp-1 text-lg font-black"}><i
                                    className="bi bi-calendar"></i> {(new Date(event.daytime).toLocaleDateString())}</p>
                                <Link href={`/events/${snakeCase(event.name)}`}
                                      className={"bg-green-950/80 hover:bg-green-950 flex justify-center items-center gap-2 text-white text-sm mt-5 px-3 py-2 rounded-md"}><i
                                    className={"bi bi-eye"}></i> Voir plus</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={"w-full py-10 flex flex-col justify-center items-center"}>
                <div className={"mb-20"}>
                    <h2 className={"text-xl sm:text-3xl md:text-5xl text-center font-bold"}>GALERIE</h2>
                    <p className={"text-xl sm:text-xs md:text-lg text-center"}>Découvrez notre restaurant en images</p>
                </div>

                <div className={"w-full grid grid-cols-1 lg:grid-cols-3 gap-4 px-5 md:px-20"}>
                    <div className={"relative"}>
                        <img src={"/premium/" + (getRandomInt(3) + 1) + ".jpg"} alt="Gallery 1"
                             className={"w-full h-5/6 object-cover rounded-md"}/>
                    </div>
                    <div className={"relative"}>
                        <img src={"/ouvrier/" + (getRandomInt(3) + 1) + ".jpg"} alt="Gallery 2"
                             className={"w-full h-5/6 object-cover rounded-md"}/>
                    </div>
                    <div className={"relative"}>
                        <img src={"/terroir/" + (getRandomInt(3) + 1) + ".jpg"} alt="Gallery 3"
                             className={"w-full h-5/6 object-cover rounded-md"}/>
                    </div>
                </div>
            </div>

            <div className={"w-full py-10 flex flex-col justify-center items-center text-white bg-green-950"}>
                <div className={"mb-20"}>
                    <h2 className={"text-xl sm:text-3xl md:text-5xl text-center font-bold"}>QUI SOMMES-NOUS ?</h2>
                    <p className={"text-xl sm:text-xs md:text-lg text-center"}>Découvrez notre histoire</p>
                </div>

                <div className={"w-full flex justify-around items-center gap-4 px-5 md:px-20"}>
                    <div className={"flex flex-col gap-4 w-full md:w-1/2"}>
                        <p>Le Bofar est un restaurant situé à Chambéry. Nous vous proposons une cuisine traditionnelle
                            et familiale, dans un cadre chaleureux et convivial. Venez découvrir nos plats faits maison,
                            préparés avec des produits frais et de qualité. Nous vous accueillons tous les jours de la
                            semaine, de 18h30 à 01h00, pour vous faire passer un agréable moment en notre compagnie.
                            N&apos;hésitez pas à réserver une table pour venir déguster nos spécialités et profiter de
                            nos événements organisés chaque week-end.</p>
                        <p>&quot;Bofar&quot; signifie &quot;manger&quot; en patois savoyard.</p>
                    </div>
                    <img src="/restaurant.jpg" alt="Restaurant"
                         className={"hidden md:block w-1/2 h-full object-cover rounded-md"}/>
                </div>
            </div>

            <Footer/>
        </main>
    );
}
