import { prisma } from "@/lib/database";

export async function GET() {
    const dishes = await prisma.dishes.findMany({
        include: {
            menus: true,
        },
        orderBy: {
            wording: "asc",
        },
    });

    return Response.json(dishes);
}

export async function POST(req) {
    const { wording, idM, idT } = await req.json();

    const dish = await prisma.dishes.create({
        data: {
            wording: wording,
            idM: Number.parseInt(idM),
            idT: Number.parseInt(idT),
        },
    });

    return Response.json(dish);
}

export async function PUT(req) {
    const { id, wording, idM, idT } = await req.json();

    const dish = await prisma.dishes.update({
        where: {
            idD: id
        },
        data: {
            wording: wording,
            idM: Number.parseInt(idM),
            idT: Number.parseInt(idT),
        },
    });

    return Response.json(dish);
}

export async function DELETE(req) {
    const { id } = await req.json();

    await prisma.dishes.delete({
        where: {
            idD: id
        },
    });

    return Response.json({ success: true });
}