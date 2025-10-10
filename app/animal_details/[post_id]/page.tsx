import prisma from "@/lib/prisma";

interface PageProps {
  params: { post_id: string };
}

export default async function LostPetDetails({ params }: PageProps) {
  const { post_id } = params;

  const post = await prisma.posts.findUnique({
    where: { post_id },
    include: {
      // post_owner_user: true,
      // post_comments: true
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
                  <img
                    src={post.image_url || "/default.jpg"}
                    alt={post.detail || "Post image"}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h1 className="text-3xl font-bold mb-2">
                  {post.detail || "Untitled Post"}
                </h1>
                <p className="text-base text-black/80 dark:text-white/80 leading-relaxed mb-6">
                  {post.location
                    ? `Location: ${post.location}`
                    : "Location not specified"}
                </p>

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
                    <label className="block text-sm font-medium text-black/80 dark:text-white/80 mb-1" htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter your name"
                      className="form-input w-full rounded-lg border-primary/20 dark:border-primary/30 bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-base text-black dark:text-white placeholder-black/40 dark:placeholder-white/40"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black/80 dark:text-white/80 mb-1" htmlFor="email">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      className="form-input w-full rounded-lg border-primary/20 dark:border-primary/30 bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-base text-black dark:text-white placeholder-black/40 dark:placeholder-white/40"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black/80 dark:text-white/80 mb-1" htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      placeholder="Enter your message"
                      rows={4}
                      className="form-textarea w-full rounded-lg border-primary/20 dark:border-primary/30 bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-base text-black dark:text-white placeholder-black/40 dark:placeholder-white/40"
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full bg-primary text-black font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity">
                    Send Message
                  </button>
                </form>
              </div>

            </div>

            {/* Comments */}
            <div className="mt-12 pt-8 border-t border-primary/20 dark:border-primary/30">
              <h2 className="text-2xl font-bold mb-6">Comments (2)</h2>
              <div className="space-y-6">
                {/* Comment 1 */}
                <div className="flex items-start gap-4">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4q7mT8pAMC6jmq3vrG6vUNbz_9AoHXmeP3bKjMT0d5OQDJwrLIgSH8XY9loig3EMXZvjlNlF41OSeMHXHgZ5Bx35Tsnhj6uPSAgWmwgosAUAsWwrcLupLwOizU0jpHYzz55XDOZpOhrD7f-NUsxsEY9hncra2PlHYGYJI4NoUbT2p4jSd2WgnCQWG9chfvulpjWQQumzThWtvPrJXXvQ7A649HL5xTsc4i22ghKlFBDy4GefLijIR_ZZFK_PKyACCl_FVUWS3s7Bt"
                    alt="Sophia Clark avatar"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold">Sophia Clark</p>
                      <p className="text-xs text-black/50 dark:text-white/50">2 hours ago</p>
                    </div>
                    <p className="text-base text-black/80 dark:text-white/80">
                      I saw a dog that looks like Max near the grocery store on Oak Avenue this morning...
                    </p>
                  </div>
                </div>

                {/* Comment 2 */}
                <div className="flex items-start gap-4">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTBtvxelHVHAMbrAsJg7ocKZuVvm-XFX5LnrKAmWrkE6_ssI721TRo3m6jTbHsexbml69SBxyb-3FSfUPqmta3kr9aEM2Mjqm7zhoxQ4Kz-zs79kVmCf9HxMn2xlWu-JYfUnThpuzZc_FMA7IIMb83uS9pIjNHwVr_3kBE77-FlnkAOmuoyBcrEc69ewuhSM0KSOArs9EXiwRTll3Z8F0SUbAGbPB2Bq8zHMcN0vosx652lJpN0HUerNt-5aBBoUpBm4hYfjETAZob"
                    alt="Ethan Carter avatar"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold">Ethan Carter</p>
                      <p className="text-xs text-black/50 dark:text-white/50">3 hours ago</p>
                    </div>
                    <p className="text-base text-black/80 dark:text-white/80">
                      I'm in the area and will keep an eye out...
                    </p>
                  </div>
                </div>
              </div>

              {/* Add Comment Form */}
              <div className="mt-8">
                <form className="flex items-start gap-4">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvGxyodEDNROExQ8_zIN3-WwzXoF7JuvC9Qv5rPuRv9OY73ZeQzGdjOZFwSA1Y6rSSMDSCbAW1i1TAs7bmvdgu6g73qSIL3lXRhxH-uwreXetdP2kkDSPTynCjDW8F6KuXm1TQFE7V0Mfm3vsi8p1G3K9JiEG75DihGv4BoEc4fH1fi5ODmac0IQuHFqV6SQhNV9lJSgSbj6Kl5ZBZ3OgOgpy_6K3ToSLxwBSYDn5AXpcKDdfn5FM9naLRvrMmVfdKFouYqcj4NzyD"
                    alt="Current user avatar"
                  />
                  <div className="flex-1">
                    <textarea
                      placeholder="Add a comment..."
                      rows={3}
                      className="form-textarea w-full rounded-lg border-primary/20 dark:border-primary/30 bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-base text-black dark:text-white placeholder-black/40 dark:placeholder-white/40"
                    ></textarea>
                    <div className="mt-2 flex justify-end">
                      <button
                        type="submit"
                        className="bg-primary text-black font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Post Comment
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
}
