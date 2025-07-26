"use client"

import { Link } from "react-router-dom"
import {
  Users,
  BookOpen,
  Calendar,
  BarChart3,
  Shield,
  Clock,
  Award,
  CheckCircle,
  ArrowRight,
  Star,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import { Button } from "../components/ui/Button"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Modern College
                <span className="text-blue-400"> Management</span>
                <br />
                Made Simple
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                Streamline your educational institution with our comprehensive management system. Handle students,
                faculty, courses, and administration all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg h-auto">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to={"/auth/login"}>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3 text-lg h-auto bg-transparent"
                  >
                    Login to Dashboard
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-6 text-sm text-slate-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Free 30-day trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Total Students</span>
                    <span className="text-2xl font-bold text-blue-400">2,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Active Courses</span>
                    <span className="text-2xl font-bold text-green-400">156</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Faculty Members</span>
                    <span className="text-2xl font-bold text-yellow-400">89</span>
                  </div>
                  <div className="mt-6 p-4 bg-blue-600/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-blue-400" />
                      <span className="text-sm">98% Student Satisfaction Rate</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Everything You Need to Manage Your College
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools necessary for efficient college administration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Student Management</h3>
              <p className="text-slate-600">
                Comprehensive student profiles, enrollment tracking, and academic progress monitoring.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Course Management</h3>
              <p className="text-slate-600">
                Create, organize, and manage courses with curriculum planning and resource allocation.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Schedule Management</h3>
              <p className="text-slate-600">
                Automated timetable generation, class scheduling, and exam planning system.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Analytics & Reports</h3>
              <p className="text-slate-600">
                Detailed analytics, performance reports, and data-driven insights for better decisions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Security & Privacy</h3>
              <p className="text-slate-600">
                Advanced security measures with role-based access control and data protection.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <Clock className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Attendance Tracking</h3>
              <p className="text-slate-600">
                Real-time attendance monitoring with automated notifications and reporting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Why Choose EduManage?</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                We understand the unique challenges faced by educational institutions. Our platform is designed by
                educators, for educators, ensuring that every feature serves a real purpose in improving educational
                outcomes.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-800">Easy to Use</h4>
                    <p className="text-slate-600">Intuitive interface designed for users of all technical levels</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-800">Scalable Solution</h4>
                    <p className="text-slate-600">
                      Grows with your institution from small colleges to large universities
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-800">24/7 Support</h4>
                    <p className="text-slate-600">Dedicated support team available whenever you need assistance</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-8 rounded-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-slate-600">Institutions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
                  <div className="text-slate-600">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
                  <div className="text-slate-600">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">4.9</div>
                  <div className="text-slate-600 flex items-center justify-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    Rating
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your College Management?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of educational institutions already using EduManage to streamline their operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-3 text-lg h-auto">
                Start Free Trial
              </Button>
            </Link>
            <Link href="#contact">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg h-auto bg-transparent"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Get in Touch</h2>
            <p className="text-xl text-slate-600">Have questions? We'd love to hear from you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Email Us</h3>
              <p className="text-slate-600">info@edumanage.com</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Call Us</h3>
              <p className="text-slate-600">+1 (555) 123-4567</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Visit Us</h3>
              <p className="text-slate-600">
                123 Education Street
                <br />
                Learning City, LC 12345
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
