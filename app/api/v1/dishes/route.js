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