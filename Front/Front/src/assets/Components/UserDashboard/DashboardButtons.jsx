import { useNavigate } from "react-router-dom";
export default function DashboardButtons() {
  const navigate = useNavigate()
  return (
    <div className="w-full flex items-center justify-center space-x-2 h-10 px-4 ">
      <button onClick={()=> navigate("/edit")} className="flex-[3] text-sm px-2 py-1 bg-gray-500 rounded-xl text-white text-center">
        Edit profile
      </button>

      <button className="flex-[3] text-sm px-2 py-1 bg-gray-500 rounded-xl text-white text-center">
        Share profile
      </button>

      <button className="flex-[1] text-sm px-2 py-1 bg-gray-500 rounded-xl flex items-center justify-center">
        <img
          src="./src/assets/Pictures/AddUserIcon.svg"
          alt="Add User"
          className="object-contain w-5 h-5"
        />
      </button>
    </div>
  );
}
