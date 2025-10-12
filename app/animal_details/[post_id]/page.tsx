import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link"
import AddCommentForm from "./AddCommentForm";
import ContactReporter from "@/components/Post/ContactReporter";
import EditStatus from "@/components/Post/EditStatus";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// map
import MapWrapper from "./MapWrapper";

interface PageProps {
  params: { post_id: string };
}

export default async function LostPetDetails({
  params,
}: {
  params: Promise<{ post_id: string }>;
}) {
  const { post_id } = await params;

  const post = await prisma.posts.findUnique({
    where: { post_id },
    include: {
      owner: true,
      comments: {
        include: { owner: true },
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

const session = await getServerSession(authOptions);
const currentUserId = session?.user?.id ?? "";

  const ownerName =
    [post.owner?.first_name, post.owner?.last_name].filter(Boolean).join(" ") ||
    post.owner?.username ||
    "Unknown User";
  const ownerEmail = post.owner?.email || "No email provided";
  const isOwner = currentUserId === post.owner.id;

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-black dark:text-white">
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex-1 px-10 py-8 md:px-20 lg:px-40">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm font-medium mb-6">
              <Link href="/" className="text-primary hover:underline">
                Lost Pets
              </Link>
              <span className="text-black/40 dark:text-white/40">/</span>
              <span className="text-black dark:text-white">
                {post.detail?.slice(0, 30) || "Post"}
              </span>
            </div>

            {/* Main Content */}
            <div className="flex flex-col items-center gap-8">
              {/* Image */}
              <div className="mb-6 rounded-2xl overflow-hidden shadow-lg max-w-[600px] w-full">
                <div className="relative w-full h-[400px]">
                  <Image
                    src={post.image_url || "/no-img.png"}
                    alt={post.detail || "Post image"}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="w-full">
                <h1 className="text-3xl font-bold mb-2">
                  {post.detail || "Untitled Post"}
                </h1>

                {/* Editable status */}
                <EditStatus postId={post.post_id} currentStatus={post.status} isOwner={isOwner} />

                {/* Contact Reporter */}
                <ContactReporter name={ownerName} email={ownerEmail} />
              </div>
              
<div className="mt-6">
  <label className="block text-lg font-medium mb-2 text-gray-900 dark:text-white">
    Location
  </label>

  {/* Full-width map container */}
  <div className="-mx-10 md:-mx-80 lg:-mx-100 ">
    <div className="w-full h-80">
      {post.lat && post.lng ? (
        <MapWrapper lat={post.lat} lng={post.lng} />
      ) : (
        <p className="text-sm text-gray-500 px-10 md:px-20 lg:px-40">
          No location
        </p>
      )}
    </div>
  </div>
</div>



            </div>

            {/* Comments Section */}
            <div className="mt-12 pt-8 border-t border-primary/20 dark:border-primary/30">
              <h2 className="text-2xl font-bold mb-6">
                Comments ({post.comments.length})
              </h2>

              <div className="mt-8">
                <AddCommentForm postId={post_id} currentUserId={currentUserId} />
              </div>

              <div className="space-y-6">
                {post.comments.map((c) => (
                  <div key={c.comment_id} className="flex items-start gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold">
                          {c.owner?.username ||
                            [c.owner?.first_name, c.owner?.last_name]
                              .filter(Boolean)
                              .join(" ") ||
                            "Unknown User"}
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
