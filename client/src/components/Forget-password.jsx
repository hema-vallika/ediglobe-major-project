"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Label } from "./ui/Label"
import { useNavigate } from "react-router-dom"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const navigate = useNavigate();
    const handleBackToLogin = () => {
        navigate("/auth/login");
    }
  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log("Password reset request for:", email)
    setIsSubmitted(true)
    // Add your forgot password logic here
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Check Your Email</h1>
          <p className="text-slate-600 mb-6">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <Link href="/login">
            <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full">
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Forgot Password?</h1>
          <p className="text-slate-600">Enter your email to reset your password</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-full border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors"
          >
            Send Reset Link
          </Button>

          <div className="text-center">
            <button onClick={handleBackToLogin} className="text-sm text-blue-600 hover:text-blue-800 underline">
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
