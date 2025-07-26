import { useAuth } from "../../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function DashboardHeader({ onUploadSuccess }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:3000/post", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      onUploadSuccess?.();
    } catch (err) {
      toast.error("❌ Error uploading post:", err.message);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("post-file").click();
  };

  return (
    <div className="w-full h-12 flex items-center justify-between px-4 bg-[#121212]">
      <div className="flex items-center space-x-2">
        <img
          src="./src/assets/Pictures/LockIcon.svg"
          alt="Lock Icon"
          className="w-5 h-5 invert"
        />
        <span className="text-xl font-semibold text-white">
          {user.username}
        </span>
      </div>

      <div className="flex items-center space-x-3">
        <input
          id="post-file"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          onClick={triggerFileInput}
        >
          <img
            src="./src/assets/Pictures/AddIcon.svg"
            alt="Add Icon"
            className="w-7 h-7 invert"
          />
        </button>
        <button
          onClick={() => navigate("/dashboard/settings")}
        >
          <img
            src="./src/assets/Pictures/ListIcon.svg"
            alt="List Icon"
            className="w-5 h-5 invert"
          />
        </button>
      </div>
    </div>
  );
}
