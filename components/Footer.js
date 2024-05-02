import Link from "next/link";

export default function Footer() {
    return (
        <div className={"w-full py-2 flex flex-col justify-center items-center z-10"}>
            <div className={"w-full grid grid-cols-1 lg:grid-cols-2 text-center gap-4 py-5 mx-auto"}>
                <iframe className={"mx-auto h-[200px] w-4/6"} src="https://maps.google.com/maps?width=200&amp;height=200&amp;hl=en&amp;q=35%20Place%20Monge,%2073000%20Chamb%C3%A9ry+(My%20Business%20Name)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>

                <div className={"mx-auto flex flex-col justify-center text-center items-center gap-2"}>
                    <h3 className={"text-xl font-bold"}>Contact</h3>
                    <hr className={"w-full border border-gray-300"}/>
                    <Link href={"https://maps.google.com/maps?width=200&amp;height=200&amp;hl=en&amp;q=35%20Place%20Monge,%2073000%20Chamb%C3%A9ry+(My%20Business%20Name)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"} target={"_blank"}>35 Place Monge, 73000 Chambéry</Link>
                    <Link href={"tel:+33479611111"}>07 46 46 35 24</Link>
                    <Link href={"mailto:lebofar@gmail.com"}>lebofar@gmail.com</Link>
                    <hr className={"w-full border border-gray-300"}/>
                    <div className={"flex gap-2"}>
                        <Link href={"/privacy"}><i className={"bi bi-shield-lock"}></i></Link>
                        <Link href={"https://www.instagram.com/lebofar/"}><i className={"bi bi-instagram"}></i></Link>
                        <Link href={"https://www.facebook.com/lebofar/"}><i className={"bi bi-facebook"}></i></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}