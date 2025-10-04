"use client";
import React from "react";
import Searchbar from "@/components/Searchbar"

export default function LostPage() {
  // จำลองข้อมูลโพสต์
  const lostPosts = [
    {
      id: 1,
      title: "Lost Dog near Sukhumvit",
      date: "Oct 1, 2025",
      image:
        "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=600",
      description:
        "A brown Labrador wearing a red collar, last seen near Sukhumvit Soi 22.",
      status: "Searching",
      color: "bg-yellow-500/20 text-yellow-800 dark:text-yellow-300",
    },
    {
      id: 2,
      title: "Lost Cat in Silom",
      date: "Sep 30, 2025",
      image:
        "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600",
      description:
        "Grey cat with blue eyes, last seen around Silom Complex. Very friendly.",
      status: "Searching",
      color: "bg-yellow-500/20 text-yellow-800 dark:text-yellow-300",
    },
    {
      id: 3,
      title: "Lost Parrot in Chatuchak",
      date: "Sep 29, 2025",
      image:
        "https://images.unsplash.com/photo-1601758124091-3c28b0bde8c8?w=600",
      description:
        "Green parrot that can say 'Hello!'. Flew away near JJ Mall.",
      status: "Found",
      color: "bg-blue-500/20 text-blue-800 dark:text-blue-300",
    },
  ];

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
