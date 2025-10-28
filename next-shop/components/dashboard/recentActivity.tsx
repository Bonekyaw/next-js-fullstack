function RecentActivity() {
  // This component loads immediately (no suspense)
  const activities = [
    { id: 1, action: "User login", time: "2 minutes ago" },
    { id: 2, action: "Order placed", time: "5 minutes ago" },
    { id: 3, action: "Profile updated", time: "10 minutes ago" },
    { id: 4, action: "Payment received", time: "15 minutes ago" },
  ];

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Recent Activity
      </h3>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 border-b border-gray-100 py-3 last:border-b-0"
          >
            <div className="mt-2 h-2 w-2 rounded-full bg-blue-500"></div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">
                {activity.action}
              </div>
              <div className="text-xs text-gray-500">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;
