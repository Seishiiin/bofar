"use client"

import {useEffect, useState} from "react";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

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
            {errorCode === 401 && <p className={"text-red-500"}>Nom d&apos;utilisateur ou mot de passe incorrect</p>}
            {errorCode === 500 && <p className={"text-red-500"}>Une erreur est survenue</p>}
            <form onSubmit={onSubmit} className={"p-10"}>
                <input name={"username"} type="text" className={"border-4 border-black mr-3"} value={conexion.username} onChange={event => setConexion({...conexion, username: event.target.value})} />
                <input name={"password"} type="text" className={"border-4 border-black"} value={conexion.password} onChange={event => setConexion({...conexion, password: event.target.value})} />
                <button type="submit">Connexion</button>
            </form>
        </main>
    )
}