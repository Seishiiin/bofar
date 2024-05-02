import { prisma } from "@/lib/database";

export async function POST(req) {

    const body = await req.json();
    let response = {
        message: "",
        status: 0
    };

    await prisma.reservations.create({
        data: {
            name: body.name,
            people: Number.parseInt(body.people),
            daytime: new Date(body.daytime).toISOString(),
            phone: body.phone
        }
    }).then(() => {
        // return 200 status response
        response = { message: "Votre réservation à bien été prise en compte", status: 200 };
    }
    ).catch((error) => {
        // return 500 status response
        response = { message: error.message, status: 500 };
    });

    return Response.json(response);
}