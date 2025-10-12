"use client";
import { useState } from "react";
import Image from "next/image";

export default function AddCommentForm({
  postId,
  currentUserId,
}: {
  postId: string;
  currentUserId: string;
}) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!comment.trim()) return;

    setLoading(true);

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        post_id: postId,
        comment_owner: currentUserId,
        comment,
      }),
    });

    let noti = await fetch("/api/notification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        post_id: postId,
        message: `New comment on your post: "${comment}"`,
      }),
    });

    console.log("Noti", noti)

    if (res.ok) {
      setComment("");
      // Refresh comments (simplest: reload the page)
      window.location.reload();
    } else {
      alert("Failed to post comment");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-start gap-4">
      <Image
        src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"
        alt="Current user avatar"
        width={40}
        height={40}
        className="rounded-full"
        unoptimized
      />
      <div className="flex-1">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          rows={3}
          className="form-textarea w-full rounded-lg border-primary/20 dark:border-primary/30 p-4 bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-base text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 shadow-sm focus:shadow-md transition-shadow duration-200"
        ></textarea>
        <div className="mt-2 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity"
          >
            {loading ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </div>
    </form>
  );
}
