import { prisma } from "@/lib/database";

export async function GET() {
    const events = await prisma.events.findMany({
        orderBy: {
            daytime: "asc",
        }
    });

    return Response.json(events);
}

export async function POST(req) {
    const { name, description, daytime } = await req.json();

    const event = await prisma.events.create({
        data: {
            name: name,
            description: description,
            daytime: new Date(daytime).toISOString(),
        },
    });

    return Response.json(event);
}

export async function PUT(req) {
    const { id, name, description, daytime } = await req.json();

    const event = await prisma.events.update({
        where: {
            idE: id,
        },
        data: {
            name: name,
            description: description,
            daytime: new Date(daytime).toISOString(),
        },
    });

    return Response.json(event);
}

export async function DELETE(req) {
    const { id } = await req.json();

    await prisma.events.delete({
        where: {
            idE: id,
        },
    });

    return Response.json({ message: "Event deleted" });
}