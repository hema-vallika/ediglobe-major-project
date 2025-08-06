import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Checkbox } from "./ui/Checkbox";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slice/authSlice";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const navigate = useNavigate(); // ✅ This is the correct place
  const dispatch = useDispatch();
  // const { isLoading, error } = useSelector((state) => state.auth);
  const handleSignup = () => {
    navigate("/auth/signup");
  };

  const handleForgotPassword = () => {
    navigate("/auth/forgot-password");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Login attempt:", formData);
    dispatch(loginUser(formData))
      .unwrap()
      .then(() => {
        // console.log("Login successful");
        navigate("/"); // Redirect to home on success
      })
      .catch((err) => {
        // console.error("Login failed:", err);
        alert(err || "Login failed"); // Show error message
      });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Left side - Illustration */}
        <div className="lg:w-1/2 bg-gradient-to-br from-blue-50 to-blue-100 p-8 lg:p-8 flex items-center justify-center">
          <div className="w-full h-full flex items-center justify-center">
            <img
              src="https://s-i.huffpost.com/gen/3980656/images/o-DARTMOUTH-COLLEGE-facebook.jpg"
              alt="College Management Illustration"
              className="w-full h-auto object-fit-cover rounded-lg "
            />
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="lg:w-1/2 p-8 lg:p-12 flex items-center justify-center">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-800">
                Hello,
              </h1>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-800">
                Welcome Back
              </h2>
              <p className="text-slate-600">
                <button
                  type="button"
                  onClick={handleSignup}
                  className="text-blue-600 hover:text-blue-800 font-medium underline  cursor-pointer"
                >
                  Sign Up Here
                </button>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700">
                  Email or Username
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="h-12 rounded-full border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="h-12 rounded-full border-slate-300 focus:border-blue-500 focus:ring-blue-500 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, rememberMe: checked }))
                    }
                  />
                  <Label
                    htmlFor="rememberMe"
                    className="text-sm text-slate-600"
                  >
                    Remember me
                  </Label>
                </div>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-blue-600 hover:text-blue-800 font-medium underline"
                >
                  Forget Password
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors cursor-pointer"
              >
                LOGIN NOW
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 text-slate-500">
                    or login with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 rounded-full border-slate-300 hover:bg-slate-50 bg-transparent"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 rounded-full border-slate-300 hover:bg-slate-50 bg-transparent"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="#1877F2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
