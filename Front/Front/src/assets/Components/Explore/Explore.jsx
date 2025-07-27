import { useState } from "react";
import ExploreGrid from "./ExploreGrid";
import DashboardFooter from "../UserDashboard/DashboardFooter";
export default function Explore() {
  const [activeTab, setActiveTab] = useState("search");

  return (
    <div className="w-screen h-screen flex flex-col bg-[#121212] relative">
      {/* محتوای قابل اسکرول */}
      <div className="flex-1 overflow-y-auto">
        <ExploreGrid />
      </div>

      {/* فوتر همیشه پایین و ثابت */}
      <div className="fixed bottom-0 left-0 w-full z-20">
        <DashboardFooter activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}
