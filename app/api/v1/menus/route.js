import { prisma } from "@/lib/database";

export async function GET() {
    const menus = await prisma.menus.findMany({
        include: {
            dishes: true,
        },
        orderBy: {
            price: "asc",
        }
    });

    return Response.json(menus);
}

export async function POST(req) {
    const { wording, url, price } = await req.json();

    const menu = await prisma.menus.create({
        data: {
            wording: wording,
            url: url,
            price: Number.parseFloat(price),
        }
    });

    return Response.json(menu);
}

export async function PUT(req) {
    const { id, wording, url, price } = await req.json();

    const menu = await prisma.menus.update({
        where: {
            idM: id
        },
        data: {
            wording: wording,
            url: url,
            price: Number.parseFloat(price),
        }
    });

    return Response.json(menu);
}

export async function DELETE(req) {
    const { id } = await req.json();

    await prisma.menus.delete({
        where: {
            idM: id
        }
    });

    return Response.json({ message: "Menu deleted" });
}