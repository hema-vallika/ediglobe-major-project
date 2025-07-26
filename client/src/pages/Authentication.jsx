
import LoginForm from "../components/Login-form";
import RegisterForm from "../components/Register-form";
import { Outlet } from "react-router-dom";
export default function AuthPage() {
  

  return (
    <div>
      <Outlet />
    </div>
  )
}
