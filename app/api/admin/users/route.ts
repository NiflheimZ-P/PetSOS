import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const users = await prisma.user.findMany({
    select: { id: true, username: true, email: true },
  })
  return NextResponse.json(users)
}
