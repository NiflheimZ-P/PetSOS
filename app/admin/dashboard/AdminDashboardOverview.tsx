'use client'

import { useState } from 'react'

export default function AdminDashboardOverview({ totalUsers, activePosts}: { totalUsers: number, activePosts: number }) {
  const [showUsers, setShowUsers] = useState(false)
  const [users, setUsers] = useState<any[]>([])

  const [showPosts, setShowPosts] = useState(false)
  const [posts, setPosts] = useState<any[]>([])


  const handleShowUsers = async () => {
    if (!showUsers) {
      const res = await fetch('/api/admin/users')
      const data = await res.json()
      setUsers(data)
    }
    setShowUsers(!showUsers)
  }

  const handleShowPosts = async () => {
    if (!showPosts) {
      const res = await fetch('/api/admin/posts')
      const data = await res.json()
      setPosts(data)
    }
    setShowPosts(!showPosts)
  }

  return (
    <section>
      <h3 className="text-2xl font-semibold mb-4 text-black dark:text-white">Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
        <div
          onClick={handleShowUsers}
          className="cursor-pointer bg-background-light dark:bg-background-dark border border-primary/20 dark:border-primary/30 rounded-xl p-6 flex flex-col gap-2"
        >
          <p className="text-base font-medium text-black/80 dark:text-white/80">Total Users</p>
          <p className="text-3xl font-bold text-black dark:text-white">{totalUsers}</p>
        </div>
        <div
          onClick={handleShowPosts}
          className="cursor-pointer bg-background-light dark:bg-background-dark border border-primary/20 dark:border-primary/30 rounded-xl p-6 flex flex-col gap-2"
        >
          <p className="text-base font-medium text-black/80 dark:text-white/80">Active Posts</p>
          <p className="text-3xl font-bold text-black dark:text-white">{activePosts}</p>
        </div>
      </div>

      {showUsers && (
        <div className="mt-4 bg-background-light dark:bg-background-dark p-4 rounded-xl border border-primary/20 dark:border-primary/30">
          <h4 className="text-xl font-semibold mb-2 text-black dark:text-white">User List</h4>
          <ul>
            {users.map(user => (
              <li key={user.id} className="text-black dark:text-white/80">
                {user.username || '(No username)'} - {user.email}
              </li>
            ))}
          </ul>
        </div>
      )}

      {showPosts && (
        <div className="mt-4 bg-background-light dark:bg-background-dark p-4 rounded-xl border border-primary/20 dark:border-primary/30">
          <h4 className="text-xl font-semibold mb-2 text-black dark:text-white">Post List</h4>
          <ul>
            {posts.map(post => (
              <li key={post.post_id} className="text-black dark:text-white/80">
                {post.detail} - {new Date(post.created_at).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      )}

    </section>
  )
}