import { useState, useRef } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardProfile from "./DashboardProfile";
import DashboardButtons from "./DashboardButtons";
import DashboardPosts from "./DashboardPosts";
import DashboardFooter from "./DashboardFooter";

export default function UserDashboard() {
  const postsRef = useRef();
  const [activeTab, setActiveTab] = useState("home");

  const handleUploadSuccess = () => {
    postsRef.current?.refreshPosts?.();
  };

  return (
    <div className="w-screen min-h-screen flex flex-col bg-[#121212] text-white">
      <DashboardHeader onUploadSuccess={handleUploadSuccess} />
      <DashboardProfile />
      <DashboardButtons />
      <DashboardPosts ref={postsRef} />
      <DashboardFooter activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
