import prisma from '@/lib/prisma'

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    select: { id: true, username: true, email: true },
  })

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
              <a href="/admin" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 text-black dark:text-white font-medium">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/admin/users" className="flex items-center gap-3 px-4 py-2 rounded-lg bg-primary/20 dark:bg-primary/30 text-black dark:text-white font-medium">
                Users
              </a>
            </li>
            <li>
              <a href="/admin/posts" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 text-black dark:text-white font-medium">
                Posts
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">
          Users List
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-primary/20 dark:border-primary/30 rounded-xl">
            <thead>
              <tr className="bg-primary/10 dark:bg-primary/20">
                <th className="border border-primary/20 dark:border-primary/30 px-4 py-2 text-left">ID</th>
                <th className="border border-primary/20 dark:border-primary/30 px-4 py-2 text-left">Username</th>
                <th className="border border-primary/20 dark:border-primary/30 px-4 py-2 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="hover:bg-primary/5 dark:hover:bg-primary/10">
                  <td className="border border-primary/20 dark:border-primary/30 px-4 py-2 text-black dark:text-white/80">{user.id}</td>
                  <td className="border border-primary/20 dark:border-primary/30 px-4 py-2 text-black dark:text-white/80">{user.username || '(No username)'}</td>
                  <td className="border border-primary/20 dark:border-primary/30 px-4 py-2 text-black dark:text-white/80">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
