import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [showPanel, setShowPanel] = useState(false);

  const panelRef = useRef(null); // 👈 برای کلیک بیرونی

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const startTime = Date.now();

      try {
        const res = await fetch("http://localhost:3000/me", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setUsername(data.username || "");
        setBio(data.bio || "");
        setAvatar(data.avatar ? `http://localhost:3000${data.avatar}` : null);
      } catch (err) {
        console.error(err);
      } finally {
        const elapsed = Date.now() - startTime;
        const remaining = 1000 - elapsed;
        if (remaining > 0) setTimeout(() => setLoading(false), remaining);
        else setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 👇 هندل کلیک بیرون از پنل
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        showPanel &&
        panelRef.current &&
        !panelRef.current.contains(e.target)
      ) {
        setShowPanel(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showPanel]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-[#121212] text-white px-4 py-5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate("/dashboard")}>
          <img
            src="https://www.svgrepo.com/show/326886/arrow-back-sharp.svg"
            alt="Back Arrow"
            className="w-6 h-6 invert"
          />
        </button>
        <h1 className="text-xl font-semibold">Edit Profile</h1>
      </div>

      {/* Form */}
      {/* Form */}
      <div className="flex flex-col items-center gap-4">
        {/* Avatar */}
        <div className="relative flex flex-col items-center">
          <img
            src={
              avatar ||
              "https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
            }
            alt="Avatar"
            className="w-28 h-28 rounded-full object-cover border border-gray-500"
          />
          <span
            onClick={() => setShowPanel(true)}
            className="mt-4 text-sm text-blue-400 cursor-pointer hover:underline"
          >
            Edit Profile Picture
          </span>
        </div>

        {/* Username */}
        <div className="w-full">
          <span className="block text-sm text-gray-400 mb-1 pl-1.5">
            Username
          </span>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] text-white outline-none border border-gray-700 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 transition"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Bio */}
        <div className="w-full">
          <span className="block text-sm text-gray-400 mb-1 pl-1.5">Bio</span>
          <textarea
            className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] text-white outline-none border border-gray-700 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 transition resize-none"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        {/* Save button */}
        <button className="mt-2 w-full py-2 rounded-md border border-gray-600 bg-[#2e2e2e] text-white font-medium hover:bg-[#3a3a3a] transition">
          Save Changes
        </button>
      </div>

      {/* 🔲 Overlay تارکننده */}
      {showPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-5 z-40 backdrop-blur-sm transition-opacity" />
      )}

      {/* 🔽 Bottom Sheet Panel */}
      <div
        ref={panelRef}
        className={`fixed left-0 bottom-0 w-full bg-[#1e1e1e] text-white shadow-2xl rounded-t-xl p-4 transition-transform duration-300 z-50 ${
          showPanel ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ height: "35vh" }} // 🧱 ارتفاع بیشتر
      >
        <div className="flex items-center mb-4">
          <h2 className="flex-grow text-lg font-semibold text-center">
            Edit Picture
          </h2>
          <button
            onClick={() => setShowPanel(false)}
            className="text-2xl text-white transition"
            aria-label="Close panel"
          >
            &times;
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <button className="py-2 px-4 rounded-md transition text-left border flex items-center gap-1">
            <img
              src="./src/assets/Pictures/UpdatePic.svg"
              alt="Update Icon"
              className="w-6 h-6 invert"
            />
            Update Picture
          </button>
          <button className="py-2 px-4 rounded-md transition text-left text-red-500 border flex items-center gap-1">
            <img
              src="./src/assets/Pictures/TrashBin.svg"
              alt="Trash Icon"
              className="w-5 h-5"
            />
            Remove Current Picture
          </button>
        </div>
      </div>
    </div>
  );
}
