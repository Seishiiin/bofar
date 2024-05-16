import { prisma } from "@/lib/database";

export async function GET() {
    const types = await prisma.types.findMany();

    return Response.json(types);
}