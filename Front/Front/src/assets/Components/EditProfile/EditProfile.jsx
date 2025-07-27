import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#121212] text-white px-4 py-5">
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
      <div className="flex flex-col items-center gap-6">
        {/* Avatar */}
        <div className="relative">
          <img
            src={
              avatar ||
              "https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
            }
            alt="Avatar"
            className="w-28 h-28 rounded-full object-cover border border-gray-500"
          />
          <label className="absolute bottom-0 right-0 bg-white text-black text-xs px-2 py-1 rounded-full cursor-pointer transition hover:bg-gray-300">
            Change
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Username */}
        <div className="w-full">
          <label className="text-sm text-gray-300 mb-1 block">Username</label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] text-white outline-none focus:ring-2 focus:ring-gray-500 transition"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>

        {/* Bio */}
        <div className="w-full">
          <label className="text-sm text-gray-300 mb-1 block">Bio</label>
          <textarea
            className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] text-white outline-none focus:ring-2 focus:ring-gray-500 transition resize-none"
            rows="3"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write something about yourself..."
          />
        </div>

        {/* Save button */}
        <button className="mt-4 w-full py-2 bg-white text-black font-medium rounded-md hover:bg-gray-300 transition">
          Save Changes
        </button>
      </div>
    </div>
  );
}
