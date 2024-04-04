import { Outlet } from "react-router-dom";
import HeaderNavbar from "../components/header-navbar";
import { Toaster } from "sonner";

export default function Layout() {
  return (
    <div className={`dark text-foreground bg-background min-h-screen w-full`}>
      <Toaster />
      <HeaderNavbar />
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
}
