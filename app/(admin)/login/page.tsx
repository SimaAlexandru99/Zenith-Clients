import { Metadata } from "next"
import LoginForm from "components/custom/Login/LoginPageComponent"

export const metadata: Metadata = {
  title: "Login - Optima Solutions Services",
  description: "Login page for Optima Solutions Services",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex w-full items-center justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:px-8">
        <LoginForm />
      </div>
      <div className="hidden w-1/2 bg-primary lg:block" />
    </div>
  )
}
