import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    try {
      const notifications = await prisma.notifications.findMany({
        where: { user: { id: session.user.id } },
      });
      return NextResponse.json(notifications, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
    }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { post_id, message } = await req.json();

    const post = await prisma.posts.findUnique({
      where: { post_id },
      include: { owner: true },
    });

    const newNoti = await prisma.notifications.create({
      data: {
        userId: post?.owner.id || "",
        message: message || "You have a new notification",
      },
    });

    return NextResponse.json(newNoti, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create notification" }, { status: 500 });
  }
}
