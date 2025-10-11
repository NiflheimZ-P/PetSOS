import prisma from "@/lib/prisma";
import Image from "next/image";
import AddCommentForm from "./AddCommentForm";

interface PageProps {
  params: { post_id: string };
}

export default async function LostPetDetails({ params }: PageProps) {
  const { post_id } = params;

  const post = await prisma.posts.findUnique({
    where: { post_id },
    include: {
      owner: true, // include the user who made the post
      comments: {
        include: {
          owner: true, // include each comment's user
        },
        orderBy: { created_at: "desc" },
      },
    },
  });

  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-gray-500">
        <p className="text-4xl mb-2">⚠️</p>
        <p className="text-2xl font-semibold text-red-500">Error 404</p>
        <p>Post not found</p>
      </div>
    );
  }

  // For demo: hardcoded user until authentication is added
  const currentUserId = "6a57e596-3042-420b-bdb1-896025e81e75";

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-black dark:text-white">
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex-1 px-10 py-8 md:px-20 lg:px-40">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-sm font-medium mb-6">
              <a className="text-primary hover:underline" href="/animal_details">
                Lost Pets
              </a>
              <span className="text-black/40 dark:text-white/40">/</span>
              <span className="text-black dark:text-white">
                {post.detail?.slice(0, 30) || "Post"}
              </span>
            </div>

            {/* Post Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="mb-6 rounded-xl overflow-hidden">
                  <Image
                    src={post.image_url || "/default.jpg"}
                    alt={post.detail || "Post image"}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h1 className="text-3xl font-bold mb-2">
                  {post.detail || "Untitled Post"}
                </h1>

                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3">Status</h2>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/20 text-primary">
                    {post.status || "Unknown"}
                  </span>
                </div>
              </div>

              {/* Placeholder for Contact Form */}
              <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Contact Reporter</h2>
                <form className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium text-black/80 dark:text-white/80 mb-1"
                      htmlFor="name"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter your name"
                      className="form-input w-full rounded-lg border-primary/20 dark:border-primary/30 bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-base text-black dark:text-white placeholder-black/40 dark:placeholder-white/40"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-black/80 dark:text-white/80 mb-1"
                      htmlFor="email"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      className="form-input w-full rounded-lg border-primary/20 dark:border-primary/30 bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-base text-black dark:text-white placeholder-black/40 dark:placeholder-white/40"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-black/80 dark:text-white/80 mb-1"
                      htmlFor="message"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      placeholder="Enter your message"
                      rows={4}
                      className="form-textarea w-full rounded-lg border-primary/20 dark:border-primary/30 bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-base text-black dark:text-white placeholder-black/40 dark:placeholder-white/40"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-black font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>



            {/* Comments */}
            <div className="mt-12 pt-8 border-t border-primary/20 dark:border-primary/30">
              <h2 className="text-2xl font-bold mb-6">
                Comments ({post.comments.length})
              </h2>
                {/* Add Comment Form */}
                <div className="mt-8">
                    <AddCommentForm postId={post_id} currentUserId={currentUserId} />
                </div>
              <div className="space-y-6">
                {post.comments.map((c) => (
                  <div key={c.comment_id} className="flex items-start gap-4">
                    <Image
                      src={c.owner?.image_url || "/default-avatar.png"}
                      alt={c.owner?.username || "User"}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold">
                          {c.owner?.username ||[c.owner?.first_name, c.owner?.last_name].filter(Boolean).join(" ") ||"Unknown User"}
                        </p>
                        <p className="text-xs text-black/50 dark:text-white/50">
                          {new Date(c.created_at).toLocaleString()}
                        </p>
                      </div>
                      <p className="text-base text-black/80 dark:text-white/80">
                        {c.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
