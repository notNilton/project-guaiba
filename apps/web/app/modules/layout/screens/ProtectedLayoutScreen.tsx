import { Outlet } from "react-router";
import { Sidebar } from "../components/Sidebar";

export function ProtectedLayoutScreen() {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto relative">
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
