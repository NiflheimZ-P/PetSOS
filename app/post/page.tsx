import React from 'react';
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>

// คุณควรตั้งค่า Tailwind config ในไฟล์ tailwind.config.js ของ Next.js
// แต่เพื่อให้โค้ดนี้ทำงานได้ ฉันจะใช้คลาส Tailwind ตามที่คุณกำหนด

// หากคุณใช้ Next.js App Router (มาตรฐานปัจจุบัน) ไฟล์นี้คือ page.tsx

export default function CreatePostPage() {


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
        
        {/* Sidebar (Aside) */}
        <aside className="w-64 flex-shrink-0 bg-background-light dark:bg-background-dark p-6 border-r border-primary/20 dark:border-primary/30">
          
          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            <a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/20 dark:bg-primary/30 text-primary font-bold" href="#">
              <span className="material-symbols-outlined"> add_circle </span>
              <span>New Post</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20" href="#">
              <span className="material-symbols-outlined"> description </span>
              <span>My Posts</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20" href="#">
              <span className="material-symbols-outlined"> bookmark </span>
              <span>Saved Posts</span>
            </a>
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          
          {/* Header */}

          
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-8">
            <div className="max-w-4xl mx-auto">
              
              {/* Form Section: Create New Post */}
              <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Create a New Post</h2>
              <div className="space-y-8">
                
                {/* Title Input */}
                <div>
                  <label className="block text-lg font-medium mb-2 text-gray-900 dark:text-white" htmlFor="title">Title</label>
                  <input 
                    className="w-full p-4 rounded-lg bg-background-light dark:bg-background-dark border border-primary/20 dark:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50" 
                    id="title" 
                    placeholder="e.g., Lost Golden Retriever in Central Park" 
                    type="text" 
                  />
                </div>
                
                {/* Upload Photos Grid */}
                <div>
                  <p className="block text-lg font-medium mb-2 text-gray-900 dark:text-white">Upload Photos</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 row-span-2 rounded-lg overflow-hidden">
                      <div className="w-full h-full bg-center bg-no-repeat bg-cover aspect-square" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuA7PFHgR9Bl4yW1vDyMNb2gCVnObFS05MZgxRWczBwrKdJZCPUviwsgoSN4AmMkPvYg72Ap52BFseNU0B5C1esjIszxKZMUwrn-4RPbSA1b9DOzmgZ4fu-ETZOE9P5XB_IiCewF2qhkZPmtwWI1tzqBuqYZNii1T6AzbL_RSppof4XKqpCwRpoI_3POKZHv8uZKVK4LAZ8g3YFJn0LvOmv5RKS0-izbgR2EfjdxCwKpQP_JcKpKruoO2mVOEMUdIh1zK7FmkAmNtQWe")` }}></div>
                    </div>
                    <div className="rounded-lg overflow-hidden">
                      <div className="w-full h-full bg-center bg-no-repeat bg-cover aspect-square" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuB9OGZfZFgQRjZwCqSVC2uI4wc3vAfpjxV6WksS3ZhzCmt1mcDlUtfcCWOLe97icEw60g2Gr3OWHM8ljIWkAK4ifpNSWe_TJiwSmZ_nB1XYWsnYglKErCeZoKgopgpdOMNaQIgrsVbY3c0n03HlsvaJ8kijuAYLOPMbUYAwFIkhE8ML-BhJ8_RuadyBlTM6gwJruIe_KEKh3eEdvK1rDLmFYBr61F_w6s8sMFiOqLPxTbIGCsXXTsUkQNghoOJYXYtlvcr3TtvtjQzJ")` }}></div>
                    </div>
                    <div className="rounded-lg overflow-hidden">
                      <div className="w-full h-full bg-center bg-no-repeat bg-cover aspect-square" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBWz8r1iSu6zOVU0JW57wDN0WJLx2X21FXAbBoK_qbaZNVvhjFdbpI2BTblpudnr25L0pen_ixpXhCzezRAVPiBv99D8vlw-57osAkZbFltPMTNOEjxU_9AtPyDAdwa073WDK41U4osO2H0f7yqnALix61UyGbWduEU5PSxi8qQrJ-Y0ApwcUjOaAVItZytaA-VkM9gX5qRDMxH-7JfRGD82qJG3u0kGlZ0ReZ3cCM5fd2Gi3p2AuRNqT22G2VIM2pc4_UCcG9phj3I")` }}></div>
                    </div>
                  </div>
                </div>
                
                {/* Description Textarea */}
                <div>
                  <label className="block text-lg font-medium mb-2 text-gray-900 dark:text-white" htmlFor="description">Description</label>
                  <textarea 
                    className="w-full p-4 rounded-lg bg-background-light dark:bg-background-dark border border-primary/20 dark:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50" 
                    id="description" 
                    placeholder="Describe the animal, where it was last seen, and any other relevant details like collar, tags, or behavior." 
                    rows={6}
                  ></textarea>
                </div>
                
                {/* Location Input and Map */}
                <div>
                  <label className="block text-lg font-medium mb-2 text-gray-900 dark:text-white" htmlFor="location">Location</label>
                  <div className="relative">
                    <input 
                      className="w-full p-4 pl-12 rounded-lg bg-background-light dark:bg-background-dark border border-primary/20 dark:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50" 
                      id="location" 
                      placeholder="Enter last known location or drop a pin on the map" 
                      type="text" 
                    />
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">  </span>
                  </div>
                  <div className="mt-4 w-full h-80 bg-center bg-no-repeat bg-cover rounded-xl" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCShNP8sJXrFWsxh5N-oDQZYZp9uZAu9stsZ9AzJxHeKTJnMFi2xS8jalfhURJL5uB7cKI23DdEmBnaCg_eiuMw8uExl-ExisTCkJyDs7HR3qfRvlTeRT1cLLgknn8fJVYdyqi37McIxj6_U0QzEP3gqL2EkK3pyfJoaNExVdCkYeK-6ZkLYaOa4SBcLc2n-8kd0ujLAbwK6kLaqwhI4LtDU5HOHO0GixYSLgl2JEPwx-b-8yqXTfcWKdKAbTJcPy8ug1IXtl6eRHoY")` }}></div>
                </div>
                
                {/* Post Button */}
                <div className="flex justify-end pt-4">
                  <button className="px-8 py-3 rounded-lg bg-primary text-black font-bold text-lg hover:opacity-90 transition-opacity">Post</button>
                </div>
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
                      {recentPosts.map((post, index) => (
                        <tr key={index} className={index < recentPosts.length - 1 ? "border-b border-primary/10 dark:border-primary/20" : ""}>
                          <td className="p-4 font-medium text-gray-800 dark:text-gray-200">{post.title}</td>
                          <td className="p-4">
                            <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${post.bgColor} ${post.statusColor}`}>{post.status}</span>
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
