import { routesApp } from "./routes/index.route"
import { RouterProvider } from "react-router-dom"

export const App: React.FC = () => {
  return (
    <RouterProvider router={routesApp} />
  )
}
