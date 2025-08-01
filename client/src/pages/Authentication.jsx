import { Outlet } from "react-router-dom";
export default function AuthPage() {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 bg-top-right ">
      <Outlet />
    </div>
  );
}
