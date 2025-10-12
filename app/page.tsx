import prisma from "@/lib/prisma";
import Link from "next/link";
import Searchbar from "@/components/Searchbar";
import { Card } from "@/components/Card";

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = (await searchParams) ?? {};
  const queryRaw = sp.query;

  const query = Array.isArray(queryRaw) ? queryRaw[0] : queryRaw ?? "";

  let posts;

  if (query.trim()) {
    // Use your existing API search logic
    posts = await prisma.posts.findMany({
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
      include: {
        owner: { select: { username: true } },
      },
      orderBy: { created_at: "desc" },
    });
  } else {
    // Default (recent posts)
    posts = await prisma.posts.findMany({
      include: { owner: { select: { username: true } } },
      orderBy: { created_at: "desc" },
    });
  }

  return (
    <div>
      <div className="w-2/3 mx-auto pt-10">
        <Searchbar />
        <div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground">
            {query ? `Search results for "${query}"` : "Recent Posts"}
          </h2>

          {posts.length === 0 ? (
            <p className="text-muted-foreground">No posts found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link key={post.post_id} href={`/animal_details/${post.post_id}`}>
                  <Card
                    title={post.detail || "Untitled Post"}
                    // location={post.location || "Unknown"}
                    timeAgo={new Date(post.created_at).toLocaleString()}
                    imageUrl={post.image_url || "/no-img.png"}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
