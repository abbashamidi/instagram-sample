import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DashboardSettings() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#121212] text-white flex flex-col gap-6 px-4 py-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/dashboard")}>
          <img
            src="https://www.svgrepo.com/show/326886/arrow-back-sharp.svg"
            alt="Back Arrow"
            className="w-6 h-6 invert"
          />
        </button>
        <h1 className="text-xl font-semibold">Settings</h1>
      </div>

      {/* Sections */}
      <div className="flex flex-col divide-y divide-gray-700">
        <div className="py-4">
          <span className="text-sm text-gray-400 block mb-2">How you use</span>
          <ul className="space-y-2">
            <li className="hover:text-blue-400 transition cursor-pointer">
              Saved
            </li>
            <li className="hover:text-blue-400 transition cursor-pointer">
              Archive
            </li>
            <li className="hover:text-blue-400 transition cursor-pointer">
              Your activity
            </li>
            <li className="hover:text-blue-400 transition cursor-pointer">
              Time management
            </li>
          </ul>
        </div>

        <div className="py-4">
          <span className="text-sm text-gray-400 block mb-2">
            Manage your content
          </span>
          <ul className="space-y-2">
            <li className="hover:text-blue-400 transition cursor-pointer">
              Close friends
            </li>
            <li className="hover:text-blue-400 transition cursor-pointer">
              Crossposting
            </li>
            <li className="hover:text-blue-400 transition cursor-pointer">
              Blocked
            </li>
            <li className="hover:text-blue-400 transition cursor-pointer">
              Hide story and live
            </li>
          </ul>
        </div>

        <div className="py-4">
          <span className="text-sm text-gray-400 block mb-2">
            Also from Meta
          </span>
          <ul className="space-y-2">
            <li className="hover:text-blue-400 transition cursor-pointer">
              WhatsApp
            </li>
            <li className="hover:text-blue-400 transition cursor-pointer">
              Threads
            </li>
            <li className="hover:text-blue-400 transition cursor-pointer">
              Facebook
            </li>
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto flex flex-col space-y-3 pt-6 border-t border-gray-700">
        <button className="w-full py-2 rounded bg-white text-black font-medium hover:bg-gray-200 transition">
          Add account
        </button>
        <button className="w-full py-2 rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition">
          Log out
        </button>
      </div>
    </div>
  );
}
