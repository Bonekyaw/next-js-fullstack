async function UserProfile() {
  // Simulate slow data fetching
  const userData = await fetchUserData();

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-gray-900">User Profile</h3>
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-2xl font-bold text-white">
          {userData.name.charAt(0)}
        </div>
        <div className="flex-1">
          <h4 className="mb-1 text-base font-semibold text-gray-900">
            {userData.name}
          </h4>
          <p className="mb-1 text-sm text-gray-600">{userData.email}</p>
          <p className="text-xs text-gray-500">{userData.role}</p>
        </div>
      </div>
    </div>
  );
}

// Simulate slow API call
async function fetchUserData() {
  console.log("Fetching user data...");
  await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 second delay
  //   await fetch("https://api.restful-api.dev/objects/7", {
  //     cache: "no-store",
  //   });

  return {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Administrator",
    joinDate: "2024-01-15",
  };
}

export default UserProfile;
