import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Home } from "../pages/Home";

const PublicLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

function PublicRoute(): {
  element: JSX.Element;
  children: RouteObject[];
} {
  return {
    element: <PublicLayout />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "*", element: <Navigate to="/home" replace /> },
    ],
  };
}

export function AppRouter() {
  const router = createBrowserRouter([PublicRoute()]);

  return <RouterProvider router={router} />;
}
