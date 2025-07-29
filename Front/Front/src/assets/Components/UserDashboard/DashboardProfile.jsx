import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { toast } from "react-hot-toast";

const DashboardProfile = forwardRef((props, ref) => {
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
  const [postCount, setPostCount] = useState(0);
  const [bio, setBio] = useState("Loading...");

  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:3000/me", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch profile");

      const data = await res.json();
      console.log("Profile data:", data);

      if (data.avatar) {
        setProfileImage("http://localhost:3000" + data.avatar);
      }
      if (data.bio) {
        setBio(data.bio);
      } else {
        setBio("Write something about yourself");
      }
    } catch (err) {
      toast.error("Error fetching profile: " + err.message);
      setBio("Bio not available");
    }
  };

  const fetchPostCount = async () => {
    try {
      const res = await fetch("http://localhost:3000/post-count", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch post count");

      const data = await res.json();
      setPostCount(data.count);
    } catch (err) {
      toast.error("Error fetching post count: " + err.message);
    }
  };

  useImperativeHandle(ref, () => ({
    refreshPostCount: fetchPostCount,
  }));

  useEffect(() => {
    fetchProfile();
    fetchPostCount();
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await fetch("http://localhost:3000/avatar", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setProfileImage("http://localhost:3000" + data.avatar);
    } catch (err) {
      toast.error("Upload failed: " + err.message);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-full flex flex-col items-center py-4 space-y-3">
      <div className="w-full flex items-center justify-around">
        <div className="relative w-20 h-20 rounded-full flex items-center justify-center border-2 border-gray-500">
          <img
            src={profileImage || "./src/assets/Pictures/ProfileIcon.svg"}
            alt="Profile Icon"
            className="w-full h-full rounded-full bg-white object-cover"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageUpload}
          />
          <button
            onClick={handleUploadClick}
            className="absolute bottom-0 right-0 w-6 h-6 rounded-full border border-black flex items-center justify-center transition"
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
          {[
            { label: "Posts", value: postCount },
            { label: "Followers", value: 0 },
            { label: "Following", value: 0 },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col">
              <span className="text-lg font-bold">{value}</span>
              <span className="text-sm text-gray-400">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bio section */}
      <div className="w-full px-6">
        <h2 className="text-base font-semibold mb-1 text-white">Bio</h2>
        <p className="text-sm text-gray-300 whitespace-pre-line text-left">
          {bio}
        </p>
      </div>
    </div>
  );
});

export default DashboardProfile;
