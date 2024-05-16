import { prisma } from "@/lib/database";

export async function DELETE(req) {
    const id = req.url.split("/").pop();

    const reservation = await prisma.menus.delete({
        where: {
            idM: parseInt(id),
        },
    });

    const reservations = await prisma.reservations.findMany();

    return Response.json(reservations);
}

export async function GET(req) {
    const menu_name = req.url.split("/").pop();

    const menu = await prisma.menus.findFirst({
        where: {
            url: menu_name,
        },
        include: {
            dishes: true,
        },
    });

    return Response.json(menu);
}