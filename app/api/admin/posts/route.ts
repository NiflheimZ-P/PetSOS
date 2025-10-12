import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const posts = await prisma.posts.findMany({
    select: { post_id: true, detail: true, created_at: true},
  })
  return NextResponse.json(posts)
}
