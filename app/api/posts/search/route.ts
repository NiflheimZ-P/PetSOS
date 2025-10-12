import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";

  if (!query) return NextResponse.json([]);

  const posts = await prisma.posts.findMany({
    where: {
        OR: [
        { detail: { contains: query, mode: "insensitive" } },
        //   { location: { contains: query, mode: "insensitive" } },
        {
            owner: {
            OR: [
                { username: { contains: query, mode: "insensitive" } },
                { first_name: { contains: query, mode: "insensitive" } },
                { last_name: { contains: query, mode: "insensitive" } },
            ],
            },
        },
        ],
    },
    include: {
        owner: {
        select: {
            username: true,
            first_name: true,
            last_name: true,
        },
        },
    },
    });


  return NextResponse.json(posts);
}

