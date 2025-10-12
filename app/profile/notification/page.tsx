"use client";
import ProfileLayout from "@/components/ProfileLayout"
import { useEffect, useState } from "react";

export default function NotificationPage() {

  type Notification = {
    message: string;
    created_at?: string; // add createdAt property, optional if not always present
    // add other properties if needed
  };

  const [notifications, setNotifications] = useState<Notification[]>([]);

  async function fetchNotifications() {
    const res = await fetch("/api/notification")
    const data = await res.json()
    setNotifications(data)
  }

  useEffect(() => {
    fetchNotifications()
  }, []);


  return (
    <ProfileLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Notifications
        </h1>


        {/* Notification List */}
        <div className="mt-8 space-y-4">
          {notifications.length > 0 && (
            <div className="flex items-start gap-4 p-4 border rounded-lg bg-background-light dark:bg-background-dark border-gray-200 dark:border-gray-700 hover:bg-primary/5 transition">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-primary/20 text-primary">
                <span className="material-symbols-outlined">comment</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white font-medium">
                  {notifications[0]?.message || "You have a new notification"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {notifications[0]?.created_at ? new Date(notifications[0].created_at).toLocaleString() : ''}
                </p>
              </div>
            </div>
          )}
          {/* ตัวอย่างแจ้งเตือน 1 */}
          {/* <div className="flex items-start gap-4 p-4 border rounded-lg bg-background-light dark:bg-background-dark border-gray-200 dark:border-gray-700 hover:bg-primary/5 transition">
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-primary/20 text-primary">
              <span className="material-symbols-outlined">notifications</span>
            </div>
            <div className="flex-1">
              <p className="text-gray-900 dark:text-white font-medium">
                New stray reported near your area
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                10 minutes ago
              </p>
            </div>
          </div> */}

          {/* ตัวอย่างแจ้งเตือน 2 */}
          {/* <div className="flex items-start gap-4 p-4 border rounded-lg bg-background-light dark:bg-background-dark border-gray-200 dark:border-gray-700 hover:bg-primary/5 transition">
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-primary/20 text-primary">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
            <div className="flex-1">
              <p className="text-gray-900 dark:text-white font-medium">
                Your post “Lost Dog near Central Park” was approved
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                2 hours ago
              </p>
            </div>
          </div> */}

          {/* ตัวอย่างแจ้งเตือน 3 */}
          {/* <div className="flex items-start gap-4 p-4 border rounded-lg bg-background-light dark:bg-background-dark border-gray-200 dark:border-gray-700 hover:bg-primary/5 transition">
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-primary/20 text-primary">
              <span className="material-symbols-outlined">comment</span>
            </div>
            <div className="flex-1">
              <p className="text-gray-900 dark:text-white font-medium">
                Someone commented on your post “Found Puppy in Market”
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Yesterday
              </p>
            </div>
          </div> */}
        </div>

        {/* ปุ่มจัดการ */}
        <div className="mt-8 pt-5 flex justify-end gap-3">
          <button className="rounded bg-background-light dark:bg-background-dark py-2 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
            Mark All as Read
          </button>
          <button className="rounded bg-primary py-2 px-4 text-sm font-bold text-white shadow-sm hover:bg-primary/70">
            Clear All
          </button>
        </div>
      </div>
    </ProfileLayout>
  )
}