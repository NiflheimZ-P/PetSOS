import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

export async function GET(req: NextRequest) {
  try {
    const owner = req.nextUrl.searchParams.get('post_owner');
    // ตรวจสอบค่า
    if (!owner) {
      return NextResponse.json({ error: 'post_owner is required' }, { status: 400 });
    }

    // ตัวอย่างใช้ Prisma
    const posts = await prisma.posts.findMany({
      where: { post_owner: owner },
    });

    // ตัวอย่างตอบกลับจำลอง
    // const posts = [{ id: 1, title: 'Mock Post', post_owner: owner }];

    return NextResponse.json(posts);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    // ฟิลด์ข้อความ
    const detail = String(form.get("detail") || "");
    const latRaw = form.get("lat");
    const lngRaw = form.get("lng");

    const lat = latRaw ? parseFloat(latRaw.toString()) : null;
    const lng = lngRaw ? parseFloat(lngRaw.toString()) : null;

    if (!detail) {
      return NextResponse.json({ error: "detail required" }, { status: 400 });
    }

    // ไฟล์รูป (optional)
    let imageUrl: string | null = null;
    const file = form.get("image") as File | null;

    if (file && file.size > 0) {
      // validate เบื้องต้น
      const allowed = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!allowed.includes(file.type)) {
        return NextResponse.json({ error: "unsupported file type" }, { status: 400 });
      }
      const MAX = 10 * 1024 * 1024; // 10MB
      if (file.size > MAX) {
        return NextResponse.json({ error: "file too large (>10MB)" }, { status: 400 });
      }

      // เตรียมโฟลเดอร์ปลายทาง
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadsDir, { recursive: true });

      // ตั้งชื่อไฟล์ใหม่
      const ext = (() => {
        const m = file.name?.match(/\.[a-zA-Z0-9]+$/);
        return m ? m[0].toLowerCase() : ({
          "image/jpeg": ".jpg",
          "image/png": ".png",
          "image/gif": ".gif",
          "image/webp": ".webp",
        } as Record<string, string>)[file.type] || ".bin";
      })();
      const filename = `${crypto.randomUUID()}${ext}`;
      const filepath = path.join(uploadsDir, filename);

      // เขียนไฟล์
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(filepath, buffer, { flag: "wx" }); // ป้องกันทับไฟล์เดิม

      // path ที่จะเสิร์ฟสู่ client
      imageUrl = `/uploads/${filename}`;
    }

    // บันทึกลง DB (Decimal ใน Prisma รับ string)
    const post = await prisma.posts.create({
      data: {
        post_owner: "77ccabdf-24c3-49e0-a7f9-0c67d289639c", // สมมติ user_id ตายตัวก่อน
        type: "TEXT",
        detail,
        status: "LOST",
        lat,
        lng,
        image_url: imageUrl ?? null,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: "failed to create post" }, { status: 500 });
  }
}
