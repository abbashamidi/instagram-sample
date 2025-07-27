import { useNavigate } from "react-router-dom";

export default function DashboardFooter({ activeTab, setActiveTab }) {
  const navigate = useNavigate();

  const tabs = [
    {
      id: "search",
      label: "Search",
      route: "/explore",
      icon: "./src/assets/Pictures/SearchIcon.svg",
    },
    {
      id: "home",
      label: "Home",
      route: "/dashboard",
      icon: "./src/assets/Pictures/HomeIcon.svg",
    },
  ];

  return (
    <div className="fixed bottom-0 w-full flex justify-around z-40 py-1 backdrop-blur-md bg-[#1a1a1a]/80 shadow-[0_-2px_6px_rgba(0,0,0,0.3)] -mb-0.5">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <div
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              navigate(tab.route);
            }}
            className="flex flex-col items-center justify-center space-y-1 w-1/2 hover:opacity-80 transition cursor-pointer"
          >
            <img
              src={tab.icon}
              alt={`${tab.label} Icon`}
              className={`invert transition-all duration-200 ${
                isActive ? "w-7 h-7" : "w-6 h-6"
              }`}
            />
            <span
              className={`text-xs text-gray-300 transition-all duration-200 ${
                isActive ? "font-semibold text-white" : ""
              }`}
            >
              {tab.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
