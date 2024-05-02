import { prisma } from "@/lib/database";

export async function GET() {
    const events = await prisma.events.findMany({
        orderBy: {
            daytime: "asc",
        },
        where: {
            daytime: {
                gte: new Date(),
            }
        }
    });

    return Response.json(events);
}