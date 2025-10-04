import ProfileLayout from "@/components/ProfileLayout";

export default function RecentPostsPage() {
  const posts = [
    {
      id: 1,
      title: "Lost Dog near Central Park",
      date: "Oct 1, 2025",
      image: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=600",
      description:
        "A brown Labrador spotted near Central Park around 8 PM. Wearing a red collar.",
    },
    {
      id: 2,
      title: "Found Cat at Riverside",
      date: "Sep 28, 2025",
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600",
      description:
        "Grey cat found near the riverside. Looks healthy and friendly.",
    },
  ];

  return (
    <ProfileLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Recent Posts
        </h1>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-900"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {post.date}
                </p>
                <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                  {post.description}
                </p>
                <button className="mt-4 text-primary font-medium hover:underline">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProfileLayout>
  );
}
