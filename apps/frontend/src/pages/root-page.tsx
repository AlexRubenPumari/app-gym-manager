import { Outlet, useNavigate } from "react-router-dom"
import { Header } from "../components"

export function RootPage() {
  const navigate = useNavigate()
  return (
    <div className="h-screen bg-slate-100 flex flex-col justify-start">
      <Header user={{ name: "John Doe" }} onLogout={() => navigate("login")} />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  )
}