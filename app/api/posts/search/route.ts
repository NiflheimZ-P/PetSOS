import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";

  if (!query) return NextResponse.json([]);

  const posts = await prisma.posts.findMany({
    where: {
      OR: [
        {
          owner: {
            username: { contains: query, mode: "insensitive" },
          },
        },
        { detail: { contains: query, mode: "insensitive" } },
        // { location: { contains: query, mode: "insensitive" } },
      ],
    },
    include: {owner: { select: { username: true } },},
    take: 5,
  });

  return NextResponse.json(posts);
}

