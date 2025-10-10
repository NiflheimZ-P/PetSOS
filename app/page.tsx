import  prisma  from '@/lib/prisma'
import { NextResponse } from 'next/server'
import Link from "next/link";

import Searchbar from "@/components/Searchbar"
import { Card } from "@/components/Card"
//import recentPosts from "@/lib/data"

export default async function Page() {
  const posts = await prisma.posts.findMany({
    include: {
    },
    orderBy: { created_at: "desc" },
  })

  return (
    <div>
      <div className="w-2/3 mx-auto pt-10">
        <Searchbar />
        <div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground">Recent Posts</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.post_id} href={`/animal_details/${post.post_id}`}>
                <Card
                  title={post.detail || "Untitled Post"}
                  location={post.location || "Unknown"}
                  timeAgo={new Date(post.created_at).toLocaleString()}
                  imageUrl={post.image_url || "/default.jpg"}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}