import Searchbar from "@/components/Searchbar"
import { Card } from "@/components/Card"
import recentPosts from "@/lib/data"
const page = () => {
  return (
    <div>
      <div className="w-2/3 mx-auto pt-10">
        <Searchbar />
        <div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground">Recent Posts</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <Card
                key={post.id}
                title={post.title}
                location={post.location}
                timeAgo={post.timeAgo}
                imageUrl={post.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default page