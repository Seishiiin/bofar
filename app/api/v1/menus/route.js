import { prisma } from "@/lib/database";

export async function GET() {
    const menus = await prisma.menus.findMany({
        include: {
            dishes: true,
        },
    });

    return Response.json(menus);
}