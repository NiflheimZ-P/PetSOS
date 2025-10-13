"use client"
import React from 'react';
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>

// คุณควรตั้งค่า Tailwind config ในไฟล์ tailwind.config.js ของ Next.js
// แต่เพื่อให้โค้ดนี้ทำงานได้ ฉันจะใช้คลาส Tailwind ตามที่คุณกำหนด

// หากคุณใช้ Next.js App Router (มาตรฐานปัจจุบัน) ไฟล์นี้คือ page.tsx
import dynamic from "next/dynamic";
import { useSession } from 'next-auth/react'
import type { LeafletMapProps } from "./LeafletMap";


const LeafletMap = dynamic<LeafletMapProps>(
  () => import("./LeafletMap"),
  { ssr: false }
);

import { useState, useRef, useEffect } from "react";

type Post = {
  id: number;
  title: string;
  status: string;
  detail?: string;
};

export default function CreatePostPage() {
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const { data: session, status } = useSession()
  let owner_id: string;

  async function myPost() {
    if (session) {
      owner_id = session.user.id;
      const res = await fetch(`/api/posts?post_owner=${encodeURIComponent(owner_id)}`, {
        method: 'GET',
        // ห้ามใส่ body!
        cache: 'no-store', // ถ้าอยากกัน cache ขณะ dev
      });
      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();
      setPosts(data);
    }
  }


  useEffect(() => {
    myPost()
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    // สร้าง URL สำหรับพรีวิว
    const nextUrl = URL.createObjectURL(file);
    // เคลียร์ของเก่าป้องกัน memory leak
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(nextUrl);
  }

  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;

    try {
      const formData = new FormData(formRef.current);
      // inject ค่าจากแผนที่
      if (lat !== null) formData.set("lat", String(lat));
      if (lng !== null) formData.set("lng", String(lng));

      // ส่ง formData ตรงๆ (อย่าตั้ง Content-Type เอง)
      const res = await fetch("/api/posts", { method: "POST", body: formData });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(`Save failed: ${err?.error || res.statusText}`);
        return;
      }

      const data = await res.json();
      // alert("Saved! id = " + data.post_id);
      formRef.current.reset();
      await myPost()
    } catch (error) {
      alert("Error: " + (error as Error).message);
    }
  }

  // จำลองข้อมูลสำหรับรูปภาพและตาราง
  const recentPosts = [
    { title: "Lost Dog near Sukhumvit", status: "Searching", statusColor: "text-primary-darker", bgColor: "bg-primary/20" },
    { title: "Found Cat in Silom", status: "Found", statusColor: "text-blue-800 dark:text-blue-300", bgColor: "bg-blue-500/20" },
    { title: "Stray Puppy in Chatuchak", status: "Rehomed", statusColor: "text-green-800 dark:text-green-300", bgColor: "bg-green-500/20" },
  ];

  return (
    // Body Wrapper
    <div className="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
      <div className="flex min-h-screen">

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          
          {/* Header */}

          
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-8">
            <div className="max-w-4xl mx-auto">
              {/* Form Section: Create New Post */}
              <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Create a New Post</h2>
              <div className="space-y-8">
                <form ref={formRef} onSubmit={onSubmit}>

                  {/* Upload Photos */}
                  <div>
                    <p className="block text-lg font-medium mb-2 text-gray-900 dark:text-white">
                      Upload Photo
                    </p>

                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="image"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF, WEBP (max 10MB)</p>
                        </div>
                        {/* สำคัญ: ต้องมี name="image" เพื่อให้ API รับไฟล์ได้ */}
                        <input
                          id="image"
                          name="image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                          ref={fileRef}
                        />
                      </label>
                    </div>

                    {/* Preview */}
                    {previewUrl && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600 dark:text-gray-300">Preview</span>
                          <button
                            type="button"
                            className="text-sm text-red-600 hover:underline"
                            onClick={() => {
                              if (previewUrl) URL.revokeObjectURL(previewUrl);
                              setPreviewUrl(null);
                              if (fileRef.current) fileRef.current.value = "";
                            }}
                          >
                            Remove
                          </button>
                        </div>
                        <div className="w-full h-full overflow-hidden rounded-lg border flex justify-center">
                          <img
                            src={previewUrl}
                            alt="preview"
                            className="w-100 h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  
                  {/* Detail Textarea */}
                  <div>
                    <label className="block text-lg font-medium mb-2 text-gray-900 dark:text-white" htmlFor="detail">Detail</label>
                    <textarea 
                      className="w-full p-4 rounded-lg bg-background-light dark:bg-background-dark border border-primary/20 dark:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50" 
                      id="detail" 
                      name="detail"
                      placeholder="Describe the animal, where it was last seen, and any other relevant details like collar, tags, or behavior." 
                      rows={6}
                    ></textarea>
                  </div>
                  
                  {/* Location Input and Map */}
                  <div>
                    <label className="block text-lg font-medium mb-2 text-gray-900 dark:text-white" htmlFor="location">Location</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">  </span>
                    </div>
                    <div className="mt-4 w-full h-80">
                      <LeafletMap
                        onSelect={({ lat, lng }) => {
                          setLat(lat);
                          setLng(lng);
                        }}
                        // defaultCenter={{ lat: 13.7563, lng: 100.5018 }} // ปรับค่าเริ่มต้นได้
                      />
                    </div>
                  </div>
                  
                  {/* Post Button */}
                  <div className="flex justify-end pt-4">
                    <button type='submit' className="px-8 py-3 rounded-lg bg-blue-700 text-white font-bold text-lg hover:opacity-90 transition-opacity">Post</button>
                  </div>
                </form>
                
              </div>

              {/* Table Section: My Recent Posts */}
              <div className="mt-16">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">My Recent Posts</h2>
                <div className="bg-background-light dark:bg-background-dark rounded-xl border border-primary/20 dark:border-primary/30 overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="border-b border-primary/20 dark:border-primary/30">
                      <tr>
                        <th className="p-4 text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">Title</th>
                        <th className="p-4 text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">Status</th>
                        <th className="p-4 text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map((post, index) => (
                        <tr key={index} className={index < posts.length - 1 ? "border-b border-primary/10 dark:border-primary/20" : ""}>
                          <td className="p-4 font-medium text-gray-800 dark:text-gray-200">{post.detail}</td>
                          <td className="p-4">
                            <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full`}>{post.status}</span>
                          </td>
                          <td className="p-4 text-right">
                            <a className="font-bold text-primary hover:underline" href="#">Update Status</a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
            </div>
          </main>
          
        </div>
      </div>
    </div>
  );
}
