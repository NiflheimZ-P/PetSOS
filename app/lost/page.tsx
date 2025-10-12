
import React from "react";
import Searchbar from "@/components/Searchbar"
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function LostPage() {
  // จำลองข้อมูลโพสต์
  const lostPosts = await prisma.posts.findMany({
    include: { owner: { select: { username: true } } },
    orderBy: { created_at: "desc" },
  });

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-gray-800 dark:text-gray-200">
      <main className="max-w-6xl mx-auto px-6 py-12">
        <Searchbar />
        <h1 className="text-4xl font-bold mb-10 text-gray-900 dark:text-white">
          Lost Animals
        </h1>

        {/* Grid of Posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lostPosts.map((post) => (
            <div
              key={post.post_id}
              className="rounded-xl border border-primary/20 dark:border-primary/30 overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-white dark:bg-gray-900"
            >
              <img
                src={post.image_url || "/no-img.png"}
                alt={post.detail || ""}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {post.detail}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {post.created_at.toLocaleDateString()} by {post.owner.username}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full bg-blue-300/20`}
                  >
                    {post.status}
                  </span>
                  <Link href={`/animal_details/${post.post_id}`}>
                    <button className="text-primary font-bold hover:underline">
                      View Details →
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
