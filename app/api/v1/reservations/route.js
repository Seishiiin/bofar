import { prisma } from "@/lib/database";

export async function GET(req) {
    const reservations = await prisma.reservations.findMany({
        orderBy: {
            daytime: "asc"
        }
    });

    return Response.json(reservations);
}

export async function POST(req) {
    const { name, people, daytime, phone } = await req.json();

    const reservation = await prisma.reservations.create({
        data: {
            name: name,
            people: Number.parseInt(people),
            daytime: new Date(daytime).toISOString(),
            phone: phone,
        }
    });

    return Response.json(reservation);
}

export async function PUT(req) {
    const { id, name, people, daytime, phone } = await req.json();

    const reservation = await prisma.reservations.update({
        where: {
            idR: id
        },
        data: {
            name: name,
            people: Number.parseInt(people),
            daytime: new Date(daytime).toISOString(),
            phone: phone
        }
    });

    return Response.json(reservation);
}

export async function DELETE(req) {
    const { id } = await req.json();

    await prisma.reservations.delete({
        where: {
            idR: id
        }
    });

    return Response.json({ message: "Reservation deleted" });
}