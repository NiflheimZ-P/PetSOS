"use client";

import { useState } from "react";

interface EditStatusProps {
  postId: string;
  currentStatus: string | null;
  isOwner: boolean;
}

export default function EditStatus({
  postId,
  currentStatus,
  isOwner,
}: EditStatusProps) {
  const [status, setStatus] = useState(currentStatus ?? "Lost");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch(`/api/animal_details/${postId}/update-status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });


      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to update status");

      setMessage("Status updated");
    } catch (err: any) {
      console.error(err);
      setMessage(`${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOwner) {
    // Read-only
    return (
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mt-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
        <p className="text-base font-semibold mt-1 capitalize">
          {status || "Lost"}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-primary/10 rounded-lg mt-4 space-y-3">
      <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
        Status
      </label>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full border border-primary/30 rounded-md p-2 bg-background-light dark:bg-background-dark text-black dark:text-white focus:ring-2 focus:ring-primary focus:outline-none"
      >
        <option value="Lost">Lost</option>
        <option value="Found">Found</option>
        <option value="Resolved">Resolved</option>
      </select>

      <button
        onClick={handleUpdate}
        disabled={isLoading}
        className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 disabled:opacity-50"
      >
        {isLoading ? "Updating..." : "Update Status"}
      </button>

      {message && (
        <p
          className={`text-sm mt-2 ${
            message.startsWith("✅") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
