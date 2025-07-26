import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthDispatch } from "../../AuthContext/AuthContext";

const sections = [
  {
    title: "How you use",
    items: ["Saved", "Archive", "Your activity", "Time management"],
  },
  {
    title: "Manage your content",
    items: ["Close friends", "Crossposting", "Blocked", "Hide story and live"],
  },
  {
    title: "Also from Meta",
    items: ["WhatsApp", "Threads", "Facebook"],
  },
];

export default function DashboardSettings() {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/signout", {
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("sessionId");
      dispatch({ type: "LOGOUT" });
      navigate("/");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

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
    <div className="w-full min-h-screen bg-[#121212] text-white flex flex-col gap-6 px-4 py-4 relative">
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
        {sections.map((section, index) => (
          <div key={index} className="py-4">
            <span className="text-sm text-gray-400 block mb-2">
              {section.title}
            </span>
            <ul className="space-y-2">
              {section.items.map((item, idx) => (
                <li
                  key={idx}
                  className="hover:text-blue-400 transition cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-auto flex flex-col space-y-3 pt-6 border-t border-gray-700">
        <button className="w-full py-2 rounded bg-white text-black font-medium hover:bg-gray-200 transition">
          Add account
        </button>
        <button
          onClick={() => setShowConfirmModal(true)}
          className="w-full py-2 rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
        >
          Log out
        </button>
      </div>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-[#1e1e1e] text-white p-5 rounded-lg w-72 border border-gray-700 shadow-lg">
            <h2 className="text-base font-medium mb-4 text-center">
              Are you sure you want to log out?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-1.5 rounded bg-gray-700 hover:bg-gray-600 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  handleLogout();
                }}
                className="px-4 py-1.5 rounded bg-red-500 hover:bg-red-600 text-sm"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
