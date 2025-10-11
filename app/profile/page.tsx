"use client";

import ProfileLayout from "@/components/ProfileLayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // fetch user profile
    useEffect(() => {
      const loadProfile = async () => {
        try {
          const res = await fetch("/api/profile");

          if (!res.ok) {
            throw new Error("Failed to fetch profile");
          }

          const data: User = await res.json();
          setUser(data);
        } catch (error) {
          console.error(error);
          setUser(null);
        } finally {
          setLoading(false);
        }
      };

      loadProfile();
    }, []);

  // handle save button
  const handleSave = async () => {
    if (!user) return;

    const updatedUser = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    };

    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });

    if (res.ok) {
      // redirect หลัง save
      router.push("/");
    } else {
      alert("Failed to update profile");
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return (
      <ProfileLayout>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile & Settings</h1>
          <p className="mt-6 text-gray-600 dark:text-gray-300">We couldn&apos;t load your profile right now.</p>
        </div>
      </ProfileLayout>
    );
  }

  return (
    <ProfileLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile & Settings</h1>

        <div className="mt-8 flex items-center gap-6">
          <div
            className="w-32 h-32 bg-center bg-no-repeat bg-cover rounded-full"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/...")' }}
          ></div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.first_name} {user.last_name}</h2>
            <p className="text-gray-500 dark:text-gray-400">Joined in 2022</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Personal Information</h3>
          <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
              <input
                type="text"
                id="first_name"
                value={user.first_name}
                onChange={(e) => setUser({ ...user, first_name: e.target.value })}
                className="mt-1 block w-full rounded border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
              <input
                type="text"
                id="last_name"
                value={user.last_name}
                onChange={(e) => setUser({ ...user, last_name: e.target.value })}
                className="mt-1 block w-full rounded border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="mt-1 block w-full rounded border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-5 flex justify-end gap-3">
          <button
            className="rounded bg-background-light dark:bg-background-dark py-2 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
            onClick={() => router.push("/")}
          >
            Cancel
          </button>
          <button
            className="rounded bg-primary py-2 px-4 text-sm font-bold text-white shadow-sm hover:bg-primary/70"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </ProfileLayout>
  );
}
