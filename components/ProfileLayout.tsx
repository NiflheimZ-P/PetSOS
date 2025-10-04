import { ReactNode } from "react";
import Link from "next/link";

interface ProfileLayoutProps {
  children: ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
      <aside className="w-64 bg-background-light dark:bg-background-dark p-4 hidden lg:block">
        <div className="flex flex-col h-full">
          <div className="flex-grow">
            <nav className="flex flex-col space-y-2">
            <Link
              href="/profile"
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/2">
              Profile
            </Link>
            <Link
              href="/profile/recent_posts"
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/2">
              My Recent Posts
            </Link>
            <Link
              href="/profile/notification"
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/2"
            >
              Notifications
            </Link>
            </nav>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 lg:p-10">{children}</main>
    </div>
  );
}
