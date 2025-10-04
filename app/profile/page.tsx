import ProfileLayout from "@/components/ProfileLayout";

export default function ProfilePage() {
  return (
    <ProfileLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile & Settings</h1>

        {/* Profile Header */}
        <div className="mt-8 flex items-center gap-6">
          <div
            className="w-32 h-32 bg-center bg-no-repeat bg-cover rounded-full"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/...")' }}
          ></div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sophia Clark</h2>
            <p className="text-gray-500 dark:text-gray-400">Joined in 2022</p>
          </div>
        </div>


        {/* Form */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Personal Information</h3>
          <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue="Sophia Clark"
                className="mt-1 block w-full rounded border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue="sophia.clark@example.com"
                className="mt-1 block w-full rounded border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                defaultValue="+1 (555) 123-4567"
                className="mt-1 block w-full rounded border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
          </div>
        </div>


        {/* Buttons */}
        <div className="mt-8 pt-5 flex justify-end gap-3">
          <button className="rounded bg-background-light dark:bg-background-dark py-2 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
            Cancel
          </button>
          <button className="rounded bg-primary py-2 px-4 text-sm font-bold text-white shadow-sm hover:bg-primary/70">
            Save Changes
          </button>
        </div>
      </div>
    </ProfileLayout>
  );
}
