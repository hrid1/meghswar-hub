"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import * as React from "react"
import { useLoginMutation } from "@/redux/features/auth/authApi"
import { setCredentials } from "@/redux/features/auth/authSlice"
import { useAppDispatch, useAppSelector } from "@/redux/store/hook"

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector((state) => state.auth.access_token)
  const [login, { isLoading }] = useLoginMutation()
  const [identifier, setIdentifier] = React.useState("manager@hub.com")
  const [password, setPassword] = React.useState("Manager123!")

  React.useEffect(() => {
    if (accessToken) router.replace("/dashboard")
  }, [accessToken, router])

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    try {
      const data = await login({ identifier, password }).unwrap()
      dispatch(
        setCredentials({
          access_token: data.data.accessToken,
          refresh_token: data.data.refreshToken,
          user: data.data.user,
        })
      )
      router.push("/dashboard")
    } catch {
      // no-op for now; hook will surface errors if you want to render them
    }
  }

  return (
    <>
      {/* Logo and Branding */}
      <div className="flex flex-col items-center space-y-4 mb-8">
        <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
          <span className="text-white font-bold text-2xl">H</span>
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 leading-none">
            Hub Panel
          </h1>
          <p className="text-xs text-gray-400 font-medium tracking-wide uppercase mt-2">
            Management System
          </p>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="flex flex-col space-y-2 text-center mb-6">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-800">
          Welcome back
        </h2>
        <p className="text-sm text-gray-500">
          Sign in to your account to continue
        </p>
      </div>

      {/* Login Form */}
      <div className="grid gap-6">
        <form onSubmit={onSubmit}>
          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="text"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="h-11 border-gray-300 focus-visible:border-[#FE5000]   focus-visible:ring-0 focus-visible:outline-none"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                autoCapitalize="none"
                autoComplete="current-password"
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 border-gray-300 focus-visible:border-[#FE5000]  focus-visible:ring-0 focus-visible:outline-none"
              />
            </div>
            <div className="flex items-center justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-orange-600 hover:text-orange-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Button 
              disabled={isLoading}
              className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-semibold"
            >
              {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In
            </Button>
          </div>
        </form>
      </div>

      {/* Sign Up Link */}
      <p className="text-center text-sm text-gray-600 mt-6">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-orange-600 hover:text-orange-700 font-semibold hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </>
  )
}
