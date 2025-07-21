import DashboardHeader from "./DashboardHeader";
import DashboardProfile from "./DashboardProfile";
import DashboardButtons from "./DashboardButtons";
import DashboardPosts from "./DashboardPosts";
import DashboardFooter from "./DashboardFooter";

export default function UserDashboard() {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-[#121212] text-white">
      <DashboardHeader />
      <DashboardProfile />
      <DashboardButtons />
      <DashboardPosts />
      <DashboardFooter />
    </div>
  );
}
