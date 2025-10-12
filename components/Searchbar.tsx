"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import Link from "next/link";

type Post = {
  post_id: string;
  post_owner: string;
  detail?: string;
  location?: string;
  owner?: {
    username?: string;
    first_name?: string;
    last_name?: string;
  };
};


const Searchbar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (query.trim().length === 0) {
        setResults([]);
        return;
      }

      const res = await fetch(`/api/posts/search?query=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data);
        setShowResults(true);
      }
    };

    const delay = setTimeout(fetchData, 300);
    return () => clearTimeout(delay);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="relative mb-12 w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <Input
            type="search"
            placeholder="Search by owner, detail, or location"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query && setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
            className="pl-10"
          />
        </div>
      </form>

      {/* Dropdown */}
      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-2 z-50 border border-gray-200 dark:border-gray-700">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {results.slice(0, 5).map((post) => (
              <li key={post.post_id}>
                <Link
                  href={`/animal_details/${post.post_id}`}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <div className="font-semibold">
                        {post.owner?.username ||
                        [post.owner?.first_name, post.owner?.last_name].filter(Boolean).join(" ") ||
                        "anon"}
                    </div>

                    <div className="text-sm text-muted-foreground truncate">
                        {post.location}: {post.detail}
                    </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
