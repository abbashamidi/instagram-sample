export default function DashboardProfile() {
  return (
    <div className="w-full flex flex-col items-center py-4 space-y-3">
      {/* Profile Section */}
      <div className="w-full flex items-center justify-around">
        {/* Profile Picture Wrapper */}
        <div className="relative w-20 h-20 rounded-full flex items-center justify-center border-2 border-gray-500">
          <img
            src="./src/assets/Pictures/ProfileIcon.svg"
            alt="Profile Icon"
            className="w-full h-full rounded-full bg-white object-cover"
          />

          {/* Upload Button */}
          <button
            className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-blue-600 border border-black flex items-center justify-center hover:bg-pink-500 transition"
            title="Upload Profile Picture"
          >
            <img
              src="./src/assets/Pictures/PlusIcon.svg"
              alt="Upload"
              className="w-full h-full invert"
            />
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-6 text-center">
          <div className="flex flex-col">
            <span className="text-lg font-bold">0</span>
            <span className="text-sm text-gray-400">Posts</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold">0</span>
            <span className="text-sm text-gray-400">Followers</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold">0</span>
            <span className="text-sm text-gray-400">Following</span>
          </div>
        </div>
      </div>

    </div>
  );
}
