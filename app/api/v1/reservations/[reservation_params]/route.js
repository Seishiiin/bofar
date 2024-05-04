import {prisma} from "@/lib/database";

export async function DELETE(req) {
    const name = req.url.split("/").pop();

    const reservation = await prisma.reservations.delete({
        where: {
            idR: parseInt(name),
        },
    });

    const reservations = await prisma.reservations.findMany();

    return Response.json(reservations);
}

export async function GET(req) {
    const name = req.url.split("/").pop();

    const reservation = await prisma.reservations.findFirst({
        where: {
            name: name,
        },
    });

    return Response.json(reservation);
}

export async function PUT(req) {
    const reservation = await prisma.reservations.update({
        where: {
            idR: req.body.idR,
        },
        data: {
            name: req.body.name,
            people: req.body.people,
            daytime: new Date(req.body.daytime),
            phone: req.body.phone,
        },
    });

    return Response.json(reservation);
}