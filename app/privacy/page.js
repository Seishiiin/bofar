import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import Link from "next/link";

export default function Privacy() {
    return (
        <div>
            <Navbar/>
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mt-6">Mentions légales</h1>
                <p className="mt-4">
                    Conformément aux dispositions des articles 6-III et 19 de la loi pour la Confiance dans l&apos;Économie Numérique, il est précisé aux utilisateurs, ci-après désignés l&apos;Utilisateur, du site
                    <Link href="https://bofar.seishin-studio.com/" className={"text-blue-500"}> https://bofar.seishin-studio.com </Link>
                    ci-après dénommé le Site, l&apos;identité des différents intervenants dans le cadre de sa réalisation et de son suivi.
                </p>

                <h2 className="text-2xl font-bold mt-6">Article 1 - L&apos;éditeur</h2>
                <p>Le site
                    <Link href="https://bofar.seishin-studio.com/" className={"text-blue-500"}> https://bofar.seishin-studio.com </Link>
                    est édité par : HALLOSSERIE Gabin, ci-après dénommé l&apos;Éditeur, domicilié à l&apos;adresse suivante : 35 rue de la gare 73000 Chambéry, et contactable par mail à l&apos;adresse suivante :
                    <Link href={"mailto:gabinhalloss@gmail.com"} className={"text-blue-500"}> gabinhalloss@gmail.com</Link>.
                </p>

                <h2 className="text-2xl font-bold mt-6">Article 2 - L&apos;hébergeur</h2>
                <p>Le site
                    <Link href="https://bofar.seishin-studio.com/" className={"text-blue-500"}> https://bofar.seishin-studio.com </Link>
                    est hébergé par : Vercel, dont le siège est situé à l&apos;adresse suivante : 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis. L&apos;hébergeur peut être contacté au numéro de téléphone suivant : +1 877-669-9848.
                </p>

                <h2 className="text-2xl font-bold mt-6">Article 3 - Accès au site</h2>
                <p>Le site est accessible par tout endroit, 7j/7, 24h/24 sauf cas de force majeure, interruption programmée ou non et pouvant découler d&apos;une nécessité de maintenance. En cas de modification, interruption ou suspension des services le site
                    <Link href="https://bofar.seishin-studio.com/" className={"text-blue-500"}> https://bofar.seishin-studio.com </Link>
                    ne saurait être tenu responsable.
                </p>

                <h2 className="text-2xl font-bold mt-6">Article 4 - Collecte des données</h2>
                <p>Le site assure à l&apos;Utilisateur une collecte et un traitement d&apos;informations personnelles dans le respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l&apos;informatique, aux fichiers et aux libertés. Le site est déclaré à la CNIL.</p>
            </div>
            <Footer/>
        </div>
    )
}