import { useState } from "react";

export default function DashboardFooter() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="fixed bottom-0 w-full flex justify-around z-20 py-2">
      {/* Search */}
      <div
        onClick={() => setActiveTab("search")}
        className={`flex flex-col items-center justify-center space-y-1 w-1/2 hover:opacity-80 transition cursor-pointer ${
          activeTab === "search"
            ? "border-t-2 border-white"
            : "border-t-2 border-transparent"
        }`}
      >
        <img
          src="./src/assets/Pictures/SearchIcon.svg"
          alt="Search Icon"
          className="w-6 h-6 invert"
        />
        <span className="text-xs text-gray-300">Search</span>
      </div>

      {/* Home */}
      <div
        onClick={() => setActiveTab("home")}
        className={`flex flex-col items-center justify-center space-y-1 w-1/2 hover:opacity-80 transition cursor-pointer ${
          activeTab === "home"
            ? "border-t-2 border-white"
            : "border-t-2 border-transparent"
        }`}
      >
        <img
          src="./src/assets/Pictures/HomeIcon.svg"
          alt="Home Icon"
          className="w-7 h-7 invert"
        />
        <span className="text-xs text-gray-300">Home</span>
      </div>
    </div>
  );
}
