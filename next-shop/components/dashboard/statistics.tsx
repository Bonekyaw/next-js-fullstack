async function Statistics() {
  // Simulate even slower data fetching
  const stats = await fetchStatistics();

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Statistics</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-gray-50 p-4 text-center">
          <div className="mb-1 text-xl font-bold text-blue-500">
            {stats.users}
          </div>
          <div className="text-xs tracking-wide text-gray-600 uppercase">
            Users
          </div>
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-center">
          <div className="mb-1 text-xl font-bold text-blue-500">
            {stats.orders}
          </div>
          <div className="text-xs tracking-wide text-gray-600 uppercase">
            Orders
          </div>
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-center">
          <div className="mb-1 text-xl font-bold text-blue-500">
            {stats.revenue}
          </div>
          <div className="text-xs tracking-wide text-gray-600 uppercase">
            Revenue
          </div>
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-center">
          <div className="mb-1 text-xl font-bold text-blue-500">
            {stats.growth}%
          </div>
          <div className="text-xs tracking-wide text-gray-600 uppercase">
            Growth
          </div>
        </div>
      </div>
    </div>
  );
}

// Simulate slow API call with 5 second delay
async function fetchStatistics() {
  console.log("Fetching statistics...");
  await new Promise((resolve) => setTimeout(resolve, 5000)); // 5 second delay
  //   await fetch("https://api.restful-api.dev/objects", {
  //     cache: "no-store",
  //   });

  return {
    users: "1,234",
    orders: "567",
    revenue: "$12,345",
    growth: "23.4",
  };
}

export default Statistics;
