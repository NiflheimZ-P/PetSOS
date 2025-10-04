import React from "react";

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark font-display">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col p-4 border-r border-primary/20 dark:border-primary/30 bg-background-light dark:bg-background-dark">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-black dark:text-white">Admin Panel</h1>
          <p className="text-sm text-black/60 dark:text-white/60">Stray Animal Platform</p>
        </div>

        <nav className="flex-grow">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2 rounded-lg bg-primary/20 dark:bg-primary/30 text-black dark:text-white font-medium"
              >
                <span className="material-symbols-outlined">dashboard</span>
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 text-black/80 dark:text-white/80"
              >
                <span className="material-symbols-outlined">group</span>
                Users
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 text-black/80 dark:text-white/80"
              >
                <span className="material-symbols-outlined">article</span>
                Posts
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 text-black/80 dark:text-white/80"
              >
                <span className="material-symbols-outlined">folder_managed</span>
                Case Management
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 text-black/80 dark:text-white/80"
              >
                <span className="material-symbols-outlined">settings</span>
                Settings
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 text-black/80 dark:text-white/80"
          >
            <span className="material-symbols-outlined">help_outline</span>
            Support
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8">
          <h2 className="text-4xl font-bold text-black dark:text-white">Dashboard</h2>
        </header>

        <section>
          <h3 className="text-2xl font-semibold mb-4 text-black dark:text-white">Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-background-light dark:bg-background-dark border border-primary/20 dark:border-primary/30 rounded-xl p-6 flex flex-col gap-2">
              <p className="text-base font-medium text-black/80 dark:text-white/80">Total Users</p>
              <p className="text-3xl font-bold text-black dark:text-white">1,234</p>
            </div>
            <div className="bg-background-light dark:bg-background-dark border border-primary/20 dark:border-primary/30 rounded-xl p-6 flex flex-col gap-2">
              <p className="text-base font-medium text-black/80 dark:text-white/80">Active Posts</p>
              <p className="text-3xl font-bold text-black dark:text-white">456</p>
            </div>
            <div className="bg-background-light dark:bg-background-dark border border-primary/20 dark:border-primary/30 rounded-xl p-6 flex flex-col gap-2">
              <p className="text-base font-medium text-black/80 dark:text-white/80">Resolved Cases</p>
              <p className="text-3xl font-bold text-black dark:text-white">321</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
