import { prisma } from "@/lib/database";

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