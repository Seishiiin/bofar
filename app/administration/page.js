import Link from "next/link";

export default function Administration() {
    return (
        <main>
            <p>Ah le sang t'es bieeeeng là</p>
            <Link href={"/auth/signout"}>Si tu veux plus être bieeeeeng</Link>
        </main>
    )
}