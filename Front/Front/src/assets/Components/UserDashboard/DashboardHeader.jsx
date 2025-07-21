import { useAuth } from "../../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DashboardHeader() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="w-full h-12 flex items-center justify-between px-4 bg-[#121212]">
      <div className="flex items-center space-x-2">
        <img
          src="./src/assets/Pictures/LockIcon.svg"
          alt="Lock Icon"
          className="w-5 h-5 invert"
        />
        <span className="text-xl font-semibold text-white">
          {user?.username || "Guest"}
        </span>
      </div>

      <div className="flex items-center space-x-3">
        <button className="hover:opacity-80 transition">
          <img
            src="./src/assets/Pictures/AddIcon.svg"
            alt="Add Icon"
            className="w-7 h-7 invert"
          />
        </button>
        <button
          onClick={() => navigate("/dashboard/settings")}
          className="hover:opacity-80 transition"
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
