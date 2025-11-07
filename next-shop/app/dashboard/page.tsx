import { Suspense } from "react";
import Link from "next/link";
import UserProfile from "@/components/dashboard/userProfile";
import Statistics from "@/components/dashboard/statistics";
import RecentActivity from "@/components/dashboard/recentActivity";
import { refreshPostsCache } from "../actions/post";

export default function Dashboard() {
  return (
    <div className="mx-auto min-h-screen bg-white p-5">
      <h1 className="mb-2 text-3xl font-bold text-gray-900">Dashboard</h1>
      <Link href="/" className="text-blue-500 underline">
        Go Home
      </Link>
      {/* Creating a new post and revalidate */}
      <form action={refreshPostsCache}>
        <p>Create a new post and revalidate</p>
        <button
          type="submit"
          className="rounded-full bg-sky-400 px-6 py-2 text-white"
        >
          Refresh Posts Cache
        </button>
      </form>
      <p className="mb-8 text-gray-600">
        This page loads immediately while components stream in
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Component with Suspense - will stream in */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <Suspense fallback={<LoadingCard title="User Profile" />}>
            <UserProfile />
          </Suspense>
        </div>

        {/* Another Suspense boundary */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <Suspense fallback={<LoadingCard title="Statistics" />}>
            <Statistics />
          </Suspense>
        </div>

        {/* Regular component without suspense */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}

// Loading component for Suspense fallback
function LoadingCard({ title }: { title: string }) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-gray-900">{title}</h3>
      <div className="flex items-center gap-3 text-gray-600">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-blue-500"></div>
        <p>Loading {title}...</p>
      </div>
    </div>
  );
}
