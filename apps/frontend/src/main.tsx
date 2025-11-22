import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { RootPage, ErrorPage, MembersListPage, LoginPage } from "./pages"
import { membersListLoader } from "./pages/loaders"
import "./index.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "members",
        element: <MembersListPage />,
        loader: membersListLoader,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  }
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
