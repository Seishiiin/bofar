"use client"

import {useEffect, useState} from "react";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SignIn() {
    const router = useRouter()
    const {status} = useSession()

    const [conexion, setConexion] = useState({
        username: "",
        password: ""
    })
    const [errorCode, setErrorCode] = useState(200)

    async function onSubmit(event) {
        event.preventDefault()
        setErrorCode(300)

        const response = await signIn('credentials', {
            redirect: false,
            username: conexion.username,
            password: conexion.password
        })

        if (!response) {
            setErrorCode(500)
        } if (response && response.error) {
            setErrorCode(401)
        }
    }

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/administration");
        }
    }, [status]);

    return (
        <main>
            <Navbar />

            <div className={"w-full flex flex-col items-center py-10"}>
                <h1 className={"text-4xl font-bold text-center"}>Connexion au panneau d&apos;administration</h1>
                <hr className={"w-1/3 my-5"} />

                {errorCode === 401 && <p className={"text-red-500"}>Identifiants incorrects</p>}
                {errorCode === 500 && <p className={"text-red-500"}>Erreur de connexion</p>}

                <form onSubmit={onSubmit} className={"w-full flex flex-col items-center px-5"}>
                    <div className={"w-full md:w-1/3"}>
                        <label className={"font-bold"} htmlFor={"username"}>Nom d&apos;utilisateur</label>
                        <input className={"w-full px-2 py-1 border border-black rounded"} name={"username"} type="text" value={conexion.username} onChange={event => setConexion({...conexion, username: event.target.value})} />
                    </div>
                    <div className={"w-full md:w-1/3 mt-5"}>
                        <label className={"font-bold"} htmlFor={"password"}>Mot de passe</label>
                        <input className={"w-full px-2 py-1 border border-black rounded"} name={"password"} type="password" value={conexion.password} onChange={event => setConexion({...conexion, password: event.target.value})} />
                    </div>
                    <button type={"submit"} className={"w-full md:w-1/3 bg-green-950 text-white rounded py-2 px-5 mt-5"}>Se connecter</button>
                </form>
            </div>

            <Footer />
        </main>
    )
}