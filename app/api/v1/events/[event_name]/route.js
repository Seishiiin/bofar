import { prisma } from "@/lib/database";

export async function GET(req) {
    const event_name = req.url.split("/").pop();

    const menu = await prisma.events.findFirst({
        where: {
            url: event_name,
        },
    });

    return Response.json(menu);
}