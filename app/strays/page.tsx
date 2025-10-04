"use client";
import React from "react";
import Searchbar from "@/components/Searchbar"

export default function StraysPage() {
  // จำลองข้อมูลโพสต์สัตว์จรจัด
  const strayPosts = [
    {
      id: 1,
      title: "Stray Dog in Chatuchak",
      date: "Oct 2, 2025",
      image:
        "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600",
      description:
        "Brown stray dog roaming around Chatuchak market. Looks hungry and friendly.",
      status: "Unadopted",
      color: "bg-yellow-500/20 text-yellow-800 dark:text-yellow-300",
    },
    {
      id: 2,
      title: "Stray Cat in Silom",
      date: "Oct 1, 2025",
      image:
        "https://images.unsplash.com/photo-1592194996308-2e3f0edc2c5b?w=600",
      description:
        "Grey cat often seen near Silom street. Very timid but seems healthy.",
      status: "Unadopted",
      color: "bg-yellow-500/20 text-yellow-800 dark:text-yellow-300",
    },
    {
      id: 3,
      title: "Stray Puppy in Sukhumvit",
      date: "Sep 29, 2025",
      image:
        "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600",
      description:
        "Small stray puppy spotted near Sukhumvit 22. Needs care and shelter.",
      status: "Unadopted",
      color: "bg-yellow-500/20 text-yellow-800 dark:text-yellow-300",
    },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-gray-800 dark:text-gray-200">
      <main className="max-w-6xl mx-auto px-6 py-12">
         <Searchbar />
        <h1 className="text-4xl font-bold mb-10 text-gray-900 dark:text-white">
          Stray Animals
        </h1>

        {/* Grid of Stray Posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {strayPosts.map((post) => (
            <div
              key={post.id}
              className="rounded-xl border border-primary/20 dark:border-primary/30 overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-white dark:bg-gray-900"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {post.date}
                </p>
                <p className="text-gray-700 dark:text-gray-300 line-clamp-3 mb-4">
                  {post.description}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${post.color}`}
                  >
                    {post.status}
                  </span>
                  <button className="text-primary font-bold hover:underline">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
