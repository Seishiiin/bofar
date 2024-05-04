import { prisma } from "@/lib/database";

export async function GET(req) {
    const reservations = await prisma.reservations.findMany({
        orderBy: {
                daytime: 'asc'
        }
    });

    return Response.json(reservations);
}

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
        response = { message: "Votre réservation a bien été prise en compte. En cas de changement, contactez-nous au 07 46 46 35 24", status: 200 };
    }
    ).catch((error) => {
        response = { message: error.message, status: 500 };
    });

    return Response.json(response);
}