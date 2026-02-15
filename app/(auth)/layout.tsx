import { Truck, Package, Users, TrendingUp } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-20 flex flex-col h-full p-10 text-white">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <div>
              <h1 className="text-xl font-bold leading-none">Hub Panel</h1>
              <p className="text-xs text-white/80 font-medium tracking-wide uppercase mt-1">
                Management System
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Streamline Your Parcel Management
            </h2>
            <p className="text-lg text-white/90 mb-12 max-w-md">
              Efficiently manage parcels, track deliveries, and optimize your logistics operations with our comprehensive hub panel system.
            </p>

            {/* Features */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Parcel Tracking</h3>
                  <p className="text-white/80 text-sm">Real-time tracking and status updates for all your parcels</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Delivery Management</h3>
                  <p className="text-white/80 text-sm">Optimize routes and manage rider assignments efficiently</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Analytics & Reports</h3>
                  <p className="text-white/80 text-sm">Comprehensive insights into your operations and performance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-sm text-white/70">
            © {new Date().getFullYear()} Meghswar Hub Panel. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
