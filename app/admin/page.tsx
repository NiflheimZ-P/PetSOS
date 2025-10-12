import prisma from '@/lib/prisma'
import AdminDashboardOverview from './dashboard/AdminDashboardOverview';



export default async function AdminDashboardPage() {
  const totalUsers = await prisma.user.count()
  const activePosts = await prisma.posts.count()

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark font-display">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col p-4 border-r border-primary/20 dark:border-primary/30 bg-background-light dark:bg-background-dark">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-black dark:text-white">Admin Panel</h1>
        </div>
        {/* Navigation */}
        <nav className="flex-grow">
          <ul className="space-y-2">
            <li>
              <a href="/admin" className="flex items-center gap-3 px-4 py-2 rounded-lg bg-primary/20 dark:bg-primary/30 text-black dark:text-white font-medium">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/admin/users" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 text-black/80 dark:text-white/80">
                Users
              </a>
            </li>
            <li>
              <a href="/admin/posts" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 text-black/80 dark:text-white/80">
                Posts
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8">
          <h2 className="text-4xl font-bold text-black dark:text-white">Dashboard</h2>
        </header>

        <AdminDashboardOverview
          totalUsers={totalUsers}
          activePosts={activePosts}
        />
      </main>
    </div>
  )
}

